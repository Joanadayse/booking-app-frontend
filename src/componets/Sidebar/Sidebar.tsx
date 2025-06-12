import { FiArchive, FiBarChart2, FiBriefcase, FiClock, FiLogOut, FiMapPin } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/getInitials";
import { useEffect, useState } from "react";
import { Footer, Logo, logo, LogoWrapper, Nav, NavItem, SidebarContainer } from "./Sidebar.styles";
import reservasIcon from "../../assets/icons/Icon-calendar.png"
import ambientesIcon from "../../assets/icons/Icon-list.png";
import historicoIcon from "../../assets/icons/Icon-history.png";
import listIcon from "../../assets/icons/Icon-list.png";






export const Sidebar = () => {
  const location = useLocation();
    const navigate = useNavigate();

 const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

 useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          console.error("❌ Token não encontrado! Usuário não autenticado.");
          setUserData(null);
          return;
        }

        console.log("🔹 Token recuperado do sessionStorage:", token);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log("👤 User data recebido:", data);

          if (data?.name && data?.email) {
            setUserData({
              name: data.name,
              email: data.email
            });
          } else {
            console.warn("⚠️ Usuário não encontrado na resposta.");
            setUserData(null);
          }
        } else {
          console.error("🚫 Não autorizado ao buscar usuário.");
          setUserData(null);
        }
      } catch (error) {
        console.error("❌ Erro ao buscar usuário:", error);
        setUserData(null);
      }
    };

    fetchUser();
  }, []);




const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};



  return (
   <SidebarContainer>
      <LogoWrapper>
        <Logo src={logo} alt="Logo" />
        
      </LogoWrapper>

      <Nav>
        <NavItem  to="/reservas" active={location.pathname === "/reservas"}>
         <img src={reservasIcon} alt="icon-reservas"/>
          Reservas
        </NavItem>
        <NavItem to="/ambientes" active={location.pathname === "/ambientes"}>
          <img src={ambientesIcon} alt="icon-ambientes"/>
          Ambientes
        </NavItem>
        <NavItem to="/historico" active={location.pathname === "/historico"}>
          <img src={historicoIcon} alt="icon-history"/>
          
          Histórico
        </NavItem>
        <NavItem  to="/dashboard" active={location.pathname === "/dashboard"}>
          <img src={listIcon} alt="icon-list"/>
          
          Estatísticas
        </NavItem>
      </Nav>

      <Footer>
        Local: <span>São Luís</span>
      </Footer>
    </SidebarContainer>
  );
};


