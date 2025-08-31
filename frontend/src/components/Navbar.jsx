import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { BsFilePlusFill } from "react-icons/bs";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
        >
          <Link
            to="/"
            style={{
              background: "linear-gradient(to right, #00B5D8, #3182CE)", // cyan.400 -> blue.500
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Product Store
          </Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <BsFilePlusFill size={40} />
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
