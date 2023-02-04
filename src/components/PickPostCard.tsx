import { BlogPostsMainData } from '@/Types/types';
import { Stack, Text, Avatar, Link as ChakraLink, Box, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from './helpers/format-date';

interface Props {
  item?: BlogPostsMainData,
}

function PickPostCard({item}: Props) {
  const { url, title, readingTime, updatedAt } = item!.attributes;
	const date = formatDate(updatedAt);

  return (
    <Stack
      padding="24px"
      height="400px"
      width={{ base: "100%", md: "calc(50% - 16px)", lg: "289px" }}
      justify="space-between"
      align="flex-start"
      spacing="24px"
      position="relative"
      borderRadius="8px"
      overflow="hidden"
      transform="translateY(rem)"
      transition="transform 250ms ease, box-shadow 250ms ease"
      _hover={{ textDecoration: "none", boxShadow: "0px 2px 4px rgb(46 41 51 / 8%), 0px 5px 10px rgb(71 63 79 / 16%)", transform: "translateY(-0.25rem)" }}
    >
      <Image
        placeholder="blur"
        blurDataURL={item!.attributes.mainImage.data.attributes.url}
        style={{ objectFit:"cover" }}
        sizes="(max-width: 767px) 300px, 350px"
        fill
        src={item!.attributes.mainImage.data.attributes.url} alt={item!.attributes.title}/>
      <Box
          position="absolute"
          width="100%"
          height="100%"
          top="0"
          left="0"
          bg="linear-gradient(180deg, rgba(45, 55, 72, 0) 0%, #2D3748 88.02%)"
        >
        </Box>
      <Flex
        justify="flex-start"
        align="flex-start"
        alignSelf="stretch"
        position="relative"
        height="100%"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="flexEnd"
      >
        <ChakraLink
          as={Link}
          href={url}
          alignSelf="stretch"
          mb="24px"
          display="block"
          _hover={{ textDecor: "none" }}
        >
          <Text
            lineHeight="1.4"
            fontWeight="bold"
            fontSize="20px"
            color="white"
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
          <ChakraLink as={Link} href={`/authors/${item!.attributes.author.data.attributes.url}`}>
            <Avatar
              width="48px"
              height="48px"
              name={item!.attributes.author.data.attributes.name}
              src={item!.attributes.author.data.attributes.img.data.attributes.url}
            />
          </ChakraLink>
          <Box>
            <ChakraLink
              fontSize="14px"
              textDecoration="none"
              _hover={{ textDecoration: "none", color: "blue.500" }}
              as={Link}
              color="white"
              href={`/authors/${item!.attributes.author.data.attributes.url}`}
            >
              {item!.attributes.author.data.attributes.name}
            </ChakraLink>
            <Text
              lineHeight="1.33"
              fontWeight="regular"
              fontSize="12px"
              color="white"
              alignSelf="stretch"
              mt="4px"
            >
              {date} • {readingTime} min read
            </Text>
          </Box>
        </Stack>
      </Flex>
    </Stack>
)}

export default PickPostCard;