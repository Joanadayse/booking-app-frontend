import { FiArchive, FiBarChart2, FiBriefcase, FiClock, FiLogOut, FiMapPin } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/getInitials";
import React, { useEffect, useState } from "react";
import { Footer, Icon, LocationLabel, LocationSelect, LocationSelectorWrapper, Logo, logo, LogoWrapper, MenuTitle, Nav, NavItem, SidebarContainer } from "./Sidebar.styles";
import reservasIcon from "../../assets/icons/Icon-calendar.svg"
import ambientesIcon from "../../assets/icons/Icon-list.svg";
import historicoIcon from "../../assets/icons/Icon-history.svg";
import listIcon from "../../assets/icons/Icon-graphic.svg";
import Select from "react-select";
import type { SingleValue } from "react-select";
import { StyledSelect } from "./LocationSelect.styles.tsx";

type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: "sao-luis", label: "São Luís" },
  { value: "porto-alegre", label: "Porto Alegre" },
];





// Dentro do componente Sidebar
export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(options[0]);




  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          console.error("❌ Token não encontrado! Usuário não autenticado.");
          setUserData(null);
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data?.name && data?.email) {
            setUserData({
              name: data.name,
              email: data.email,
            });
          } else {
            setUserData(null);
          }
        } else {
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

    <LocationSelectorWrapper>
      <MenuTitle>Local</MenuTitle>
      
      <StyledSelect
  classNamePrefix="react-select"
  options={options}
  value={selectedOption}
  onChange={(option) => setSelectedOption(option)}
  isSearchable={false}
   components={{ IndicatorSeparator: () => null }}
/>
    </LocationSelectorWrapper>

      <Nav>
        <MenuTitle>Menu</MenuTitle>
        <NavItem to="/reservas" active={location.pathname === "/reservas"}>
          <Icon src={reservasIcon} alt="icon-reservas" />
          Reservas
        </NavItem>
        <NavItem to="/ambientes" active={location.pathname === "/ambientes"}>
          <Icon src={ambientesIcon} alt="icon-ambientes" />
          Ambientes
        </NavItem>
        <NavItem to="/historico" active={location.pathname === "/historico"}>
          <Icon src={historicoIcon} alt="icon-history" />
          Histórico
        </NavItem>
        <NavItem to="/dashboard" active={location.pathname === "/dashboard"}>
          <Icon src={listIcon} alt="icon-list" />
          Estatísticas
        </NavItem>
      </Nav>

      <Footer>
        Local: <span>{selectedOption?.label}</span>
      </Footer>
    </SidebarContainer>
  );
};
