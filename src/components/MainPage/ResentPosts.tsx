import React, { useEffect, useState } from 'react';
import {
    Box,
    Link as ChakraLink,
		Text,
		Heading,
		Flex} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link'
import {AllBlogPostsArray, BlogPostsMainData, PreviewBlogData } from '@/Types/types';
import CategoryListItem from '../CategoryListItem';
import RecentlyPostCard from '../RecentlyPostCard';
import Sponsor from 'src/img/sponsor.jpg'
import { getFourLatestsPosts } from '../api/api.service';
import { Skeleton } from '@chakra-ui/react';
import { categoryData } from '../helpers/category - data';

interface SponsorData {
	img: string
	link: string
}

function ResentPosts() {
	const [data, setData] = useState<AllBlogPostsArray>();
	const [isFetching, setIsFetching] = useState<boolean>(true);

	const postsData = async () => {
		const fetchedData = await getFourLatestsPosts();
		setIsFetching(false);
		setData(fetchedData);
	}

	useEffect(() => {
	  postsData();
	}, [])

  return (
		<Box
			as="section"
			width="100%"
			bgColor="gray.50"
			paddingBottom={{ base: "60px", lg: '80px' }}
			paddingTop={{ base: "60px", lg: '80px' }}
			position="relative">
			<Box
				maxWidth="1216px"
				margin="0 auto"
				width="90%"
				mb="32px"
			>
				<Heading as="h2">Recently Published</Heading>
			</Box>
			<Flex
				maxWidth="1216px"
				margin="0 auto"
				alignItems="flex-start"
				justifyContent="flex-start"
				flexDirection={{ base: "column", lg: 'row' }}
				columnGap="64px"
				width="90%"
				>
					<Flex
						flexWrap="wrap"
						columnGap="32px"
						rowGap="32px"
						width="100%"
						alignItems="stretch"
						justifyContent="flex-start"
						mb={{ base: "32px", lg: '0' }}
					>
						{isFetching && (
							<>
								<Skeleton
									height={{ base: "200px", md: "300px"}}
									width={{ base: "100%", sm: 'calc(50% - 16px)' }}
									maxW="400px"
								/>
								<Skeleton
									height={{ base: "200px", md: "300px"}}
									width={{ base: "100%", sm: 'calc(50% - 16px)' }}
									maxW="400px"
								/>
								<Skeleton
									height={{ base: "200px", md: "300px"}}
									width={{ base: "100%", sm: 'calc(50% - 16px)' }}
									maxW="400px"
								/>
								<Skeleton
									height={{ base: "200px", md: "300px"}}
									width={{ base: "100%", sm: 'calc(50% - 16px)' }}
									maxW="400px"
								/>
							</>
						)}
						{data && data?.articles.map(( item: BlogPostsMainData, index: number ) =>
							<RecentlyPostCard key={index} item={item} />
						)}
					</Flex>
					<Flex
						width="100%"
						maxW={{ base: "none", lg: '320px' }}
						columnGap={{ base: "0", md: "32px", lg: '0' }}
						alignItems="space-between"
						rowGap="64px"
						flexDirection={{ base: "column", md: "row", lg: 'column' }}
					>
						<Box width="100%">
							<>
								<Text fontWeight="700" fontSize="18px">Topics</Text>
								{categoryData.map((items, index) =>
									<CategoryListItem key={index} item={items} />
								)}
							</>
						</Box>
						<Box>
							<Text fontWeight="700" fontSize="18px">Our Sponsor</Text>
							<ChakraLink
								as={Link}
								href="#"
								display="block"
								width="320px"
								height="248px"
								overflow="hidden"
								borderRadius="8px"
								mt="12px"
								position="relative"
								filter="drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1)) drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.06))"
							>
								<Image
									style={{ objectFit:"cover" }}
									src={Sponsor}
									fill
									alt={'test'}
								/>
							</ChakraLink>
							<ChakraLink
								as={Link}
								href="#"
								fontSize="12px"
								display="block"
								textAlign="center"
								color="#718096"
								mt="8px"
								_hover={{ color: "#323232", textDecoration: "none" }}
							>
									ADVERTISE WITH US
							</ChakraLink>
						</Box>
					</Flex>
				</Flex>
		</Box>
  );
}

export default ResentPosts;