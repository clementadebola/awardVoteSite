import { useState } from 'react';
import styled from 'styled-components';

// Define the types for the props
interface CandidateType {
  name: string;
  achievement: string;
}

interface CategoryCardProps {
  category: string;
  icon: string;
  description: string;
  candidates: CandidateType[];
}

interface CandidatesListProps {
  isExpanded: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, icon, description, candidates }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <Card onClick={toggleExpand}>
      <CardTop>
        <CategoryIcon>{icon}</CategoryIcon>
      </CardTop>
      <CardContent>
        <CategoryTitle>{category}</CategoryTitle>
        <CategoryDescription>{description}</CategoryDescription>

        <CandidatesList isExpanded={isExpanded}>
          {candidates.map((candidate, index) => (
            <Candidate key={index}>
              <CandidateAvatar>
                {candidate.name.charAt(0)}
              </CandidateAvatar>
              <CandidateInfo>
                <CandidateName>{candidate.name}</CandidateName>
                <CandidateAchievement>{candidate.achievement}</CandidateAchievement>
              </CandidateInfo>
            </Candidate>
          ))}
        </CandidatesList>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;

// Styled components
const Card = styled.div`
  background: ${({ theme }) => theme.colors.light};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardTop = styled.div`
  background: ${({ theme }) => theme.gradients.card};
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const CategoryIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.light};
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const CategoryDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
`;

const CandidatesList = styled.div<CandidatesListProps>`
  max-height: ${({ isExpanded }) => (isExpanded ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.5s ease;
`;

const Candidate = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const CandidateAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.grey};
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

const CandidateInfo = styled.div`
  flex: 1;
`;

const CandidateName = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.2rem;
`;

const CandidateAchievement = styled.p`
  font-size: 0.8rem;
  color: #888;
`;
