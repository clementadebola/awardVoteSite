import { useNavigate } from 'react-router-dom';
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


const CategoryCard: React.FC<CategoryCardProps> = ({ category, icon, description, candidates }) => {
  const navigate = useNavigate();

  const handleClick = () => {
   navigate('/vote-details',{
    state: {
      category,
      candidates
    }
   })
  };

  return (
    <Card onClick={handleClick}>
      <CardTop>
        <CategoryIcon>{icon}</CategoryIcon>
      </CardTop>
      <CardContent>
        <CategoryTitle>{category}</CategoryTitle>
        <CategoryDescription>{description}</CategoryDescription>

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
