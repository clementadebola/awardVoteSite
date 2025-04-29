import React from "react";
import styled from "styled-components";
import background from "../assets/backview.jpeg";
import pastorImg from "../assets/pastorImg.png";
import { useNavigate } from "react-router-dom";

const SectionWrapper = styled.section`
  position: relative;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  padding: 20px;
  color: white;
  min-height: 400px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 40px;
    height: 400px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 100%;

  @media (min-width: 768px) {
    max-width: 60%;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #c5ff00;
  margin-bottom: 20px;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
  z-index: 3;
  align-self: flex-start;
  margin-top: 20px;

  @media (min-width: 768px) {
    align-self: flex-end;
    margin-right: 40px;
    margin-top: 0;
  }
`;

const ContactButton = styled.button`
  // background-color: #ffa500;
  background-color: #e0e0e0;
   color: #aaaaaa;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8c00;
  }

  @media (min-width: 768px) {
    padding: 12px 24px;
    font-size: 1.1rem;
  }
`;

const PastorImageWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 60%;
  overflow: hidden;

  @media (min-width: 768px) {
    width: 40%;
    height: 100%;
  }
`;

const PastorImage = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;
  object-fit: cover;
`;

const TextFadeOverlay = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
`;

const ChatIcon = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: #25d366;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  z-index: 3;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ChallengeSection: React.FC = () => {
  const navigate = useNavigate();


  return (
    <SectionWrapper>
      <ContentWrapper>
        <Title>You Can Talk to Someone no matter what the challenge is.</Title>
        <Subtitle>
          There are competent & Spirit filled Counsellors, Pastors & Ministers
          willing to speak with you at any time.
        </Subtitle>
        <Subtitle>Don't keep it all in, speak to someone now.</Subtitle>
      </ContentWrapper>
      <PastorImageWrapper>
        <PastorImage src={pastorImg} alt="Pastor speaking" />
      </PastorImageWrapper>
      <TextFadeOverlay />
      <ButtonWrapper>
        <ContactButton onClick={() => navigate('/contact')}>Contact Us</ContactButton>
      </ButtonWrapper>
      <ChatIcon>
        <span role="img" aria-label="chat">
          💬
        </span>
      </ChatIcon>
    </SectionWrapper>
  );
};

export default ChallengeSection;
