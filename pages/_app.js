import RouterTransition from "@/components/RouterTransition";
import Layout from "@/components/layout";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";
import "node_modules/react-modal-video/scss/modal-video.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <Notifications />
      <RouterTransition />
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </MantineProvider>
  );
}

export default MyApp;

