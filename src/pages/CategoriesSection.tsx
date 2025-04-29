import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryCard from '../components/CategoriesCard';

// Define types for our data structure
interface Candidate {
  name: string;
  achievement?: string;
}

interface Category {
  id: number;
  category: string;
  icon: string;
  description: string;
  type: string;
  candidates: Candidate[];
}

const CategoriesSection = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  
  // Sample data
  const categoriesData: Category[] = [
    // Your categories data remains the same
    {
      id: 1,
      category: 'Brand / Enterpreneur of the year',
      icon: '👑',
      description: 'Recognizing exceptional enterpreneurship qualities and impact on campus.',
      type: 'Enterpreneur',
      candidates: [
        { name: 'Ziongate', achievement: 'gadget brand' },
        { name: 'Timix', achievement: 'Design brand' },
        { name: 'David Kim', achievement: 'Founded peer mentoring program' }
      ]
    },
    // ... rest of your categories
  ];
  
  useEffect(() => {
    setCategories(categoriesData);
    setFilteredCategories(categoriesData);
  }, []);
  
  const handleSearch = (): void => {
    let results = categories;
    
    // Apply search term filter
    if (searchTerm) {
      results = results.filter(category => 
        category.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filter !== 'all') {
      results = results.filter(category => category.type === filter);
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
          {filteredCategories.map(category => (
            <CategoryCard 
              key={category.id}
              category={category.category}
              icon={category.icon}
              description={category.description}
              candidates={category.candidates.map(candidate => ({
                name: candidate.name,
                achievement: candidate.achievement || '' // Ensure achievement is always a string
              }))}
            />
          ))}
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