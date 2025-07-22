import React, { useState } from "react";
import styled from "styled-components";

const FlipCardWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const FlipImageContainer = styled.div`
  perspective: 1000px;
  width: 208px;
  height: 208px;
  position: relative;
`;

//withConfig 안에서 shouldForwardProp을 설정해서 isFlipped prop이 실제 DOM 요소로 전달되지 않도록 막음 (경고떠서)
const FlipCardInner = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isFlipped",
})`
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${(props) =>
    props.isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
  position: relative;
`;

const FlipCardFace = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  object-fit: contain;
  border-radius: 12px;
`;

const FrontFace = styled(FlipCardFace)``;

const BackFace = styled(FlipCardFace)`
  transform: rotateY(180deg);
`;

const FlipButton = styled.button`
  margin-top: 12px;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

function FlipCard({ frontImage, backImage, alt }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => setIsFlipped((prev) => !prev);

  return (
    <FlipCardWrap>
      <FlipImageContainer>
        <FlipCardInner isFlipped={isFlipped}>
          <FrontFace src={frontImage} alt={alt} />
          <BackFace src={backImage} alt={alt} />
        </FlipCardInner>
      </FlipImageContainer>
      <FlipButton onClick={toggleFlip}>
        {isFlipped ? "앞면 보기" : "뒷면 보기"}
      </FlipButton>
    </FlipCardWrap>
  );
}

export default FlipCard;
