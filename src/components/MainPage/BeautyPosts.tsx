import React, { useEffect, useState } from 'react';
import {
    Box,
    Link as ChakraLink,
		Heading,
		Flex} from '@chakra-ui/react';
import Link from 'next/link'
import { AllBlogPostsArray, BlogPostsMainData } from '@/Types/types';
import { getLatestBeautyPosts } from '../api/api.service';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import HorizontalCardImg from '../HorizontalCardImg';

function BeautyPosts() {
	const [data, setData] = useState<AllBlogPostsArray>();

	const postsData = async () => {
		const fetchedData = await getLatestBeautyPosts();
		setData(fetchedData);
	}

	useEffect(() => {
	  postsData();
	}, [])

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
					href="#"
				>
					<Heading
						as="h2"
						width="100%"
						textAlign={{ base: "center", md: "left" }}
					>
						Beauty
					</Heading>
				</ChakraLink>
				<ChakraLink
					as={Link}
					href="#"
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
				{data && data?.articles.map(( item: BlogPostsMainData, index: number ) =>
					<HorizontalCardImg key={index} item={item} />
				)}
			</Flex>
		</Box>
  );
}

export default BeautyPosts;