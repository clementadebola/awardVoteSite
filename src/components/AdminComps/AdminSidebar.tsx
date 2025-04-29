import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaVideo, FaCalendarAlt, FaUser , FaSignOutAlt, FaAward, } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { IoArrowBackSharp } from "react-icons/io5";



const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };
  return (
    <SidebarContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="Logo" />
      </LogoContainer>
      <nav>
        <SidebarLink to="/admin">
          <SidebarIcon>
            <FaHome />
          </SidebarIcon>
          Home
        </SidebarLink>
        <SidebarLink to="/admin/profile">
        <SidebarIcon>
        <FaUser />
          </SidebarIcon>
        Profile
        </SidebarLink>

        <SidebarLink to="/admin/category">
          <SidebarIcon>
            <FaAward />
          </SidebarIcon>
          Manage Category
        </SidebarLink>

        <SidebarLink to="/admin/livestream">
          <SidebarIcon>
            <FaVideo />
          </SidebarIcon>
          Live Stream
        </SidebarLink>
        <SidebarLink to="/admin/events">
          <SidebarIcon>
            <FaCalendarAlt />
          </SidebarIcon>
          Events
        </SidebarLink>
        <SidebarLink to="/">
        <SidebarIcon>
        <IoArrowBackSharp />
          </SidebarIcon>
          Back Home
        </SidebarLink>

        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </LogoutButton>
      </nav>
    </SidebarContainer>
  );
};

export default AdminSidebar;

const SidebarContainer = styled.div`
  width: 250px;
  background: linear-gradient(to right, #2c3e50, #34495e);
  color: white;
  padding: 24px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  flex-direction: column;
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin: 5px 0;
  font-size: 1;

  &:hover {
    background-color: #34495e;
    transform: translateX(10px);
  }
`;

const SidebarIcon = styled.span`
  margin-right: 15px;
  font-size: 1.4rem;
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
