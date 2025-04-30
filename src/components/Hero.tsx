import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Countdown from "./Countdown";

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>NUESA Award Night 2025</HeroTitle>
        <HeroDescription>
          Support your favorite contestant before voting closes
        </HeroDescription>

        <Countdown />

        <ButtonGroup>
          <Button primary>Cast Your Vote</Button>
          <Button secondary>Buy Ticket</Button>
        </ButtonGroup>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;

const HeroContainer = styled.section`
  background: ${(props) => props.theme.gradients.hero};
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("/award-bg.png") no-repeat center center;
    background-size: cover;
    opacity: 0.1;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
  text-align: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  color: ${(props) => props.theme.colors.light};
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.light};
  margin-bottom: 2rem;
  opacity: 0.9;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;
