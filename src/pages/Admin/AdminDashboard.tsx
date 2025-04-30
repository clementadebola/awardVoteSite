import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import the context hook
import AdminSidebar from '../../components/AdminComps/AdminSidebar';
import AdminHeader from '../../components/AdminComps/AdminHeader';
import AdminHome from '../../components/AdminComps/AdminHome';
import EventEditor from '../../components/AdminComps/EventEditor';
import CategoryDashboard from '../../components/AdminComps/CategoryDashboard';
import AdminProfile from '../../components/AdminComps/AdminProfile';
import GlobalStyles from '../../GlobalStyles';
import AllCategoriesPage from '../../components/AdminComps/AllCategoriesList';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated} = useAuth(); // Get authentication status and logout function
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
      navigate('/login'); // Adjust the route according to your setup
    }
  }, [isAuthenticated, navigate]);

  return (
    <DashboardContainer>
      <GlobalStyles />
      <AdminSidebar />
      <MainContentWrapper>
        <AdminHeader />
        <ContentArea>
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="category" element={<CategoryDashboard />} />
            <Route path="all-category" element={<AllCategoriesPage />} />
            <Route path="events" element={<EventEditor />} />
            <Route path="profile" element={<AdminProfile />} />
          </Routes>
        </ContentArea>
      </MainContentWrapper>
    </DashboardContainer>
  );
};

export default AdminDashboard;

const DashboardContainer = styled.div`
  display: flex;
`;

const MainContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 60px;
`;

const ContentArea = styled.div`
  flex: 1;
`;
