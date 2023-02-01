import { Stack, Text, Avatar, Link as ChakraLink, Box } from '@chakra-ui/react'
import Link from 'next/link';
import Image from 'next/image'
import { BlogPostsMainData } from '@/Types/types';
import { formatDate } from './helpers/format-date';

interface Props {
  item?: BlogPostsMainData,
}

function HorizontalCardImg({item}: Props) {
  const { url, title, readingTime, updatedAt } = item!.attributes;
	const date = formatDate(updatedAt);

  return(
    <Stack
      padding="8px"
      direction="row"
      justify="flex-start"
      bgColor="#fff"
      align="center"
      width={{ base: "100%", lg: "calc(50% - 16px)" }}
      flexDirection={{ base: "column", md: "row" }}
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      borderRadius="8px"
      overflow="hidden"
      transform="translateY(rem)"
      transition="transform 250ms ease, box-shadow 250ms ease"
      _hover={{ textDecoration: "none", boxShadow: "0px 2px 4px rgb(46 41 51 / 8%), 0px 5px 10px rgb(71 63 79 / 16%)", transform: "translateY(-0.25rem)" }}
    >
      <ChakraLink
        as={Link}
        href={url}
        minWidth={{ base: "100%", md: "200px" }}
        height={{ base: "200px", lg: "100%" }}
        position="relative"
        borderRadius="8px"
        overflow="hidden"
        display="block"
      >
        <Image fill style={{ objectFit:"cover" }} src={item!.attributes.mainImage.data.attributes.url} alt={item!.attributes.title}/>
      </ChakraLink>
      <Stack
        padding="16px"
        justify="flex-start"
        align="flex-start"
        spacing="24px"
        width={{ base: "100%", md: "auto" }}
        marginStart={{ base: "0", md: "8px" }}
      >
        <ChakraLink
          as={Link}
          href={url}
          alignSelf="stretch"
          _hover={{ textDecor: "none" }}
        >
          <Text
            lineHeight="1.4"
            fontWeight="bold"
            fontSize="20px"
            color="gray.800"
            alignSelf="stretch"
          >
            {title}
          </Text>
        </ChakraLink>
        <Stack
          alignSelf="stretch"
          direction="row"
          justify="flex-start"
          align="center"
          spacing="16px"
        >
          <ChakraLink as={Link} href="#">
            <Avatar
              width="48px"
              height="48px"
              name={item!.attributes.author.data.attributes.name}
              src={item!.attributes.author.data.attributes.img.data[0].attributes.url}
            />
          </ChakraLink>
          <Box>
            <ChakraLink
              fontSize="14px"
              textDecoration="none"
              _hover={{ textDecoration: "none", color: "blue.500" }}
              as={Link}
              fontWeight="500"
              href="#"
            >
              {item!.attributes.author.data.attributes.name}
            </ChakraLink>
            <Text
              lineHeight="1.33"
              fontWeight="regular"
              fontSize="12px"
              color="gray.600"
              alignSelf="stretch"
            >
              {date} • {readingTime} min read
            </Text>
          </Box>
        </Stack>
      </Stack>
    </Stack>
)}

export default HorizontalCardImg;
