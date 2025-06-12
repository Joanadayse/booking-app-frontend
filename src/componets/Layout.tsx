import styled from "styled-components";
import { Sidebar } from "./Sidebar/Sidebar";
import type { ReactNode } from "react";


const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background: #f5f5f5;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <Wrapper>
    <Sidebar />
    <Content>{children}</Content>
  </Wrapper>
);
