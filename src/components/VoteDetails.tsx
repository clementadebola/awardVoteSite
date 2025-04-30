import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

interface CandidateType {
  name: string;
  achievement: string;
  image?: string;
}

interface LocationState {
  category: string;
  candidates: CandidateType[];
}

const VoteDetails: React.FC = () => {
  const { state } = useLocation();
  const { category, candidates } = state as LocationState;

  return (
    <Wrapper>
      <Header>{category}</Header>
      <CandidatesGrid>
        {candidates.map((candidate, index) => (
          <CandidateCard key={index}>
            <CandidateImage>
              {candidate.image ? (
                <img src={candidate.image} alt={candidate.name} />
              ) : (
                candidate.name.charAt(0)
              )}
            </CandidateImage>
            <CandidateName>{candidate.name}</CandidateName>
            <CandidateAchievement>{candidate.achievement}</CandidateAchievement>
            <VoteInput type="number" placeholder="Number of votes" min={1} />
            <VoteButton>Vote</VoteButton>
          </CandidateCard>
        ))}
      </CandidatesGrid>
    </Wrapper>
  );
};

export default VoteDetails;

// Styled Components
const Wrapper = styled.div`
  padding: 2rem;
`;

const Header = styled.h2`
  margin-bottom: 2rem;
`;

const CandidatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
`;

const CandidateCard = styled.div`
  background: ${({ theme }) => theme.colors.light};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CandidateImage = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.grey};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const CandidateName = styled.h4`
  margin: 0.5rem 0 0.2rem;
`;

const CandidateAchievement = styled.p`
  font-size: 0.85rem;
  color: #555;
`;

const VoteInput = styled.input`
  margin-top: 1rem;
  padding: 0.5rem;
  width: 100%;
  font-size: 1rem;
`;

const VoteButton = styled.button`
  margin-top: 1rem;
  padding: 0.6rem;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
