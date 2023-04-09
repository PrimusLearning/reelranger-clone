import { getMovieByID } from "@/lib/requests/movieRequests";
import { formatRating, formatReleaseDate } from "@/lib/utils";
import {
  Avatar,
  Badge,
  Button,
  Group,
  Image,
  Rating,
  ScrollArea,
  SimpleGrid,
  Spoiler,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconBookmark,
  IconCheck,
  IconCircle,
  IconInfoCircle,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import { authOptions } from "../api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import { notifications } from "@mantine/notifications";

function MovieDetail({ movieDetailData, emsVersionId, bookmarked }) {
  // next router
  const router = useRouter();
  // user session
  const { data: session } = useSession();
  // bookmarked state
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  // modal state
  const [isOpen, setOpen] = useState(false);
  const {
    genres,
    posterImage,
    name,
    releaseDate,
    tomatoRating,
    cast,
    synopsis,
    trailer,
    directedBy,
  } = movieDetailData;
  const formattedReleaseDate = formatReleaseDate(releaseDate);
  const roundedRating = formatRating(tomatoRating?.tomatometer);

  // add movie to watchlist
  const addToWatchlist = async () => {
    setIsLoading(true);

    notifications.show({
      id: "add-watchlist",
      loading: true,
      title: "Adding to watchlist",
      message: `${name} will be added to your watchlist`,
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId: emsVersionId,
          name,
          rating: tomatoRating.tomatometer,
          poster: posterImage.url,
          userId: session.user.id,
        }),
      });

      const data = await res.json();

      if (data.status === "success") {
        notifications.update({
          id: "add-watchlist",
          color: "teal",
          title: "Added to watchlist",
          message: `${name} has been added to your watchlist`,
          icon: <IconCheck size="1rem" />,
          autoClose: 3000,
        });

        setIsBookmarked(true);
      } else if (data.status === "existing") {
        notifications.update({
          id: "add-watchlist",
          color: "yellow",
          title: "Movie already exists",
          message: `${name} already exists in your watchlist`,
          icon: <IconCircle size="2rem" />,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  // remove from watchlist
  const removeFromWatchlist = async () => {
    setIsLoading(true);

    notifications.show({
      id: "remove-watchlist",
      loading: true,
      title: "Removing from watchlist",
      message: `${name} will be removed from your watchlist`,
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const res = await fetch(`/api/watchlist/${emsVersionId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.status === "success") {
        notifications.update({
          id: "remove-watchlist",
          color: "teal",
          title: "Removed from watchlist",
          message: `${name} has been removed from your watchlist`,
          icon: <IconCheck size="1rem" />,
          autoClose: 3000,
        });
      } else if (data.status === "error") {
        notifications.update({
          id: "remove-watchlist",
          color: "red",
          title: "Error",
          message: `${data.message}`,
          icon: <IconInfoCircle size="2rem" />,
          autoClose: 3000,
        });
      }

      setIsBookmarked(false);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Button leftIcon={<IconArrowLeft />} onClick={() => router.back()}>
        Go back
      </Button>
      <SimpleGrid cols={2} verticalSpacing="xl" mt="xl">
        <Image
          width="100%"
          height="50%"
          src={posterImage?.url}
          alt={`movie poster image of ${name}`}
          withPlaceholder
        />

        <Stack justify="flex-start" spacing="lg" h={300} ml="xl">
          <Title order={2} size="h1">
            {name}
          </Title>

          <Text>Directed by {directedBy}</Text>
          <Text>Released {formattedReleaseDate}</Text>

          <Group>
            {genres.map((movieGenre) => (
              <Badge radius="sm">{movieGenre.name}</Badge>
            ))}
          </Group>

          <Stack>
            <Group>
              <Tooltip.Group openDelay={200} closeDelay={100}>
                <Avatar.Group>
                  {cast.map((actor) => (
                    <Tooltip label={actor?.name} color="blue" withArrow>
                      <Avatar src={actor?.headShotImage?.url} radius="xl" />
                    </Tooltip>
                  ))}
                </Avatar.Group>
              </Tooltip.Group>
            </Group>

            <Group>
              <Rating value={roundedRating} fractions={5} readOnly />
              <Text>{`(${roundedRating})`}</Text>
            </Group>

            <Group>
              <Button
                variant="gradient"
                gradient={{ from: "teal", to: "blue", deg: 60 }}
                leftIcon={<IconPlayerPlay />}
                onClick={() => setOpen(true)}
              >
                Watch Trailer
              </Button>

              {isBookmarked ? (
                <Button
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                  leftIcon={<IconBookmark />}
                  loading={isLoading}
                  onClick={() => removeFromWatchlist()}
                >
                  Remove from Watchlist
                </Button>
              ) : (
                <Button
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                  leftIcon={<IconBookmark />}
                  loading={isLoading}
                  onClick={() => addToWatchlist()}
                >
                  Add to Watchlist
                </Button>
              )}
            </Group>

            <Group>
              <Title order={3} size="h2">
                Summary
              </Title>
              <ScrollArea h={300}>
                <Spoiler maxHeight={200} showLabel="Read More" hideLabel="Hide">
                  {synopsis}
                </Spoiler>
              </ScrollArea>
            </Group>
          </Stack>
        </Stack>

        {/* Trailer's modal */}
        <ModalVideo
          channel="custom"
          url={trailer.url}
          isOpen={isOpen}
          onClose={() => setOpen(false)}
        />
      </SimpleGrid>
    </>
  );
}

export async function getServerSideProps({ query, req, res }) {
  const emsVersionId = query?.id;
  const rawData = await getMovieByID(emsVersionId);
  const movieDetailData = rawData?.data?.movie;
  const { user } = await getServerSession(req, res, authOptions);
  const userId = user?.id;
  const bookmark = await prisma.watchlist.findUnique({
    where: {
      userId_movieId: {
        movieId: emsVersionId,
        userId,
      },
    },
  });

  const bookmarked = !!bookmark;

  return {
    props: { movieDetailData, emsVersionId, bookmarked },
  };
}

export default MovieDetail;

