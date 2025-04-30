import styled from "styled-components";
import Button from "./Button";
import Countdown from "./Countdown";
import logo from '../assets/nuesaLogo.jpeg';

const HeroSection = () => {
  return (
    <HeroContainer>
      <BackgroundOverlay />
      <HeroContent>
        <LogoContainer>
          <Logo src={logo} alt="NUESA Logo" />
          <EventTitle>Award Night 2025</EventTitle>
        </LogoContainer>
        
        <HeroDescription>
          Support your favorite contestant before voting closes
        </HeroDescription>

        <CountdownWrapper>
          <Countdown />
        </CountdownWrapper>

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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: #080b1a; /* Fallback color */
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("/award-bg.png") no-repeat center center;
  background-size: cover;
  opacity: 0.18;
  z-index: 0;
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(32, 15, 86, 0.9) 0%,
      rgba(8, 11, 26, 0.85) 100%
    );
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 2;
  text-align: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;
  animation: fadeIn 1.2s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 120px;
    height: 120px;
    margin-bottom: 1rem;
  }
`;

const EventTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(to right, #f5deb3, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0;
  letter-spacing: 1px;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.light || "#ffffff"};
  margin-bottom: 2.5rem;
  opacity: 0.9;
  font-weight: 300;
  letter-spacing: 0.5px;
  max-width: 80%;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    max-width: 95%;
  }
`;

const CountdownWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 3rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 1rem;
    margin-bottom: 2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 300px;
  }
`;