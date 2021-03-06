import React, { useEffect, useState } from "react";
import {
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import API_KEY from "../data/apiKey";
import API_URL from "../utils/API_URL";

import useMoviesContext from "../contexts/MoviesContext";

import Hero from "../components/Hero";
import MovieNavLinks from "../components/MovieNavLinks";
import MovieInfo from "../components/MovieInfo";
import MovieCast from "../components/MovieCast";
import SimilarMovies from "../components/SimilarMovies";
import MainFlex from "../components/MainFlex";
import Footer from "../components/Footer";
import LoadingPage from "../pages/LoadingPage";
import ButtonBack from "../components/ButtonBack";

const Bodycontainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoviePage = () => {
  const { movieId } = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
  const { popularMovies } = useMoviesContext();
  const [selectedMovie, setSelectedMovie] = useState({});
  const [selectedMovieCast, setSelectedMovieCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isMovieDataLoading, setIsMovieDataLoading] = useState(true);

  const handleGoBackClick = () => {
    history.goBack();
  };

  useEffect(() => {
    setIsMovieDataLoading(true);
    axios
      .get(`${API_URL}movie/${movieId}?api_key=${API_KEY}`)
      .then((response) => {
        setSelectedMovie(response.data);
        setIsMovieDataLoading(false);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
      .then((response) => {
        setSelectedMovieCast(response.data.cast);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${API_URL}movie/${movieId}/similar?api_key=${API_KEY}`)
      .then((response) => {
        setSimilarMovies(response.data.results);
      })
      .catch((err) => console.log(err));
  }, [movieId]);

  return isMovieDataLoading ? (
    <LoadingPage />
  ) : (
    <Bodycontainer>
      <MainFlex>
        <ButtonBack handleClick={handleGoBackClick} />
        <Hero data={selectedMovie} media_type="movie" page="secondary" />
        <MovieNavLinks />
        <Switch>
          <Route exact path={`${path}/info`}>
            <MovieInfo data={selectedMovie} />
          </Route>
          <Route exact path={`${path}/cast`}>
            <MovieCast actors={selectedMovieCast} />
          </Route>
          <Route exact path={`${path}/similar`}>
            <SimilarMovies
              movies={
                similarMovies.length !== 0 ? similarMovies : popularMovies
              }
              notFound={similarMovies.length === 0}
            />
          </Route>
        </Switch>
      </MainFlex>
      <Footer />
    </Bodycontainer>
  );
};

export default MoviePage;
