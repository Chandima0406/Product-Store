import React from "react";
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Flex,
  Box,
  Image
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Box>
      <Container maxW={"container.xl"} py={10}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={10}
        >
          <VStack spacing={6} align="flex-start" flex={1}>
            <Heading as="h1" size="2xl" color="blue.600">
              Welcome to Product Store
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Discover amazing products at great prices. Our curated collection offers quality items for every need.
            </Text>
            <Button as={Link} to="/products" colorScheme="blue" size="lg">
              Browse Products
            </Button>
          </VStack>
          
          <Box flex={1}>
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Shopping experience"
              borderRadius="lg"
              boxShadow="lg"
            />
          </Box>
        </Flex>
      </Container>
      
      <Box bg="blue.50" py={16}>
        <Container maxW={"container.xl"}>
          <VStack spacing={8}>
            <Heading as="h2" size="xl" color="blue.600">
              Why Choose Us
            </Heading>
            
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-around"
              gap={8}
              w="100%"
            >
              <VStack spacing={3} maxW="300px" textAlign="center">
                <Box fontSize="4xl" color="blue.500">🚚</Box>
                <Heading as="h3" size="md">Fast Delivery</Heading>
                <Text>Get your products delivered quickly to your doorstep.</Text>
              </VStack>
              
              <VStack spacing={3} maxW="300px" textAlign="center">
                <Box fontSize="4xl" color="blue.500">💯</Box>
                <Heading as="h3" size="md">Quality Guarantee</Heading>
                <Text>We ensure all our products meet high quality standards.</Text>
              </VStack>
              
              <VStack spacing={3} maxW="300px" textAlign="center">
                <Box fontSize="4xl" color="blue.500">🔒</Box>
                <Heading as="h3" size="md">Secure Payment</Heading>
                <Text>Your transactions are safe and secure with our payment system.</Text>
              </VStack>
            </Flex>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;