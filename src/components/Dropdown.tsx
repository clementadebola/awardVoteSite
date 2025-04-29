import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  padding: 0;
  margin-left: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6600;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const DropdownContent = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  background-color: #003366;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: 10px;
  padding: 10px;
  z-index: 1;

  @media (max-width: 768px) {
    position: static;
    background-color: transparent;
    box-shadow: none;
  }
`;

const DropdownItem = styled(Link)`
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease;
   border-radius: 10px;
   font-size: 15px;

  &:hover {
    background-color: #0066cc;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1;
  }
`;

const Dropdown: React.FC<{
  title: string;
  items: { label: string; path: string }[];
  onItemClick: () => void;
}> = ({ title, items, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = () => {
    setIsOpen(false);
    onItemClick();
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>{title}</DropdownButton>
      <DropdownContent isOpen={isOpen}>
        {items.map((item, index) => (
          <DropdownItem key={index} to={item.path} onClick={handleItemClick}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;