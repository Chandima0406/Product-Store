import { Button, Container, Flex, HStack, Text, IconButton, useBreakpointValue, useColorMode } from "@chakra-ui/react";
import { BsFilePlusFill } from "react-icons/bs";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "light" ? "rgba(247, 250, 252, 0.8)" : "rgba(26, 32, 44, 0.8)";
  const borderColor = colorMode === "light" ? "gray.200" : "gray.700";
  const gradientBg = colorMode === "light" 
    ? "linear-gradient(135deg, #00B5D8, #3182CE)"
    : "linear-gradient(135deg, #63B3ED, #4299E1)";
  
  return (
    <Container 
      maxW={"1600px"} 
      px={4} 
      bg={bgColor}
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
        py={{ base: 2, sm: 0 }}
      >
        <Text
          fontSize={{ base: "20px", sm: "26px" }}
          fontWeight="800"
          textTransform="uppercase"
          textAlign="center"
          letterSpacing="wider"
          transition="all 0.3s ease"
          _hover={{
            transform: "scale(1.05)",
          }}
        >
          <Link
            to="/"
            style={{
              background: gradientBg,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Product Store
          </Link>
        </Text>

        <HStack spacing={3} alignItems={"center"}>
          {/* Navigation Links */}
          <HStack spacing={1} display={{ base: "none", md: "flex" }}>
            <Link to="/">
              <Button
                variant={location.pathname === "/" ? "solid" : "ghost"}
                colorScheme={location.pathname === "/" ? "blue" : "gray"}
                size="sm"
                fontWeight="medium"
                transition="all 0.2s ease"
                _hover={{
                  transform: "translateY(-1px)",
                  shadow: "md",
                }}
              >
                Home
              </Button>
            </Link>
            
            <Link to="/products">
              <Button
                variant={location.pathname === "/products" ? "solid" : "ghost"}
                colorScheme={location.pathname === "/products" ? "blue" : "gray"}
                size="sm"
                fontWeight="medium"
                transition="all 0.2s ease"
                _hover={{
                  transform: "translateY(-1px)",
                  shadow: "md",
                }}
              >
                Products
              </Button>
            </Link>
          </HStack>

          {/* Create Product Button */}
          <Link to={"/create"}>
            {isMobile ? (
              <IconButton
                aria-label="Add new product"
                icon={<BsFilePlusFill size={18} />}
                colorScheme="blue"
                variant="solid"
                size="md"
                borderRadius="full"
                transition="all 0.3s ease"
                _hover={{
                  transform: "scale(1.1) rotate(5deg)",
                  shadow: "lg",
                }}
                _active={{
                  transform: "scale(0.95)",
                }}
              />
            ) : (
              <Button
                leftIcon={<BsFilePlusFill size={16} />}
                colorScheme="blue"
                variant="solid"
                size="md"
                borderRadius="full"
                fontWeight="semibold"
                px={6}
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "lg",
                  bg: "blue.600",
                }}
                _active={{
                  transform: "translateY(0px)",
                }}
                bg="blue.500"
              >
                Add Product
              </Button>
            )}
          </Link>
          
          {/* Color Mode Toggle Button */}
          {/* <Button onClick={toggleColorMode} size="md" variant="ghost">
            {colorMode === "light" ? "🌙" : "☀️"}
          </Button> */}
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;