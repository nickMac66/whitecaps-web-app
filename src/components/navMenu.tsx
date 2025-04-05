import { Flex, Menu, MenuItem, Divider } from "@aws-amplify/ui-react";

export default function NavMenu() {
  return (
    <header>
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="1rem"
        backgroundColor="white"
        width="100%"
      >
        <Menu>
          <MenuItem onClick={() => alert("Home")}>Home</MenuItem>
          <MenuItem onClick={() => alert("About")}>About</MenuItem>
          <MenuItem onClick={() => alert("Contact")}>Contact</MenuItem>
          <MenuItem onClick={() => alert("Stats")}>Stats</MenuItem>
        </Menu>
      </Flex>
      <Divider width="100%" />
    </header>
  );
}