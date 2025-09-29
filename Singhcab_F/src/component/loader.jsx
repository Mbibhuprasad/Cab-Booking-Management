import React from "react";
import styled, { keyframes } from "styled-components";

// Full-screen overlay
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Stroke line drawing
const draw = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

// Fill fade-in
const fillIn = keyframes`
  from { fill: transparent; opacity: 0; }
  to { fill: #edff29ff; opacity: 1; }
`;

const SvgText = styled.svg`
  width: 90vw; /* ✅ scale to viewport width */
  max-width: 880px; /* desktop limit */
  height: auto;
  max-height: 180px;

  /* Responsive height caps */
  @media (max-width: 768px) {
    max-height: 140px;
  }
  @media (max-width: 480px) {
    max-height: 110px;
  }
  @media (max-width: 320px) {
    max-height: 90px;
  }
`;

const StrokeText = styled.text`
  font-size: 100px;
  font-weight: 900;
  letter-spacing: 15px;
  font-family: Arial, Helvetica, sans-serif;

  stroke: #edff29ff;
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-linecap: round;
  fill: transparent;

  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: ${draw} 3.5s ease forwards;

  /* Scale text for smaller screens */
  @media (max-width: 768px) {
    font-size: 70px;
    letter-spacing: 10px;
  }
  @media (max-width: 480px) {
    font-size: 50px;
    letter-spacing: 6px;
    stroke-width: 2.5;
  }
  @media (max-width: 320px) {
    font-size: 36px;
    letter-spacing: 4px;
    stroke-width: 2;
  }
`;

const FillText = styled.text`
  font-size: 100px;
  font-weight: 900;
  letter-spacing: 15px;
  font-family: Arial, Helvetica, sans-serif;

  fill: #edff29ff;
  opacity: 0;
  animation: ${fillIn} 0.8s ease forwards;
  animation-delay: 1.5s;

  /* Same responsive scaling */
  @media (max-width: 768px) {
    font-size: 70px;
    letter-spacing: 10px;
  }
  @media (max-width: 480px) {
    font-size: 50px;
    letter-spacing: 6px;
  }
  @media (max-width: 320px) {
    font-size: 36px;
    letter-spacing: 4px;
  }
`;

export default function Loader() {
  return (
    <Overlay>
      <SvgText viewBox="0 0 500 200" preserveAspectRatio="xMidYMid meet">
        {/* Fill Layer */}
        <FillText x="50%" y="60%" textAnchor="middle" dominantBaseline="middle">
          SinghCabs
        </FillText>

        {/* Stroke Layer */}
        <StrokeText
          x="50%"
          y="60%"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          SinghCabs
        </StrokeText>
      </SvgText>
    </Overlay>
  );
}
