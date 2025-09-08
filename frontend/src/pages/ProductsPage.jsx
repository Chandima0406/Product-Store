import React, { useState, useEffect, useCallback } from "react";
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
  AlertDescription,
  Select,
  HStack,
  Box,
  Badge,
  useToast,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import {
  BsFilter,
  BsArrowCounterclockwise,
  BsSearch,
  BsX,
} from "react-icons/bs";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useToast();

  // Get category from URL query parameters
  const category = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All Categories",
    "Electronics",
    "Clothing",
    "Books",
    "Home & Kitchen",
    "Sports & Outdoors",
    "Beauty & Personal Care",
    "Toys & Games",
    "Food & Beverages",
    "Other",
  ];

  const fetchProducts = useCallback(
    async (categoryFilter = "") => {
      setIsLoading(true);
      setError(null);

      try {
        let apiUrl = "http://localhost:5000/api/products";

        // Add category filter if specified
        if (categoryFilter && categoryFilter !== "All Categories") {
          apiUrl += `?category=${encodeURIComponent(categoryFilter)}`;
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            `Server returned ${response.status}: ${response.statusText}`
          );
        }

        const result = await response.json();

        if (result.success) {
          setProducts(result.data);
          setFilteredProducts(result.data); // Initialize filtered products
        } else {
          throw new Error(result.message || "Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message || "Failed to load products");

        toast({
          title: "Error loading products",
          description: error.message || "Please try again later",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  // Filter products based on search query
  const filterProducts = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.category && product.category.toLowerCase().includes(query))
    );

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory, fetchProducts]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setSearchQuery(""); // Clear search when category changes

    // Update URL query parameters
    if (newCategory && newCategory !== "All Categories") {
      setSearchParams({ category: newCategory });
    } else {
      setSearchParams({});
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleRetry = () => {
    fetchProducts(selectedCategory);
  };

  const displayedProducts = searchQuery ? filteredProducts : products;
  const hasSearchResults = displayedProducts.length > 0;
  const hasActiveSearch = searchQuery.trim() !== "";

  if (error) {
    return (
      <Container maxW={"container.xl"} py={10}>
        <Alert status="error" borderRadius="md" mb={4}>
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Error Loading Products!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Box>
          <Button
            colorScheme="red"
            variant="outline"
            size="sm"
            onClick={handleRetry}
            leftIcon={<BsArrowCounterclockwise />}
          >
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW={"container.xl"} py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as={"h1"} color="blue.600" textAlign="center">
          Our Products
        </Heading>

        {/* Search and Filter Section */}
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
        >
          <VStack spacing={6} align="stretch">
            <Text fontWeight="bold" fontSize="lg" color="gray.700">
              Find Products
            </Text>

            {/* Search Bar */}
            <Box>
              <Text fontWeight="medium" mb={2} color="gray.600">
                Search Products:
              </Text>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <BsSearch color="gray.400" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Search by name, description, or category..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  pr="4.5rem"
                />
                {searchQuery && (
                  <InputLeftElement right="0">
                    <IconButton
                      aria-label="Clear search"
                      icon={<BsX />}
                      size="sm"
                      variant="ghost"
                      onClick={clearSearch}
                    />
                  </InputLeftElement>
                )}
              </InputGroup>
            </Box>

            {/* Category Filter */}
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={4}
              align={{ base: "stretch", md: "center" }}
            >
              <Box flex="1">
                <Text fontWeight="medium" mb={2} color="gray.600">
                  Filter by Category:
                </Text>
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  placeholder="All Categories"
                  width="100%"
                  maxW="300px"
                  icon={<BsFilter />}
                  size="md"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              </Box>

              {selectedCategory && selectedCategory !== "All Categories" && (
                <Box>
                  <Text fontWeight="medium" mb={2} color="gray.600">
                    Active Filter:
                  </Text>
                  <Badge
                    colorScheme="blue"
                    fontSize="md"
                    px={4}
                    py={2}
                    borderRadius="full"
                    textTransform="capitalize"
                  >
                    {selectedCategory.toLowerCase()}
                  </Badge>
                </Box>
              )}
            </Flex>

            {/* Search Results Info */}
            {hasActiveSearch && (
              <Box>
                <Text color="gray.600" fontSize="sm">
                  {hasSearchResults
                    ? `Found ${filteredProducts.length} product${
                        filteredProducts.length !== 1 ? "s" : ""
                      } matching "${searchQuery}"`
                    : `No products found matching "${searchQuery}"`}
                  {selectedCategory && selectedCategory !== "All Categories"
                    ? ` in ${selectedCategory} category`
                    : ""}
                </Text>
              </Box>
            )}
          </VStack>
        </Box>

        {isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="100%">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <Card key={id} borderRadius="lg" overflow="hidden">
                <Skeleton height="200px" />
                <CardBody>
                  <Skeleton height="24px" mb={3} />
                  <Skeleton height="20px" mb={2} />
                  <Skeleton height="16px" width="80%" />
                </CardBody>
                <CardFooter>
                  <Skeleton height="40px" width="100%" />
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        ) : displayedProducts.length === 0 ? (
          <Box textAlign="center" py={16} bg="gray.50" borderRadius="lg">
            <VStack spacing={4}>
              <Text fontSize="xl" color="gray.500" fontWeight="medium">
                {hasActiveSearch
                  ? `No products found matching "${searchQuery}"`
                  : selectedCategory && selectedCategory !== "All Categories"
                  ? `No products found in "${selectedCategory}" category.`
                  : "No products available yet."}
              </Text>
              <Text color="gray.400">
                {hasActiveSearch
                  ? "Try a different search term or browse all categories."
                  : selectedCategory && selectedCategory !== "All Categories"
                  ? "Try selecting a different category or check back later."
                  : "Be the first to add a product!"}
              </Text>
              <Button
                colorScheme="blue"
                onClick={handleRetry}
                leftIcon={<BsArrowCounterclockwise />}
                size="md"
              >
                Refresh Products
              </Button>
            </VStack>
          </Box>
        ) : (
          <>
            <Box>
              <Text color="gray.600" fontSize="md" mb={4}>
                Showing {displayedProducts.length} product
                {displayedProducts.length !== 1 ? "s" : ""}
                {hasActiveSearch ? ` matching "${searchQuery}"` : ""}
                {selectedCategory && selectedCategory !== "All Categories"
                  ? ` in "${selectedCategory}"`
                  : " across all categories"}
              </Text>
            </Box>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={6}
              w="100%"
            >
              {displayedProducts.map((product) => (
                <Card
                  key={product._id || product.id}
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                  transition="transform 0.2s ease"
                  _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
                  height="100%"
                  display="flex"
                  flexDirection="column"
                >
                  <CardBody flex="1">
                    <Image
                      src={product.image}
                      alt={product.name}
                      borderRadius="md"
                      height="200px"
                      width="100%"
                      objectFit="cover"
                      fallbackSrc="https://via.placeholder.com/300x200?text=No+Image"
                    />
                    <Stack mt="5" spacing="3">
                      <Heading size="md" noOfLines={1}>
                        {product.name}
                      </Heading>

                      {product.category && (
                        <Badge
                          colorScheme="blue"
                          width="fit-content"
                          textTransform="capitalize"
                          fontSize="xs"
                        >
                          {product.category.toLowerCase()}
                        </Badge>
                      )}

                      <Text color="blue.600" fontSize="xl" fontWeight="bold">
                        ${parseFloat(product.price).toFixed(2)}
                      </Text>

                      <Text noOfLines={3} color="gray.600" fontSize="sm">
                        {product.description}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      width="full"
                      size="md"
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default ProductsPage;
