import styled from 'styled-components';


import illustrationImage from "../../assets/imagens/Image.jpg";
import logo from "../../assets/imagens/logo.jpg"

export { logo, illustrationImage }; 

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


export const LeftPanel = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 30px 20px;
    width: 100%;
  }
`;


export const RightPanel = styled.div`
  flex: 1;
  background: url(${illustrationImage}) no-repeat top center;
  background-position: center 20%;

  background-size: cover;
  height: 100vh;

  @media (max-width: 768px) {
    display: none;
  }
`;




export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  // margin-bottom: 40px;
`;

export const Logo = styled.img`
  height: 80px;
  margin-right: 16px;
`;

export const LogoText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

export const Title = styled.h2`
  font-size: 38px;
  font-weight: 700;
  color: #314158;
  text-align: center;
   margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral['400']};
  text-align: center;
    margin-top: 0;
    
`;

export const FormContainer = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;


export const Form = styled.form`
  width: 100%;
  max-width: 500px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.neutral['600']};
  font-weight: 600;
`;



export const Input = styled.input`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #CAD5E2;
  font-size: 14px;
  transition: border-color 0.15s ease;


  &::placeholder {
    color: #738196;
    opacity: 1;
  }

  &:hover {
    transform: scale(1.02);
    border-color: ${({ theme }) => theme.colors.neutral['400']};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.cards?.purple?.default || '#d600c0'};
    background-color: #FDFDFF; /* cor de fundo rosinha */
    box-shadow: 0 0 0 4px rgba(255, 232, 251, 0.6); /* blur suave */
    outline: none;
  }

  &::selection {
    background: transparent;
    color: inherit;
  }

`;


export const Button = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 14px;
  background-color:${({ theme }) => theme.colors.cards.purple['default']};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
   background-color: ${({ theme }) => theme.colors.primary.light};
    }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 16px;
  font-size: 14px;
`;
