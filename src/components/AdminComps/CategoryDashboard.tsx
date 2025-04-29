import React from 'react';
import styled from 'styled-components';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';

const CategoryDashboard = () => {
  return (
    <DashboardWrapper>
      <h2>Category Listing</h2>
      <CategoryForm onCategoryAdded={() => {}} />
      <CategoryList />
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
