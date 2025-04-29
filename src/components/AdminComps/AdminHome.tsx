import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUsers,  FaVoteYea, FaAward, FaMoneyBill } from 'react-icons/fa';



const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const AdminHome: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardCard
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <CardHeader>
          <CardTitle>Total Votes</CardTitle>
          <IconWrapper>
            <FaVoteYea />
          </IconWrapper>
        </CardHeader>
        <CardContent>
          <CardValue>1,234</CardValue>
          <CardSubtext>+5.2% from last week</CardSubtext>
        </CardContent>
      </DashboardCard>
      
      <DashboardCard
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <CardHeader>
          <CardTitle>Total Contestants</CardTitle>
          <IconWrapper>
            <FaUsers />
          </IconWrapper>
        </CardHeader>
        <CardContent>
          <CardValue>Online</CardValue>
          <CardSubtext>2,456 current viewers</CardSubtext>
        </CardContent>
      </DashboardCard>
      
      <DashboardCard
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <CardHeader>
          <CardTitle>Total Categories</CardTitle>
          <IconWrapper>
            <FaAward />
          </IconWrapper>
        </CardHeader>
        <CardContent>
          <CardValue>3</CardValue>
          <CardSubtext>Next event in 2 days</CardSubtext>
        </CardContent>
      </DashboardCard>

      <DashboardCard
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
          <IconWrapper>
            <FaMoneyBill />
          </IconWrapper>
        </CardHeader>
        <CardContent>
          <CardValue>N145,000</CardValue>
          <CardSubtext>over the last 12 days</CardSubtext>
        </CardContent>
      </DashboardCard>

      <DashboardCard
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <CardHeader>
          <CardTitle>Top Voted</CardTitle>
          <IconWrapper>
            <FaAward />
          </IconWrapper>
        </CardHeader>
        <CardContent>
          <CardValue>John Doe</CardValue>
          <CardSubtext>(250votes) </CardSubtext>
        </CardContent>
      </DashboardCard>
    </DashboardContainer>
  );
};

export default AdminHome;

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 24px;
  background-color: #f0f4f8;
  min-height: 100vh;

  @media (max-width: 768px) {
   padding: 30px;
    align-items: center;
  justify-content: center;
}
    
`;

const DashboardCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 300px;
  height: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CardTitle = styled.h2`
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
  margin: 0;
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  color: #4a90e2;
  background-color: #e6f0ff;
  padding: 12px;
  border-radius: 50%;
`;

const CardContent = styled.div`
  text-align: left;
`;

const CardValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
`;

const CardSubtext = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin: 8px 0 0;
`;