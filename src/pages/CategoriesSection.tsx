import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryCard from '../components/CategoriesCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Update path as needed

// Types
interface Candidate {
  name: string;
  achievement?: string;
}

interface Category {
  id: string; // Firebase doc ID is a string
  category: string;
  icon: string;
  description: string;
  type: string;
  candidates: Candidate[];
}

const CategoriesSection = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'categories'));
        const fetchedCategories: Category[] = snapshot.docs.map(doc => ({
          id: doc.id,
          category: doc.data().name,
          description: doc.data().description,
          icon: doc.data().icon || '🏆', // default emoji if none provided
          type: doc.data().type || 'general', // fallback if not set
          candidates: doc.data().candidates || [],
        }));
        setCategories(fetchedCategories);
        setFilteredCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (): void => {
    let results = categories;

    if (searchTerm) {
      results = results.filter(category =>
        category.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter !== 'all') {
      results = results.filter(category => category.type.toLowerCase() === filter.toLowerCase());
    }

    setFilteredCategories(results);
  };

  return (
    <SectionContainer id="categories">
      <div className="container">
        <SectionTitle>Award Categories</SectionTitle>

        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="Search categories..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FilterSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="leadership">Leadership</option>
            <option value="academic">Academic</option>
            <option value="innovation">Innovation</option>
            <option value="service">Community Service</option>
            <option value="sports">Athletics</option>
            <option value="arts">Arts & Culture</option>
          </FilterSelect>

          <FilterButton onClick={handleSearch}>Apply Filter</FilterButton>
        </SearchContainer>

        <CategoriesGrid>
  {filteredCategories.length > 0 ? (
    filteredCategories.map(category => (
      <CategoryCard 
        key={category.id}
        category={category.category}
        icon={category.icon}
        description={category.description}
        candidates={category.candidates.map(candidate => ({
          name: candidate.name,
          achievement: candidate.achievement || ''
        }))}
      />
    ))
  ) : (
    <NoCategoryMessage>
      <span role="img" aria-label="no categories">😕</span>
      <p>No categories available at the moment. Try adjusting your filter or check back later!</p>
    </NoCategoryMessage>
  )}
</CategoriesGrid>
      </div>
    </SectionContainer>
  );
};

export default CategoriesSection;


// Styled components remain the same
const SectionContainer = styled.section<{}>`
  padding: 5rem 0;
  background-color: ${(props) => props.theme.colors.grey};
`;

const SectionTitle = styled.h2<{}>`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: ${(props) => props.theme.gradients.header};
    border-radius: 2px;
  }
`;

const SearchContainer = styled.div<{}>`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input<{}>`
  flex: 1;
  padding: 0.8rem 1.2rem;
  border-radius: 50px;
  border: 1px solid #ddd;
  font-size: 1rem;
  outline: none;
  min-width: 0;
  
  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.2);
  }
`;

const FilterSelect = styled.select<{}>`
  padding: 0.8rem 1.2rem;
  border-radius: 50px;
  border: 1px solid #ddd;
  font-size: 1rem;
  outline: none;
  background-color: white;
  min-width: 150px;
  
  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.2);
  }
`;

const FilterButton = styled.button<{}>`
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${(props) => props.theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const CategoriesGrid = styled.div<{}>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const NoCategoryMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  color: #555;
  font-size: 1.2rem;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    max-width: 400px;
  }
`;
