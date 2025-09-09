import React, { useState, useEffect } from "react";
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Flex,
  Box,
  Image,
  SimpleGrid,
  Icon,
  Card,
  CardBody,
  Stack,
  CardFooter,
  HStack,
  Badge,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaHeadset,
  FaUndo,
} from "react-icons/fa";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  // Fetch featured products from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch featured products (you might want to add a 'featured' field to your product model)
        const productsResponse = await fetch('http://localhost:5000/api/products?limit=3');
        const productsResult = await productsResponse.json();
        
        if (productsResult.success) {
          setFeaturedProducts(productsResult.data.slice(0, 3)); // Show first 3 products
        }

        // Fetch categories (you might want to create a categories endpoint)
        const categoriesResponse = await fetch('http://localhost:5000/api/products/categories');
        const categoriesResult = await categoriesResponse.json();
        
        if (categoriesResult.success) {
          setCategories(categoriesResult.data.map(cat => ({
            name: cat,
            image: getCategoryImage(cat),
            count: `${Math.floor(Math.random() * 50) + 50} Products` // Mock count for now
          })));
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error loading data",
          description: "Using sample data instead",
          status: "warning",
          duration: 3000,
        });
        
        // Fallback to sample data
        setFeaturedProducts(getSampleProducts());
        setCategories(getSampleCategories());
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Helper function to get category images
  const getCategoryImage = (category) => {
    const categoryImages = {
      'Electronics': 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'Clothing': 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'Books': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'Home & Kitchen': 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'Sports & Outdoors': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'Beauty & Personal Care': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'Toys & Games': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'Food & Beverages': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'Other': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    };
    return categoryImages[category] || categoryImages['Other'];
  };

  // Sample data fallback
  const getSampleProducts = () => [
    {
      _id: '1',
      name: "Wireless Headphones",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Electronics",
      description: "High-quality wireless headphones"
    },
    {
      _id: '2',
      name: "Smart Watch",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Electronics",
      description: "Feature-rich smartwatch"
    },
    {
      _id: '3',
      name: "Designer T-Shirt",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Clothing",
      description: "Premium quality t-shirt"
    }
  ];

  const getSampleCategories = () => [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: "128 Products"
    },
    {
      name: "Clothing",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: "75 Products"
    },
    {
      name: "Books",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: "92 Products"
    },
    {
      name: "Home & Kitchen",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: "64 Products"
    }
  ];

  const features = [
    {
      icon: FaTruck,
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
    },
    {
      icon: FaShieldAlt,
      title: "Secure Payment",
      description: "Your payments are safe and secure",
    },
    {
      icon: FaUndo,
      title: "Easy Returns",
      description: "30-day money-back guarantee",
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description: "Round-the-clock customer support",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box bgGradient="linear(to-r, blue.50, purple.50)" py={20}>
        <Container maxW={"container.xl"}>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap={10}
          >
            <VStack spacing={6} align="flex-start" flex={1}>
              <Heading as="h1" size="2xl" color="blue.600" lineHeight="1.2">
                Discover Amazing Products <br />
                <Text as="span" color="purple.600">
                  At Great Prices
                </Text>
              </Heading>
              <Text fontSize="xl" color="gray.600">
                Explore our curated collection of quality items for every need.
                From electronics to fashion, we've got you covered.
              </Text>
              <HStack spacing={4}>
                <Button as={Link} to="/products" colorScheme="blue" size="lg">
                  Shop Now
                </Button>
                <Button
                  as={Link}
                  to="/create"
                  variant="outline"
                  colorScheme="blue"
                  size="lg"
                >
                  Sell Products
                </Button>
              </HStack>
            </VStack>

            <Box flex={1}>
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Shopping experience"
                borderRadius="xl"
                boxShadow="2xl"
                transition="transform 0.3s ease"
                _hover={{ transform: "scale(1.02)" }}
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={16}>
        <Container maxW={"container.xl"}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {features.map((feature, index) => (
              <VStack key={index} spacing={3} textAlign="center">
                <Icon as={feature.icon} w={10} h={10} color="blue.500" />
                <Heading as="h3" size="md">
                  {feature.title}
                </Heading>
                <Text color="gray.600">{feature.description}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Box bg="gray.50" py={16}>
        <Container maxW={"container.xl"}>
          <VStack spacing={12}>
            <Heading as="h2" size="xl" textAlign="center" color="blue.600">
              Featured Products
            </Heading>

            {isLoading ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="100%">
                {[1, 2, 3].map((id) => (
                  <Card key={id} borderRadius="xl" overflow="hidden" boxShadow="lg">
                    <Skeleton height="200px" />
                    <CardBody>
                      <Stack spacing={3}>
                        <Skeleton height="24px" />
                        <Skeleton height="20px" width="60%" />
                        <Skeleton height="28px" width="40%" />
                      </Stack>
                    </CardBody>
                    <CardFooter>
                      <Skeleton height="40px" width="100%" />
                    </CardFooter>
                  </Card>
                ))}
              </SimpleGrid>
            ) : featuredProducts.length === 0 ? (
              <Text fontSize="xl" color="gray.500" textAlign="center">
                No featured products available yet. Check back soon!
              </Text>
            ) : (
              <>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="100%">
                  {featuredProducts.map((product) => (
                    <Card
                      key={product._id}
                      borderRadius="xl"
                      overflow="hidden"
                      boxShadow="lg"
                      transition="transform 0.3s ease"
                      _hover={{ transform: "translateY(-5px)" }}
                    >
                      <Box position="relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          height="200px"
                          width="100%"
                          objectFit="cover"
                          fallbackSrc="https://via.placeholder.com/300x200?text=No+Image"
                        />
                        <Badge
                          position="absolute"
                          top={3}
                          left={3}
                          colorScheme="blue"
                          textTransform="capitalize"
                        >
                          {product.category}
                        </Badge>
                      </Box>
                      <CardBody>
                        <Stack spacing={3}>
                          <Heading size="md" noOfLines={1}>{product.name}</Heading>
                          <Text color="blue.600" fontSize="xl" fontWeight="bold">
                            ${parseFloat(product.price).toFixed(2)}
                          </Text>
                          <Text noOfLines={2} color="gray.600" fontSize="sm">
                            {product.description}
                          </Text>
                        </Stack>
                      </CardBody>
                      <CardFooter>
                        <Button 
                          as={Link} 
                          to={`/products`} 
                          colorScheme="blue" 
                          width="full"
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </SimpleGrid>

                <Button
                  as={Link}
                  to="/products"
                  colorScheme="blue"
                  size="lg"
                  variant="outline"
                >
                  View All Products
                </Button>
              </>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Categories Section */}
      <Box py={16}>
        <Container maxW={"container.xl"}>
          <VStack spacing={12}>
            <Heading as="h2" size="xl" textAlign="center" color="blue.600">
              Shop by Category
            </Heading>

            {isLoading ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="100%">
                {[1, 2, 3, 4].map((id) => (
                  <Box key={id} borderRadius="xl" overflow="hidden">
                    <Skeleton height="200px" />
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="100%">
                  {categories.map((category, index) => (
                    <Box
                      key={index}
                      as={Link}
                      to={`/products?category=${category.name}`}
                      position="relative"
                      borderRadius="xl"
                      overflow="hidden"
                      boxShadow="md"
                      transition="transform 0.3s ease"
                      _hover={{ transform: "scale(1.05)", textDecoration: "none" }}
                    >
                      <Image
                        src={category.image}
                        alt={category.name}
                        height="200px"
                        width="100%"
                        objectFit="cover"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="linear-gradient(transparent, rgba(0,0,0,0.7))"
                        p={4}
                        color="white"
                      >
                        <Heading as="h3" size="md">
                          {category.name}
                        </Heading>
                        <Text fontSize="sm">{category.count}</Text>
                      </Box>
                    </Box>
                  ))}
                </SimpleGrid>

                <Button as={Link} to="/products" colorScheme="blue" size="lg">
                  Explore All Categories
                </Button>
              </>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box bg="blue.50" py={16}>
        <Container maxW={"container.xl"}>
          <VStack spacing={12}>
            <Heading as="h2" size="xl" textAlign="center" color="blue.600">
              What Our Customers Say
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="100%">
              {[
                {
                  name: "Sarah Johnson",
                  comment: "The quality of products is exceptional! Fast shipping too.",
                  rating: 5,
                },
                {
                  name: "Mike Chen",
                  comment: "Great prices and excellent customer service. Will shop again!",
                  rating: 4,
                },
                {
                  name: "Emily Davis",
                  comment: "Love the variety of products available. Something for everyone!",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card key={index} borderRadius="xl" p={6} textAlign="center">
                  <VStack spacing={4}>
                    <HStack>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                          key={star}
                          as={FaStar}
                          color={star <= testimonial.rating ? "yellow.400" : "gray.300"}
                          w={4}
                          h={4}
                        />
                      ))}
                    </HStack>
                    <Text fontStyle="italic">"{testimonial.comment}"</Text>
                    <Text fontWeight="bold" color="blue.600">
                      {testimonial.name}
                    </Text>
                  </VStack>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bgGradient="linear(to-r, blue.600, purple.600)" color="white" py={20}>
        <Container maxW={"container.xl"}>
          <VStack spacing={6} textAlign="center">
            <Heading as="h2" size="xl">
              Ready to Find Your Next Favorite Product?
            </Heading>
            <Text fontSize="xl" opacity={0.9}>
              Join thousands of satisfied customers who shop with us every day.
            </Text>
            <Button
              as={Link}
              to="/products"
              colorScheme="white"
              variant="outline"
              size="lg"
              _hover={{ bg: "white", color: "blue.600" }}
            >
              Start Shopping Now
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;