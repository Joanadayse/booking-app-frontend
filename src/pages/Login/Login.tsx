import React, { useState } from "react";
import { login } from "../../services/api";
import type { LoginData } from "../../models/auth";
import {  useNavigate } from "react-router-dom";
import { Button, Container, Description, ErrorMessage, Form, Input, Label, LeftPanel, logo, Logo, LogoContainer, LogoText, RightPanel, Title,  FormContainer } from "./Login.styles";






const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({ name: "", email: "" });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const user = await login(formData);

    // Salva o token na sessionStorage
    sessionStorage.setItem("token", user.token);

    navigate("/reservas");
  } catch (err) {
    setError("Erro ao fazer login. Verifique seus dados.");
  }
};



  return (
    <Container>
    
        <LeftPanel>
          <LogoContainer>
            <Logo src={logo} alt="Gestão de Salas Logo" />
            <LogoText></LogoText>
          </LogoContainer>

          <Title>Acesse sua conta</Title>
          <Description>Planeje, reserve e acompanhe cada espaço.</Description>

          {error && <ErrorMessage>{error}</ErrorMessage>}

<FormContainer>
           <Form onSubmit={handleSubmit}>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                required
              />


               <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu.email@empresa.com"
                required
              />
              
              <Button type="submit">Entrar</Button>

 </Form>
 </FormContainer>

        </LeftPanel>

         <RightPanel>
             
          </RightPanel>

     
    </Container>
  );
};

export default Login;
