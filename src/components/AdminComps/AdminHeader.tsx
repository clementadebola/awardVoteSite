import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import logo from "../../assets/logo.png";

import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaHome,
  FaUsers,
  FaVideo,
  FaCalendarAlt,
  FaUser,
  FaAward,
} from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";



const AdminHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="Logo" />
        <LogoText>Admin Dashboard</LogoText>
      </LogoContainer>
      <MenuButton onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MenuButton>
      <NavMenu isOpen={isOpen}>
        <NavItem to="/admin" onClick={() => setIsOpen(false)}>
          <FaHome /> Home
        </NavItem>
        <NavItem to="/admin/profile" onClick={() => setIsOpen(false)}>
          <FaUser /> Profile
        </NavItem>
        <NavItem to="/admin/visitors" onClick={() => setIsOpen(false)}>
          <FaAward /> Categories List
        </NavItem>
        <NavItem to="/admin/livestream" onClick={() => setIsOpen(false)}>
          <FaUsers /> Contestant
        </NavItem>
        <NavItem to="/" onClick={() => setIsOpen(false)}>
          <IoArrowBackSharp /> Back To Landing Page
        </NavItem>
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </LogoutButton>
      </NavMenu>
    </HeaderContainer>
  );
};

export default AdminHeader;


const HeaderContainer = styled.header`
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  // padding: 1rem 2rem;
  // background-color: #333;
  // color: white;
  // position: relative;
  // z-index: 999;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px; // Add a fixed height
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  display: block;

  @media (min-width: 769px) {
    display: block;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

interface NavMenuProps {
  isOpen: boolean;
}

const NavMenu = styled.nav<NavMenuProps>`
  display: none;  

 @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: #333;
    padding: 1rem;
    animation: ${slideDown} 0.3s ease-out;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 999;
    overflow-y: auto; 
  }
  
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }

  svg {
    margin-right: 10px;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: inherit;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }

  svg {
    margin-right: 10px;
  }
`;