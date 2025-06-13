import styled from 'styled-components';


import logo from "../../assets/imagens/logo.jpg"
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export { logo }; 


interface NavItemProps {
  active?: boolean;
}

export const SidebarContainer = styled.div`
  width: 230px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  display: flex;
  
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1); /* << drop shadow */
`;

interface NavItemProps {
  active?: boolean;
}

export const Logo = styled.img`
  height: 80px;
`;

export const LogoWrapper = styled.div`
  padding: 24px;
  display: flex;



`;


export const LocationSelectorWrapper = styled.div`
  padding: 0 24px 10px;
 
`;

export const LocationLabel = styled.label`
  font-weight: 500;
  font-size: 14px;
  display: block;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.neutral[700]};
`;



export const MenuTitle = styled.div`
padding:5px;
  color: ${({ theme }) => theme.colors.neutral[700]};
  font-weight: 500;
  font-size: 16px;
  margin-top: 10px;
  letter-spacing: 0.5px;
`;



export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 24px;

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
  background-color: ${({ active }) => (active ? "#FFE8FB" : "transparent")}; // cor de fundo ao selecionar
  transition: all 0.2s ease;
  border-radius: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[200]};
  }

img {
  margin-right: 12px;
  width: 20px;
  height: 20px;

  ${({ active }) =>
    active
      ? `
        filter: brightness(0) saturate(100%) invert(22%) sepia(89%) 
                saturate(2601%) hue-rotate(282deg) brightness(92%) contrast(97%);
      `
      : `
        filter: brightness(0) saturate(100%) invert(17%) sepia(15%) 
                saturate(1325%) hue-rotate(172deg) brightness(94%) contrast(93%);
      `}
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
