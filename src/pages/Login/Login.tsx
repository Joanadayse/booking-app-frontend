import React, { useState } from "react";
import { login } from "../../services/api";
import type { LoginData } from "../../models/auth";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
`;

const LoginBox = styled.div`
  background: white;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 400px; 
  text-align: center;
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 5px;
  color: #333;
  
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;



const Label = styled.label`
  margin-top: 10px;
  text-align: left;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  transition: all 0.3s ease-in-out;
   color: #808080;

     &::placeholder {
    color: #A9A9A9; /* Cinza mais claro para placeholders */
  }


  &:focus {
    border-color: #007BFF;
    outline: none;
    
  }
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 10px;
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #0056b3;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #666; /* Cinza mais suave */
  margin-top: 0; /* Remove margem superior */
  margin-bottom: 15px;
`;


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
      <LoginBox>
      <Title >Sistema de Reservas</Title>
       <Description>Faça login para acessar o sistema</Description> {/* Novo texto */}
  {error && <p style={{ color: "red" }}>{error}</p>}

      <Form onSubmit={handleSubmit}>
        <Label>Nome:</Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />
          <Label>Email:</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br />
        <Button type="submit">Entrar</Button>
      </Form>
      </LoginBox>
    </Container>
  );
};

export default Login;
