import styled from 'styled-components';


import logo from "../../assets/imagens/logo.jpg"
import { Link } from 'react-router-dom';

export { logo }; 


interface NavItemProps {
  active?: boolean;
}

export const SidebarContainer = styled.aside`
  width: 260px;
  height: 100vh;
  background: #ffffff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eaeaea;
`;

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

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 24px;
  margin-top: 24px;
`;

export const NavItem = styled(Link)<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  color: ${({ active }) => (active ? '#fff' : '#333')};
  background-color: ${({ active }) => (active ? '#9B51E0' : 'transparent')};

  &:hover {
    background-color: ${({ active }) => (active ? '#9B51E0' : '#F2F2F2')};
  }
`;


export const Footer = styled.div`
  margin-top: auto;
  padding: 20px 24px;
  font-size: 14px;
  color: #888;

  span {
    font-weight: 500;
    color: #333;
  }
`;
