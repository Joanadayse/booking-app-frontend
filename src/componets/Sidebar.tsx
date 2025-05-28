import { FiArchive, FiBarChart2, FiBriefcase, FiClock, FiLogOut, FiMapPin } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { getInitials } from "../utils/getInitials";



const Avatar = styled.div`
  width: 60px;
  height: 50px;
  border-radius: 50%;
  // background-color: ${({ theme }) => theme.colors.primary};
  // color: #fff;
  background: #e8f2fe;
    color: #5388d0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: normal;
  margin-right: 0.5rem;
  font-size: 2rem;
  text-transform: uppercase;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  font-size: 14px;
  color: #333;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;

  small{
  color: #808080;
  
  }
`;

// Container geral da sidebar
const SidebarContainer = styled.aside`
 width: 250px;
  height: 100vh;
  background: #f5f5f5;
  padding: 1.5rem 0.5rem; /* Menor padding horizontal */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #ddd;
   font-weight: bold
`;

// Título das seções (LOCAL, MENU etc)
const SectionTitle = styled.h4`
  font-size: 13px;
  margin: 1.5rem 0 0.5rem;
  color: #888;
`;

// Item de navegação com destaque se estiver ativo
const NavItem = styled(Link)<{ active?: boolean }>`
  display: block;
  text-decoration: none;
  color: ${({ active }) => (active ? "#5388d0" : "#333")};
  background: ${({ active }) => (active ? "#e8f2fe" : "transparent")};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  // font-weight: ${({ active }) => (active ? "bold" : "normal")};
  margin-bottom: 0.5rem;
  margin-top: 0.8rem;

  &:hover {
    background: #e8f2fe;
    color: #5388d0;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #ddd;
  margin: 1.5rem 0;
`;


export const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <div>
        {/* LOCAL */}
<NavItem to="/reservas/local/1" active={location.pathname === "/reservas/local/1"}>
  <FiMapPin style={{ marginRight: "8px" }} />
  Caldeira
</NavItem>
<NavItem to="/reservas/local/2" active={location.pathname === "/reservas/local/2"}>
  <FiMapPin style={{ marginRight: "8px" }} />
  EQTLab
</NavItem>






        {/* MENU */}
        <SectionTitle>MENU</SectionTitle>
        <NavItem to="/reservas" active={location.pathname === "/reservas"}>
           <FiClock style={{ marginRight: "8px" }} />
          Reservas
        </NavItem>
        <NavItem to="/ambientes" active={location.pathname === "/ambientes"}>
        <FiBriefcase style={{ marginRight: "8px" }} />
          Ambientes
        </NavItem>
        <NavItem to="/historico" active={location.pathname === "/historico"}>
         <FiArchive style={{ marginRight: "8px" }} />
          Histórico
        </NavItem>
        <NavItem to="/dashboard" active={location.pathname === "/dashboard"}>
        <FiBarChart2 style={{ marginRight: "8px" }} />
          Dashboard
        </NavItem>

        <Divider />

        {/* USUÁRIO LOGADO */}
        <UserContainer>
  <Avatar>{getInitials("Joana Dayse")}</Avatar>
  <UserInfo>
    <span>Joana Dayse</span>
    <small>joana@email.com</small>
  </UserInfo>

 
</UserContainer>
 <NavItem to="/">
             <FiLogOut style={{ marginRight: "8px" }} />
            Sair</NavItem>

      </div>
      
    </SidebarContainer>
  );
};


