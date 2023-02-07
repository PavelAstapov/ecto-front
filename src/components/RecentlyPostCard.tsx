import React from 'react';
import { Stack, Text, Link as ChakraLink, Box, Flex, Badge, Avatar, Tag } from '@chakra-ui/react'
import Link from 'next/link';
import { BlogPostsMainData } from '@/Types/types';
import { GetTagInfo } from './helpers/teg-helper';
import { formatDate } from './helpers/format-date';

interface Props {
  item?: BlogPostsMainData,
}

function RecentlyPostCard ({ item }: Props) {
	const { url, title, readingTime, updatedAt, previewText } = item!.attributes;
	const date = formatDate(updatedAt);

  return (
		<Box
			padding="8px"
			width={{ base: "100%", sm: 'calc(50% - 16px)' }}
			maxW="400px"
			bgColor="#fff"
			borderRadius="8px"
			top="0"
			position="relative"
			transition="top 250ms ease, box-shadow 250ms ease"
			_hover={{ textDecoration: "none", boxShadow: "0px 2px 4px rgb(46 41 51 / 8%), 0px 5px 10px rgb(71 63 79 / 16%)", top: "-3px" }}
			boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
			>
			<Stack
				padding="16px"
				justify="flex-start"
				align="flex-start"
				spacing="24px"
				alignSelf="stretch"
			>
				<Stack
					justify="flex-start"
					align="flex-start"
					spacing="16px"
					alignSelf="stretch"
				>
					<Stack
						justify="flex-start"
						align="flex-start"
						alignSelf="stretch"
					>
						<Tags data={item}/>
						<ChakraLink
							lineHeight="1.4"
							fontWeight="bold"
							fontSize="20px"
							color="gray.800"
							alignSelf="stretch"
							href={url}
							as={Link}
							_hover={{ textDecoration: "none" }}
						>
							{title}
						</ChakraLink>
					</Stack>
					<Text
						lineHeight="1.5"
						fontWeight="regular"
						fontSize="16px"
						color="gray.600"
						alignSelf="stretch"
					>
						{previewText}
					</Text>
				</Stack>
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
							src={item!.attributes.author.data.attributes.img.data.attributes.url}
						/>
					</ChakraLink>
					<Box>
						<ChakraLink
							lineHeight="1.43"
							fontWeight="medium"
							fontSize="14px"
							color="gray.800"
							as={Link}
							href={`/authors/${item!.attributes.author.data.attributes.url}`}
							_hover={{ textDecoration: "none", color: "blue.500" }}>
							<Text>
								{item!.attributes.author.data.attributes.name}
							</Text>
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
  	</Box>
	)
}

export function Tags (item: any) {
	const tagData = GetTagInfo(item.data.attributes.category)

	const { categoryColor, categoryName, categoryLink } = tagData
	return (
		<ChakraLink as={Link} href={categoryLink} _hover={{ textDecoration: "none" }}>
			<Tag bgColor={categoryColor} color="#fff" textTransform="uppercase" mb="16px">{categoryName}</Tag>
		</ChakraLink>
	)
}

export default RecentlyPostCard
