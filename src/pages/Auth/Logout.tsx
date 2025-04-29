import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const LogoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LogoutBox = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #dc3545;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;
  color: white;
`;

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <LogoutContainer>
      <LogoutBox>
        <Title>Are you sure you want to logout?</Title>
        <ButtonContainer>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </ButtonContainer>
      </LogoutBox>
    </LogoutContainer>
  );
};

export default Logout;