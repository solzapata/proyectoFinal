import React from "react";
import styled from "styled-components";

import useLanguageContext from "../contexts/LanguageContext";

import BasicCard from "../components/CardMovie";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #1d1d1d;
  box-shadow: inset -100px -50px 110px 41px #000;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 3vw;
  @media (max-width: 650px) {
    justify-content: space-evenly;
    margin-bottom: 15vw;
  }
`;

const Text = styled.p`
  color: #fafafa;
  font-family: "Roboto";
  font-size: 1.5vw;
  text-align: center;
  margin-top: 4vw;
  @media (max-width: 650px) {
    font-size: 3vw;
  }
`;

const NOT_FOUND = {
  eng: "Similar Movies not found. Showing Popular Movies instead.",
  spa:
    "No se encontraron películas similares. Se muestran las películas más populares.",
};

const SimilarMovies = ({ movies, notFound = false }) => {
  const { language } = useLanguageContext();

  return (
    <StyledSection>
      {notFound && <Text>{NOT_FOUND[language]}</Text>}
      <StyledContainer>
        {movies.map((movie) => (
          <BasicCard
            data={movie}
            media_type="movie"
            customStyle={{ marginBottom: "3vw" }}
          />
        ))}
      </StyledContainer>
    </StyledSection>
  );
};

export default SimilarMovies;
