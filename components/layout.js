import React from "react";
import Header from "./navigation/Header";
import { Container } from "@mantine/core";
import { useSession } from "next-auth/react";

function Layout({ children }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Header user={session?.user} />
        <main>
          <Container
            style={{
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
          >
            {children}
          </Container>
        </main>
      </>
    );
  } else {
    return (
      <main>
        <Container
          style={{
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          {children}
        </Container>
      </main>
    );
  }
}

export default Layout;

