import { Stack, Text, Link as ChakraLink, Box, Flex } from '@chakra-ui/react'
import Link from 'next/link';
import Image from 'next/image'

interface Props {
  item: {
    img: any,
    title: string
    url: string
  },
}

function CategoryListItem({ item }: Props) {
  return (
    <ChakraLink
      as={Link}
      href={item.url}
      borderRadius="8px"
      width="100%"
      display="flex"
      overflow="hidden"
      alignSelf="stretch"
      boxShadow="base"
      mt="12px"
      bgColor="#fff"
      sx={{ ":hover p" : { color: "white" }}}
      _hover={{ bgColor: "blue.400" }}
    >
      <Flex
        width="72px"
        height="52px"
        background="gray.100"
        alignItems="center"
        justifyContent="center"
      >
        <Image width="24" height="24" src={item?.img.src} alt={'test'} />
      </Flex>
      <Stack
        paddingX="16px"
        paddingY="14px"
        direction="row"
        justify="flex-start"
        align="center"
        spacing="0px"
        overflow="hidden"
      >
        <Text
          lineHeight="1.5"
          fontWeight="semibold"
          fontSize="16px"
          color="gray.700"
        >
          {item.title}
        </Text>
      </Stack>
    </ChakraLink>
)}

export default CategoryListItem;
