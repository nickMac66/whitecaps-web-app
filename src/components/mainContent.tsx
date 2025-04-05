import { Flex, Image, Heading, Button } from "@aws-amplify/ui-react";
import wcLogo from "../assets/images/wc-logo.jpg"; 

export default function MainContent({ user, signOut }) { // Accept props
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            direction="column"
            width="70%"
            margin="0 auto"
            className="App"
        >
            <Image src={wcLogo} alt="Whitecaps Logo" width="300px" />
            <Heading level={3}>Welcome, {user.username}!</Heading>
            <Button onClick={signOut}>Sign Out</Button>
        </Flex>
    );
}