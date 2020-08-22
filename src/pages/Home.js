import React from "react";

import useMoviesContext from "../contexts/MoviesContext";
import useSeriesContext from "../contexts/SeriesContext";

import Hero from "../components/Hero";
import CardListPreview from "../components/CardListPreview";
import MainFlex from "../components/MainFlex";
import LoadingPage from "./LoadingPage";

const Home = () => {
  const {
    trendingMovie,
    trendingMovies,
    isMoviesDataLoading,
  } = useMoviesContext();
  const { trendingSeries, isSeriesDataLoading } = useSeriesContext();

  return isMoviesDataLoading && isSeriesDataLoading ? (
    <LoadingPage />
  ) : (
    <MainFlex>
      <Hero data={trendingMovie} media_type="movie" />

      <CardListPreview
        title="Trending Movies"
        elements={trendingMovies}
        media_type="movie"
        categoryId="trending"
      />
      <CardListPreview
        title="Trending Tv Show"
        elements={trendingSeries}
        media_type="tv"
        categoryId="trending"
      />
    </MainFlex>
  );
};

export default Home;
