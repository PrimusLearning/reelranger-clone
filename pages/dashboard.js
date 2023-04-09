import OpeningMovies from "@/components/sections/OpeningMovies";
import PopularMovies from "@/components/sections/PopularMovies";
import {
  getOpeningMovies,
  getPopularMovies,
} from "@/lib/requests/movieRequests";
import { Space } from "@mantine/core";
import React from "react";

function Dashboard({ popularMoviesData, openingMoviesData }) {
  return (
    <>
      <PopularMovies popularMovies={popularMoviesData} />
      <Space h="lg" />
      <OpeningMovies openingMovies={openingMoviesData} />
    </>
  );
}

export async function getStaticProps() {
  // Load popular movies
  const popularMoviesData = await getPopularMovies();

  // Load opening movies
  const openingMoviesData = await getOpeningMovies();

  return {
    props: {
      popularMoviesData,
      openingMoviesData,
    },
  };
}

export default Dashboard;

