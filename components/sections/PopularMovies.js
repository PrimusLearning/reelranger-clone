import { Space, Title } from "@mantine/core";
import React from "react";
import MovieCarousel from "../MovieCarousel";

function PopularMovies({ popularMovies }) {
  return (
    <>
      <Space h="md" />
      <Title order={2}>Popular Movies</Title>
      <Space h="md" />
      <MovieCarousel movies={popularMovies} />
    </>
  );
}

export default PopularMovies;

