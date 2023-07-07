import { Alert, AlertIcon } from '@chakra-ui/react';
import React from 'react'

const ErrorComponent = ({error}) => {
  return (
    <Alert status='error'position={"fixed"} bottom={"4"} left={"50%"} w={"container.lg"}>
      <AlertIcon /> 
      {error}
    </Alert>
  )
}

export default ErrorComponent;