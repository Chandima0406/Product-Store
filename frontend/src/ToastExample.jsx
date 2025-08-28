import React from 'react';
import { Box, Button, VStack, Text, Heading } from "@chakra-ui/react";
import { useCustomToast } from './components/ui/toaster';

function App() {
  const toast = useCustomToast();

  const showSuccessToast = () => {
    toast.success({
      title: 'Success!',
      description: 'Your product has been added successfully.',
    });
  };

  const showErrorToast = () => {
    toast.error({
      title: 'Error!',
      description: 'Something went wrong. Please try again.',
    });
  };

  const showInfoToast = () => {
    toast.info({
      title: 'Information',
      description: 'This is an informational message.',
    });
  };

  const showLoadingToast = () => {
    const id = toast.loading({
      title: 'Loading...',
      description: 'Please wait while we process your request.',
    });
    
    // Simulate an operation that takes 3 seconds
    setTimeout(() => {
      toast.close(id);
      toast.success({
        title: 'Completed!',
        description: 'Operation completed successfully.',
      });
    }, 3000);
  };

  return (
    <Box 
      p={5} 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
      minHeight="100vh"
    >
      <VStack 
        spacing={4} 
        bg="white" 
        p={6} 
        borderRadius="md" 
        boxShadow="md"
        width="400px"
      >
        <Heading size="lg">Toast Notification Examples</Heading>
        <Text>Click buttons to see different types of toasts</Text>
        
        <Button colorScheme="green" width="100%" onClick={showSuccessToast}>
          Show Success Toast
        </Button>
        
        <Button colorScheme="red" width="100%" onClick={showErrorToast}>
          Show Error Toast
        </Button>
        
        <Button colorScheme="blue" width="100%" onClick={showInfoToast}>
          Show Info Toast
        </Button>
        
        <Button colorScheme="purple" width="100%" onClick={showLoadingToast}>
          Show Loading Toast (3s)
        </Button>
      </VStack>
    </Box>
  );
}

export default App;
