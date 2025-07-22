// Redux Toolkit의 createSlice(슬라이스 만들기), createAsyncThunk(비동기 요청용) 함수 불러오기
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * fetchPokemonList
 * - 포켓몬 151마리의 데이터를 pokeAPI로부터 비동기로 가져오는 함수입니다.
 * - Redux Toolkit의 createAsyncThunk를 사용해 비동기 액션 생성
 */

// 비동기 작업을 정의하는 함수: 포켓몬 리스트를 API에서 불러오기
export const fetchPokemonList = createAsyncThunk(
  "pokemon/fetchList",
  async (pokemonCount) => {
    const pokemonIds = Array.from({ length: pokemonCount }, (_, i) => i + 1);

    const responses = await Promise.all(
      pokemonIds.map(async (id) => {
        // 기본 정보
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        // species 정보 (한글 이름, 설명 등)
        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const speciesData = await speciesRes.json();

        const koreanName =
          speciesData.names.find((n) => n.language.name === "ko")?.name ??
          data.name;
        
        return {
          id,
          name: data.name,
          koreaName: koreanName,
          front: data.sprites.front_default,
          back: data.sprites.back_default,
          types: data.types.map((t) => t.type.name),
          height: data.height,
          weight: data.weight,
          abilities: data.abilities.map((a) => a.ability.name),
          moves: data.moves.slice(0, 3),
          description:
            speciesData.flavor_text_entries.find(
              (x) => x.language.name === "ko"
            ).flavor_text ?? "",
        };
      })
    );

    return responses;
  }
);

/**
 * pokemonSlice
 * - Redux Toolkit의 createSlice를 사용하여 포켓몬 데이터를 전역 상태로 관리
 */
const pokemonSlice = createSlice({
  name: "pokemon", // slice 이름 (state.pokemon으로 접근)
  initialState: {
    list: [], // 포켓몬 목록 배열
    loading: false, // 로딩 여부
    error: null, // 에러 메시지
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 로딩 중, 액션이 시작되면 loading true 설정
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 로딩 성공, 포켓몬 목록 저장
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      // 로딩 실패, 에러 메시지 저장
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const getInitialFavoriteIds = () => {
  try {
    const stored = localStorage.getItem("favoriteIds"); // 'favoriteIds'라는 키로 저장된 값을 꺼냄
    return stored ? JSON.parse(stored) : []; // 값이 존재하면 JSON 문자열을 배열로 파싱, 없으면 빈 배열 반환
  } catch {
    return []; // JSON 파싱 오류 등 예외가 발생하면 빈 배열 반환
  }
};

// 포켓몬 찜 목록 상태를 관리 slice
const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    ids: getInitialFavoriteIds(),  //로컬스토리지 초기값 세팅
  },
  reducers: {
    // 찜 추가 액션, payload로 전달된 포켓몬 id가 없으면 배열에 추가
    addToFavorite: (state, action) => {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
      localStorage.setItem("favoriteIds", JSON.stringify(state.ids)); // 로컬스토리지에 현재 찜 id배열저장
    },
    // 찜 해제 액션, payload로 전달된 포켓몬 id를 배열에서 제거
    removeFromFavorite: (state, action) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
      localStorage.setItem("favoriteIds", JSON.stringify(state.ids));
    },
  },
});

// 액션 생성자, 컴포넌트에서 dispatch용으로 사용
export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;

// 셀렉터, 상태에서 찜한 포켓몬 ID 배열을 선택할 때 사용
export const selectFavoriteIds = (state) => state.favorite.ids;

// 리듀서, store에 등록할 때 사용
export const favoriteReducer = favoriteSlice.reducer;

// 다른 slice 리듀서 export, store에 함께 등록하는 용도
export const pokemonReducer = pokemonSlice.reducer;