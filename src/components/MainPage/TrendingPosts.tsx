import React, { useEffect, useState } from 'react';
import {
    Box,
		Heading,
		Flex} from '@chakra-ui/react';
import { AllBlogPostsArray, BlogPostsMainData } from '@/types/types';
import { getTrendingPosts } from '../api/api.service';
import BigHorizontalCardImg from '../BigHorizontalCardImg';

function TrendingPosts() {
	const [data, setData] = useState<AllBlogPostsArray>();

	const postsData = async () => {
		const fetchedData = await getTrendingPosts();
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
				<Heading
					as="h2"
					width="100%"
					textAlign="center"
				>
					Trending Now
				</Heading>
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
				{data && data.articles.map(( item: BlogPostsMainData, index: number ) =>
					<BigHorizontalCardImg key={index} item={item} />
				)}
			</Flex>
		</Box>
  );
}

export default TrendingPosts;