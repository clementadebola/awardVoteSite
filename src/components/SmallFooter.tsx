// components/SmallFooter.tsx
import React from 'react';
import styled from 'styled-components';

const SmallFooterWrapper = styled.footer`
  background-color: #110F0F;
  padding: 20px 0;
  height: 70px;
  text-align: center;
  font-size: 0.9rem;
  color: grey;

  @media (max-width: 768px){

  font-size: 0.8rem;
  
  }
`;

const SmallFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <SmallFooterWrapper>
      © Copyright Nuesa Auo {currentYear}. All Rights Reserved. Designed and Developed by Ziongate IT
    </SmallFooterWrapper>
  );
};

export default SmallFooter;