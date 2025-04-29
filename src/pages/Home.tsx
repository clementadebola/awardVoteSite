import React from "react";
import styled from "styled-components";
import Hero from "../components/Hero";
import CategoriesSection from "./CategoriesSection";

const HomeContainer = styled.div`
  font-family: "Arial", sans-serif;
`;


const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Hero />
      <CategoriesSection/>
    </HomeContainer>
  );
};

export default Home;
