import { Carousel } from "@mantine/carousel";
import { Space, Title } from "@mantine/core";
import React from "react";
import MovieSummaryCard from "../MovieSummaryCard";

function OpeningMovies({ openingMovies }) {
  return (
    <>
      <Space h="md" />
      <Title order={2}>Opening Movies / Releases</Title>
      <Space h="md" />
      <Carousel slideSize="33.333333%" slideGap="lg" loop align="start">
        {openingMovies?.map((movie) => (
          <Carousel.Slide key={movie?.emsVersionId}>
            <MovieSummaryCard
              key={movie?.emsVersionId}
              id={movie?.emsVersionId}
              rating={movie?.tomatoRating?.tomatometer}
              name={movie?.name}
              image={movie?.posterImage?.url}
              variant="opening"
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}

export default OpeningMovies;

