import { extendBaseTheme } from '@chakra-ui/theme'
import chakraTheme from '@chakra-ui/theme'

const { Button, Card, Container, FormControl, Input } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
    Card,
    Container,
    FormControl,
    Input,
  },
  colors: {
    brand: {
      50: '#e6f5ff',
      100: '#b3e0ff',
      200: '#80ccff',
      300: '#4db8ff',
      400: '#1aa3ff',
      500: '#008fe6',
      600: '#0070b3',
      700: '#005280',
      800: '#00344d',
      900: '#00161f',
    },
  },
  fonts: {
    heading: 'system-ui, sans-serif',
    body: 'system-ui, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
})

export default theme
