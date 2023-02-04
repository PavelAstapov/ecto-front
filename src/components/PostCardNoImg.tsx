import React from 'react';
import { Stack, Text, Link as ChakraLink, Box, Flex } from '@chakra-ui/react'
import Link from 'next/link';
import { PreviewBlogData } from '@/Types/types';
import { formatDate } from './helpers/format-date';

interface Props {
  item: PreviewBlogData,
	isOnBanner?: boolean
}

function PostCardNoImg ({ item, isOnBanner = false }: Props) {

	const { url, title, readingTime, updatedAt } = item.attributes;

	const date = formatDate(updatedAt)

  return (
		<Box
			className={isOnBanner? "onBanner" : ''}
			alignSelf="stretch"
			display="block"
			bgColor="#fff"
			borderRadius="8px"
			zIndex="10"
			position="relative"
			overflow="hidden"
			transition="top 250ms ease, box-shadow 250ms ease"
			boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);"
			top="0"
			_hover={{ textDecoration: "none", boxShadow: "0px 2px 4px rgb(46 41 51 / 8%), 0px 5px 10px rgb(71 63 79 / 16%)", top: "-3px" }}
			width={{ base: "100%", md: '384px' } }
		>
			<Stack
				paddingX="24px"
				paddingY="20px"
				justify="space-between"
				align="flex-start"
				spacing="16px"
				flex="1"
				alignSelf="stretch"
			>
				<Stack
					justify="flex-start"
					align="flex-start"
					spacing="16px"
					alignSelf="stretch"
				>
					<Stack justify="flex-start" align="flex-start" alignSelf="stretch">
						<ChakraLink
							href={url}
							as={Link}
							_hover={{ textDecoration: "none" }}
						>
							<Text
								lineHeight="1.5"
								fontWeight="semibold"
								fontSize="16px"
								color="gray.800"
								alignSelf="stretch"
							>
								{title}
							</Text>
						</ChakraLink>
					</Stack>
				</Stack>
				<Flex
					direction={{ base: "column", md: "row" }}
					rowGap="15px"
					justifyContent="space-between"
					alignItems="flex-start"
					paddingTop="6px"
					width="100%"
				>
					<Flex>
						<Text
							lineHeight="1.43"
							fontWeight="400"
							fontSize="14px"
							color="gray.600"
							flex="1"
							whiteSpace="nowrap"
						>
							By&nbsp;
							<ChakraLink
								as={Link}
								_hover={{ color: "blue.500" }}
								href={`authors/${item.attributes.author.data.attributes.url}`}
							>
								{item.attributes.author.data.attributes.name}&nbsp;&nbsp;
							</ChakraLink>
						</Text>
						<Text
							lineHeight="1.43"
							fontWeight="400"
							fontSize="14px"
							color="gray.600"
							flex="1"
						>
							•&nbsp;&nbsp;{date}
						</Text>
					</Flex>
					<Stack direction="row" justify="flex-end" align="center" spacing="4px">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6.00008 11.8332C2.77833 11.8332 0.166748 9.22159 0.166748 5.99984C0.166748 2.77809 2.77833 0.166504 6.00008 0.166504C9.22183 0.166504 11.8334 2.77809 11.8334 5.99984C11.8334 9.22159 9.22183 11.8332 6.00008 11.8332ZM6.58341 5.99984V3.08317H5.41675V7.1665H8.91675V5.99984H6.58341Z" fill="#A0AEC0"/>
						</svg>
						<Text
							lineHeight="1.43"
							fontWeight="400"
							fontSize="14px"
							color="gray.600"
							textAlign="end"
						>
							{readingTime} min read
						</Text>
					</Stack>
				</Flex>
			</Stack>
		</Box>
	)
}

export default PostCardNoImg
