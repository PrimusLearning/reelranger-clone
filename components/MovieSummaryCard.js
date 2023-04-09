import { formatRating } from "@/lib/utils";
import { Button, Card, Image, Rating, Stack, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

function MovieSummaryCard({ id, name, image, rating, variant }) {
  const roundedRating = formatRating(rating);

  return (
    <Card withBorder radius="md" p="md">
      <Card.Section>
        <Image src={image} alt={name} height={250} withPlaceholder />
      </Card.Section>

      <Card.Section mt="md" p="md">
        <Stack>
          <Text size="lg" weight={500} truncate>
            {name}
          </Text>
          <Rating value={roundedRating} fractions={5} readOnly />
        </Stack>
      </Card.Section>

      {variant === "opening" ? null : (
        <Link href={`/movies/${id}`}>
          <Button radius="md" style={{ flex: 1 }}>
            More Details
          </Button>
        </Link>
      )}
    </Card>
  );
}

export default MovieSummaryCard;

