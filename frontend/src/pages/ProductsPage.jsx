import React, { useState, useEffect } from "react";
import {
  Container,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  Divider,
  CardFooter,
  Button,
  VStack,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";

// Mock data - in a real app, you would fetch from your backend
const mockProducts = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    description: "Feature-rich smartwatch with health monitoring"
  }
];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchProducts = async () => {
      try {
        // This would be your actual API call:
        // const response = await fetch('/api/products');
        // const data = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProducts(mockProducts);
      } catch {
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <Container maxW={"container.xl"} py={10}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW={"container.xl"} py={10}>
      <VStack spacing={8}>
        <Heading as={"h1"} color="blue.600">
          Our Products
        </Heading>
        
        {isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="100%">
            {[1, 2, 3].map((id) => (
              <Card key={id} maxW="sm" borderRadius="lg" overflow="hidden">
                <Skeleton height="200px" />
                <CardBody>
                  <Skeleton height="20px" mb={4} />
                  <Skeleton height="16px" mb={2} />
                  <Skeleton height="16px" width="80%" />
                </CardBody>
                <CardFooter>
                  <Skeleton height="40px" width="100%" />
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        ) : products.length === 0 ? (
          <Text fontSize="xl" color="gray.500">
            No products available. Create your first product!
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="100%">
            {products.map((product) => (
              <Card key={product.id} maxW="sm" borderRadius="lg" overflow="hidden" boxShadow="md" _hover={{ transform: "translateY(-5px)", transition: "transform 0.2s" }}>
                <CardBody>
                  <Image
                    src={product.image}
                    alt={product.name}
                    borderRadius="lg"
                    height="200px"
                    width="100%"
                    objectFit="cover"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{product.name}</Heading>
                    <Text color="blue.600" fontSize="2xl" fontWeight="bold">
                      ${product.price}
                    </Text>
                    <Text>{product.description}</Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Button variant="solid" colorScheme="blue" width="full">
                    Add to cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default ProductsPage;