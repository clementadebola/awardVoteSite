import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import illutrator from "../../assets/Login_illustrator.png";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Login successful!");
        navigate("/admin");
      } else {
        setError("Invalid email or password");
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <IllustrationSection>
          <LoginIllustration src={illutrator} alt="Login Illustration" />
        </IllustrationSection>
        <FormSection>
          <LoginTitle>
            Admin Login
            <h6 style={{ fontSize: 13, color: "red" }}>Only admin please!</h6>
          </LoginTitle>

          <LoginForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <InputWrapper>
                <InputIcon>
                  <FaEnvelope />
                </InputIcon>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </InputWrapper>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <InputWrapper>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
                <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </InputWrapper>
            </FormGroup>
            <SubmitButton type="submit">Log In</SubmitButton>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </LoginForm>
        </FormSection>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;


const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  animation: ${fadeIn} 0.5s ease-in;
  padding: 2rem;
`;

const LoginCard = styled.div`
  background-color: white;
  display: flex;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 900px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 400px;
  }
`;

const IllustrationSection = styled.div`
  flex: 1;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const LoginIllustration = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;

  @media (max-width: 768px) {
    max-width: 170px;
  }
`;

const FormSection = styled.div`
  flex: 1;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const LoginTitle = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  text-align: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 2.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    border-color: #6e8efb;
    box-shadow: 0 0 0 2px rgba(110, 142, 251, 0.2);
    outline: none;
  }
`;

const InputIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
`;

const PasswordToggle = styled.span`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const ErrorMessage = styled.p`
  color: #f44336;
  text-align: center;
  margin-top: 1rem;
`;