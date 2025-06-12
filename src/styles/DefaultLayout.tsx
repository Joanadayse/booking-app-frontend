import type { ReactNode } from "react";
import styled from "styled-components";
import { Sidebar } from "../componets/Sidebar/Sidebar";


const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Content = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  overflow-y: auto;
`;

interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Wrapper>
      <Sidebar />
      <Content>{children}</Content>
    </Wrapper>
  );
};
