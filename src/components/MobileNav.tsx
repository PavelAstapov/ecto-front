import { HeaderMenuData } from "@/Types/types";
import { Stack, Link as ChakraLink, Collapse, useDisclosure, } from "@chakra-ui/react";
import Link from "next/link";
import Search from "./MainPage/Search";

interface Props {
  item: HeaderMenuData[];
  isOpen: boolean;
}

export default function MobileNav({ item, isOpen }: Props) {
  return (
    <Collapse in={isOpen} animateOpacity>
      <Stack
      bg="white"
      position="fixed"
      left="0px"
      width="100%"
      top="60px"
      pb="20px"
      zIndex={999}
      alignItems="center"
    >
      {item.map((item: HeaderMenuData) =>
        <ChakraLink
          as={Link}
          key={item.id}
          _hover={{ color: 'blue.600' }}
          pt="10px"
          width="100%"
          fontWeight="600"
          pl="20px"
          borderBottom="1px solid"
          borderColor='gray.300'
          pb="15px"
          href={item.path}
        >
          {item.title}
        </ChakraLink>
      )}
       <Search />
    </Stack>
    </Collapse>
  );
};