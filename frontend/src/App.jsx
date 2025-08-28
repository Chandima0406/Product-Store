import { Button, Box, VStack, Text, Heading } from "@chakra-ui/react"

function App() {
  console.log("App component rendering");

  return (
    <Box 
      bg="gray.100" 
      minHeight="100vh" 
      width="100%" 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
      p={5}
    >
      <VStack 
        spacing={4} 
        bg="white" 
        p={6} 
        borderRadius="md" 
        boxShadow="lg"
        width="300px"
      >
        <Heading size="lg">Product Store</Heading>
        <Text>Testing the display</Text>
        <Button colorScheme="blue">Click me</Button>
      </VStack>
    </Box>
  )
}

export default App
