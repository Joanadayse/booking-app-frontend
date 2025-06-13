import styled from 'styled-components';


import logo from "../../assets/imagens/logo.jpg"
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export { logo }; 


interface NavItemProps {
  active?: boolean;
}

export const SidebarContainer = styled.div`
  width: 240px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1); /* << drop shadow */
`;

interface NavItemProps {
  active?: boolean;
}

export const Logo = styled.img`
  height: 80px;
  margin-right: 16px;
`;

export const LogoWrapper = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 12px;



  h1 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
`;


export const LocationSelectorWrapper = styled.div`
  padding: 0 24px;
  margin-top: 16px;
`;

export const LocationLabel = styled.label`
  font-weight: 500;
  font-size: 14px;
  display: block;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.neutral[700]};
`;

export const LocationSelect = styled.select`
  width: 100%;
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral[600]};
  background-color: ${({ theme }) => theme.colors.neutral.white};
  outline: none;
  transition: border 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.default};
  }
`;


export const MenuTitle = styled.div`
  padding: 0 24px;
  color: ${({ theme }) => theme.colors.neutral[700]};
  font-weight: 500;
  font-size: 16px;
  margin-top: 32px;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;



export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 24px;
  margin-top: 24px;
`;

export const NavItem = styled(NavLink)<NavItemProps>`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  color: ${({ active, theme }) =>
    active ? theme.colors.primary.default : theme.colors.neutral[600]};
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  background-color: ${({ active }) => (active ? "#F3E5F5" : "transparent")}; // cor de fundo ao selecionar
  transition: all 0.2s ease;
  border-radius: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
  }

  img {
    filter: ${({ active }) =>
      active ? "brightness(0) saturate(100%) invert(22%) sepia(89%) saturate(2601%) hue-rotate(282deg) brightness(92%) contrast(97%)"
             : "none"};
    margin-right: 12px;
    width: 20px;
    height: 20px;
  }
`;



export const Icon = styled.img`
  width: 20px;
  height: 20px;
`;




export const Footer = styled.div`
  padding: 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral[500]};

  span {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.default};
  }
`;
