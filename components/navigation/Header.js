import {
  Avatar,
  Container,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import React, { use, useState } from "react";
import Logo from "./Logo";
import { signOut } from "next-auth/react";
import Link from "next/link";

function Header({ user }) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Container bg="gray" fluid>
      <Container py={20}>
        <Group position="apart">
          <Logo />

          <Link
            href="/search"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Text>Search</Text>
          </Link>

          <Menu
            width={200}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            {/* Menu trigger */}
            <Menu.Target>
              <UnstyledButton>
                <Group spacing={7}>
                  <Avatar src={user?.image} radius="xl" size={20} />
                  <Text>{user?.name}</Text>
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Link href="/watchlist" style={{ textDecoration: "none" }}>
                <Menu.Item>Watchlist</Menu.Item>
              </Link>
              <Menu.Label>Account Actions</Menu.Label>
              <Menu.Item
                color="red"
                onClick={() => signOut({ redirect: false })}
              >
                Log out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </Container>
  );
}

export default Header;

