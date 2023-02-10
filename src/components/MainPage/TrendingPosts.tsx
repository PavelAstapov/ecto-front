import React from 'react';
import {
    Box,
		Heading,
		Flex
	} from '@chakra-ui/react';
import { BlogPostsMainData } from '@/Types/types';
import BigHorizontalCardImg from '../BigHorizontalCardImg';

interface Props {
	item: BlogPostsMainData[];
}

function TrendingPosts({ item }: Props) {
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
				{item && item.map(( item: BlogPostsMainData, index: number ) =>
					<BigHorizontalCardImg key={index} item={item} />
				)}
			</Flex>
		</Box>
  );
}

export default TrendingPosts;