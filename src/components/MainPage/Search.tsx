import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  useDisclosure,
  Link as ChakraLink,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Heading
 } from '@chakra-ui/react';
import algoliasearch from 'algoliasearch/lite';
import Link from 'next/link';
import { useState } from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, PoweredBy } from 'react-instantsearch-hooks-web';

function Search() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showResult, setShowResult] = useState<boolean>(false)
  const searchClient = algoliasearch(
    'J393BVUV3P',
    '2aefd684f363941cd9a713c451289148'
  );

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
        mt={{ base: "20px !important", lg: "0"}}
        _hover={{ cursor: "pointer" }}
        display='flex'
      >
        <SearchIcon mr="8px" width="20px" color="gray.400" />
        Discover news, articles and more
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          width="90vw"
          padding={{ base:"40px 0px 30px 0px", md: "40px 15px 30px 15px" }}
          maxWidth={{ base: "none", lg: "750px" }}
        >
          <ModalCloseButton />
          <ModalBody>
          <InstantSearch
            searchClient={searchClient}
            indexName="production_Itransition test">
            <SearchBox
              onChangeCapture={(e) => setShowResult((e.target as HTMLInputElement).value !== '')}
              onResetCapture={() => setShowResult(false)}
            />
            {showResult && <Hits hitComponent={Hit} />}
            <Box
              width="100%"
              mt="20px"
              display="flex"
              justifyContent="flex-end"
            >
              <PoweredBy />
            </Box>
          </InstantSearch>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

function Hit({ hit }: any) {
  return (
    <ChakraLink _hover={{ textDecor: "none", color: "blue.500" }} as={Link} href={`/${hit.url}`}>
      <Text mb="7px" color="blue.800">{hit.category}</Text>
      <Heading as="h4" fontSize="20px" mb="10px">
        <Highlight attribute="title" hit={hit} />
      </Heading>
      <Text color="gray.800">
        <Highlight attribute="previewText" hit={hit} />
      </Text>
    </ChakraLink>
  );
}

export default Search;