import React from 'react';
import {
    Box,
    Link as ChakraLink,
		Heading,
		Flex} from '@chakra-ui/react';
import Link from 'next/link'
import { BlogPostsMainData } from '@/Types/types';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import PostCardNoImg from '../PostCardNoImg';
import VerticalCardImg from '../VerticalCardImg';

interface Props {
	item: BlogPostsMainData[];
}

function BeautyPosts({ item }: Props) {
  return (
		<Box
			as="section"
			width="100%"
			paddingBottom={{ base: "60px", lg: '80px' }}
			paddingTop={{ base: "60px", lg: '80px' }}
			position="relative"
			bgColor="gray.50"
		>
			<Flex
				maxWidth="1216px"
				margin="0 auto"
				width="90%"
				mb="32px"
				justifyContent="space-between"
				alignItems="center"
				flexDir={{ base: "column", md: "row" }}
			>
				<ChakraLink
					_hover={{ textDecor: "none" }}
					as={Link}
					href="category/fashion-and-style"
				>
					<Heading
						as="h2"
						width="100%"
						textAlign={{ base: "center", md: "left" }}
					>
						Fashion & Style
					</Heading>
				</ChakraLink>
				<ChakraLink
					as={Link}
					href="category/fashion-and-style"
					color="blue.600"
					fontSize="20px"
					fontWeight="600"
					minW="180px"
					alignItems="center"
					columnGap="3px"
					display={{ base: "none", md: "flex" }}
				>
					View all articles
					<ArrowForwardIcon position="relative" top="2px" />
				</ChakraLink>
			</Flex>
			<Flex
				maxWidth="1216px"
				margin="0 auto"
				width="90%"
				columnGap="32px"
				rowGap="32px"
				flexWrap="wrap"
				justifyContent="flex-start"
			>
				{item && item.slice(0, 3).map((item: BlogPostsMainData, index: number) =>
					<VerticalCardImg key={index} item={item} />
				)}
				{item && item.slice(3, 6).map((item: BlogPostsMainData, index: number) =>
					<PostCardNoImg key={index} item={item} />
				)}
				{item && item.slice(6, 9).map((item: BlogPostsMainData, index: number) =>
					<VerticalCardImg key={index} item={item} />
				)}
			</Flex>
		</Box>
  );
}

export default BeautyPosts;