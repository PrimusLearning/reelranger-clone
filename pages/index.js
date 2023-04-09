import AuthenticatedScreen from "@/components/AuthenticatedScreen";
import UnauthenticatedScreen from "@/components/UnauthenticatedScreen";
import { Button } from "@mantine/core";
import { useSession } from "next-auth/react";

function Home() {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return <AuthenticatedScreen />;
  }

  return <UnauthenticatedScreen />;
}

export default Home;

