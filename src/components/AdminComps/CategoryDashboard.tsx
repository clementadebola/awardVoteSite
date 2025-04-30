import styled from 'styled-components';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { Link } from 'react-router-dom';


const CategoryDashboard = () => {
  return (
    <DashboardWrapper>
      <h2>Category Listing</h2>
      <CategoryForm onCategoryAdded={() => {}} />
      <CategoryList />
      <LinkWrapper>
  <Link to="/admin/all-category">See More Categories</Link>
</LinkWrapper>
    </DashboardWrapper>
  );
};

export default CategoryDashboard;

const DashboardWrapper = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;

  h2 {
    margin-bottom: 1rem;
    color: #090b22;
  }
`;

const LinkWrapper = styled.div`
  margin-top: 2rem;
  text-align: center;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
  }
`;
