import { Box, Heading } from '@chakra-ui/react'
import Link from 'next/link'

export default function FourOhFour() {
  return <>
  <Box
    height={{ base: "400px", md: "calc(100vh - 448px)" }}
    padding="0px 20px"
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    rowGap="32px"
  >
    <Heading textAlign="center" as="h1">404 - Page Not Found</Heading>
    <Link
      href="/"
      style={{
        color: "blue.500",
        fontWeight: "400"
      }}
    >
      Go back home
    </Link>
  </Box>
  </>
}