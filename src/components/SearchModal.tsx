import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Link as ChakraLink,
  Text,
  Heading
} from "@chakra-ui/react";
import algoliasearch from "algoliasearch/lite";
import Link from "next/link";
import { useState } from "react";
import { Highlight, Hits, InstantSearch, PoweredBy, SearchBox } from "react-instantsearch-hooks-web";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const { onOpen } = useDisclosure();
  const [showResult, setShowResult] = useState<boolean>(false)
  const searchClient = algoliasearch(
    'J393BVUV3P',
    '2aefd684f363941cd9a713c451289148'
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(16px)" />
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