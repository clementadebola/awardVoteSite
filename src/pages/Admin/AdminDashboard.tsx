import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import AdminSidebar from '../../components/AdminComps/AdminSidebar';
import AdminHeader from '../../components/AdminComps/AdminHeader';
import AdminHome from '../../components/AdminComps/AdminHome';
import VisitorStats from '../../components/AdminComps/VisitorStats';
import LiveStreamEditor from '../../components/AdminComps/LiveStreamEditor';
import EventEditor from '../../components/AdminComps/EventEditor';
import AdminProfile from '../../components/AdminComps/AdminProfile';
import GlobalStyles from '../../GlobalStyles';

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
            <Route path="visitors" element={<VisitorStats />} />
            <Route path="livestream" element={<LiveStreamEditor />} />
            <Route path="events" element={<EventEditor />} />
            <Route path="profile" element={<AdminProfile />} />
            
          </Routes>
        </ContentArea>
      </MainContentWrapper>
    </DashboardContainer>
  );
};

export default AdminDashboard;