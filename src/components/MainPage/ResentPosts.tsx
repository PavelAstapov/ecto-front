import React from 'react';
import {
    Box,
    Link as ChakraLink,
		Text,
		Heading,
		Flex} from '@chakra-ui/react';
import Link from 'next/link'
import { BlogPostsMainData } from '@/Types/types';
import CategoryListItem from '../CategoryListItem';
import RecentlyPostCard from '../RecentlyPostCard';
import { categoryData } from '../helpers/category - data';
import { CldImage } from 'next-cloudinary';

interface Props {
	item: BlogPostsMainData[];
	sponsorImg?: string
	sponsorLink?: string
}

function ResentPosts({ sponsorImg, sponsorLink, item }: Props) {
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
						{item && item.map(( item: BlogPostsMainData, index: number ) =>
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
						{sponsorLink && (
							<Box>
								<Text fontWeight="700" fontSize="18px">Our Sponsor</Text>
								<ChakraLink
									as={Link}
									href={sponsorLink}
									target="_blank"
									display="block"
									width="320px"
									height="248px"
									overflow="hidden"
									borderRadius="8px"
									mt="12px"
									position="relative"
									filter="drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1)) drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.06))"
								>
									{sponsorImg && (
										<CldImage
											src={sponsorImg}
											style={{ objectFit:"cover" }}
											placeholder="blur"
											blurDataURL={sponsorImg}
											sizes="(max-width: 767px) 450px, 500px"
											fill
											alt={'test'}
										/>
									)}
								</ChakraLink>
								<ChakraLink
									as={Link}
									href="/advertisement"
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
						)}

					</Flex>
				</Flex>
		</Box>
  );
}

export default ResentPosts;