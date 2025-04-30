import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { 
  FaHome,  
  FaUser, 
  FaSignOutAlt, 
  FaAward, 
  FaUsers
} from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/logout");
  };

  // Function to check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarContainer>
      {/* <SidebarHeader>
        <Logo>Admin Panel</Logo>
      </SidebarHeader> */}

      <NavContainer>
        <SidebarLink to="/admin" className={isActive("/admin") ? "active" : ""}>
          <SidebarIcon>
            <FaHome />
          </SidebarIcon>
          Dashboard
        </SidebarLink>
        
        <SidebarLink to="/admin/profile" className={isActive("/admin/profile") ? "active" : ""}>
          <SidebarIcon>
            <FaUser />
          </SidebarIcon>
          Profile
        </SidebarLink>

        <SidebarLink to="/admin/category" className={isActive("/admin/category") ? "active" : ""}>
          <SidebarIcon>
            <FaAward />
          </SidebarIcon>
          Manage Category
        </SidebarLink>

        <SidebarLink to="/admin/all-category" className={isActive("/admin/all-category") ? "active" : ""}>
          <SidebarIcon>
            <FaUsers />
          </SidebarIcon>
          Contestants
        </SidebarLink>
        
        <SidebarDivider />
        
        <SidebarLink to="/" className={isActive("/") ? "active" : ""}>
          <SidebarIcon>
            <IoArrowBackSharp />
          </SidebarIcon>
          Back to Site
        </SidebarLink>
      </NavContainer>

      <SidebarFooter>
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </LogoutButton>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default AdminSidebar;

// Styled Components
const SidebarContainer = styled.div`
  width: 250px;
  background: linear-gradient(165deg, #1a237e, #283593, #303f9f);
  color: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;


const NavContainer = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 12px 16px;
  margin: 6px 0;
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;
  font-weight: normal;
  letter-spacing: 0.3px;
  background: transparent;
  
  &.active {
    color: white;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: white;
    border-radius: 0 4px 4px 0;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &.active::before {
    opacity: 1;
  }
`;

const SidebarIcon = styled.span`
  margin-right: 14px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  opacity: 0.9;
`;

const SidebarDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 12px 0;
`;

const SidebarFooter = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  background: rgba(255, 0, 0, 0.15);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;

  &:hover {
    background: rgba(255, 0, 0, 0.25);
    transform: translateX(5px);
  }

  svg {
    margin-right: 12px;
    font-size: 1.2rem;
  }
`;