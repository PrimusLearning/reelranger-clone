import { SimpleGrid, Skeleton } from "@mantine/core";
import React from "react";

function SkeletonLoader() {
  return (
    <SimpleGrid cols={3} spacing="lg">
      <Skeleton height={250} />
      <Skeleton height={250} />
      <Skeleton height={250} />
    </SimpleGrid>
  );
}

export default SkeletonLoader;

