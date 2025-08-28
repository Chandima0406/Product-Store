import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.jsx'
import './index.css'

// Define a custom theme (optional)
const theme = extendTheme({
  colors: {
    brand: {
      50: '#f7fafc',
      500: '#3182ce', // Primary color
      900: '#1a202c',
    },
  },
})

// Create root element
const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error("Root element not found! Make sure there's a div with id 'root' in your HTML.")
} else {
  console.log("Root element found, creating React root")
  const root = createRoot(rootElement)

  // Render app
  root.render(
    <StrictMode>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </StrictMode>
  )
}
