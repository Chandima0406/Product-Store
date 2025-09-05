'use client'

import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

export function Provider({ children, ...props }) {
  return (
    <ChakraProvider {...props}>
      {children}
    </ChakraProvider>
  )
}
