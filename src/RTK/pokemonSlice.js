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
  async () => {
    const pokemonIds = Array.from({ length: 151 }, (_, i) => i + 1);

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

        const moves = await Promise.all(
          data.moves.slice(0, 3).map(async (m) => {
            const moveRes = await fetch(m.move.url); // 예: https://pokeapi.co/api/v2/move/1/
            const moveData = await moveRes.json();
            const koreanName =
              moveData.names.find((n) => n.language.name === "ko")?.name ??
              m.move.name;
            return koreanName;
          })
        );
        
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
          moves,
          description:
            speciesData.flavor_text_entries.find(
              (x) => x.language.name === "ko"
            )?.flavor_text ?? "",
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

export default pokemonSlice.reducer;
