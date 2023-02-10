import React from 'react';
import {
    Box,
		Heading,
		Flex} from '@chakra-ui/react';
import { BlogPostsMainData } from '@/Types/types';
import PickPostCard from '../PickPostCard';

interface Props {
	item: BlogPostsMainData[];
}

function PickPosts({ item }: Props) {
  return (
		<Box
			as="section"
			width="100%"
			bgColor="#fff"
			paddingBottom={{ base: "60px", lg: '80px' }}
			paddingTop={{ base: "60px", lg: '80px' }}
			position="relative"
		>
			<Box
				maxWidth="1216px"
				margin="0 auto"
				width="90%"
				mb="32px"
			>
				<Heading
					as="h2"
					width="100%"
					mb="56px"
					textAlign="center"
				>
					Our Top Pick This Month
				</Heading>
			</Box>
			<Flex
				maxWidth="1216px"
				margin="0 auto"
				width="90%"
				columnGap="16px"
				rowGap="32px"
				flexWrap="wrap"
				alignItems={{ base: "flex-start", md: "stretch" }}
				justifyContent="flex-start"
			>
				{item && item.slice(0, 5).map(( item: BlogPostsMainData, index: number ) =>
					<PickPostCard key={index} item={item} />
				)}
			</Flex>
		</Box>
  );
}

export default PickPosts;