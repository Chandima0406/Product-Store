import React, { useState } from "react";
import {
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Textarea,
  useToast,
  Flex,
  Select, // Added Select component
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  // Define categories based on your model's enum
  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Kitchen',
    'Sports & Outdoors',
    'Beauty & Personal Care',
    'Toys & Games',
    'Food & Beverages',
    'Other'
  ];

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "Other", 
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newProduct.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!newProduct.price || parseFloat(newProduct.price) <= 0) {
      newErrors.price = "Please enter a valid price greater than 0";
    }

    if (!newProduct.image) {
      newErrors.image = "Image URL is required";
    } else if (!isValidUrl(newProduct.image)) {
      newErrors.image = "Please enter a valid URL";
    }

    if (!newProduct.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Please fix the errors in the form.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real application, you would send the data to your backend here
      console.log("Product data to be saved:", {
        ...newProduct,
        price: parseFloat(newProduct.price) // Convert string to number
      });

      toast({
        title: "Product created successfully!",
        description: "Your product has been added to the store.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setNewProduct({ 
        name: "", 
        price: "", 
        image: "", 
        description: "", 
        category: "Other" 
      });
      navigate("/products");
    } catch (error) {
      toast({
        title: "Error creating product.",
        description: error.message || "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW={"container.md"} py={10}>
      <Flex direction="column" align="center">
        <Heading as={"h1"} mb={8} color="blue.600">
          Create New Product
        </Heading>

        <VStack as="form" spacing={6} w="100%" onSubmit={handleSubmit}>
          <FormControl isRequired isInvalid={errors.name}>
            <FormLabel>Product Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              placeholder="Enter product name"
              size="lg"
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.price}>
            <FormLabel>Price ($)</FormLabel>
            <Input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              placeholder="Enter price"
              size="lg"
              min="0"
              step="0.01"
            />
            <FormErrorMessage>{errors.price}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.image}>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="url"
              name="image"
              value={newProduct.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              size="lg"
            />
            <FormErrorMessage>{errors.image}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.category}>
            <FormLabel>Category</FormLabel>
            <Select
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              placeholder="Select category"
              size="lg"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.category}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              placeholder="Enter product description"
              size="lg"
              rows={4}
            />
            <FormErrorMessage>{errors.description}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            w="100%"
            isLoading={isLoading}
            loadingText="Creating..."
          >
            Create Product
          </Button>
        </VStack>
      </Flex>
    </Container>
  );
};

export default CreatePage;