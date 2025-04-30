import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import AdminSidebar from '../../components/AdminComps/AdminSidebar';
import AdminHeader from '../../components/AdminComps/AdminHeader';
import AdminHome from '../../components/AdminComps/AdminHome';
import EventEditor from '../../components/AdminComps/EventEditor';
import CategoryDashboard from '../../components/AdminComps/CategoryDashboard';
import AdminProfile from '../../components/AdminComps/AdminProfile';
import GlobalStyles from '../../GlobalStyles';
import AllCategoriesPage from '../../components/AdminComps/AllCategoriesList';



const AdminDashboard: React.FC = () => {


  return (
    <DashboardContainer>
      <GlobalStyles />
        <AdminSidebar />
      <MainContentWrapper>
          <AdminHeader />
        <ContentArea>
          <Routes>
            <Route path="/" element={<AdminHome />} />
            /* this part manage categories /*
            <Route path="category" element={<CategoryDashboard />} />
            /* this part manage contestants /*
            <Route path="all-category" element={<AllCategoriesPage />} />
            /* this part see payments /*
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
  // height: 100vh;
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
  // padding-top: 100px;
`;