import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  useDisclosure,
 } from '@chakra-ui/react';
 import dynamic from 'next/dynamic'

function Search() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const SearchModal = dynamic(() => import('@/components/SearchModal'), {
    ssr: false,
  })

  return (
    <>
      <Box
        onClick={onOpen}
        width={{ base: '95%', lg: "350px"}}
        height="40px"
        bgColor='gray.100'
        border="none"
        color='gray.400'
        pl="18px"
        justifyContent="flex-start"
        borderRadius="6px"
        alignItems="center"
        mt={{ base: "20px !important", lg: "0 !important"}}
        _hover={{ cursor: "pointer" }}
        display='flex'
      >
        <SearchIcon mr="8px" width="20px" color="gray.400" />
        Discover news, articles and more
      </Box>
      {isOpen && <SearchModal isOpen={isOpen} onClose={onClose} />}
    </>
  )
}

export default Search;