import { Box, Flex, Heading, Text, Link as ChakraLink, Divider, OrderedList, ListItem, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import { formatDate } from "@/components/helpers/format-date";
import Blocks from 'editorjs-blocks-react-renderer';
import SubscribeBlock from "@/components/SubscribeBlock";
import { getArticleData, getLatestCategoryData, getLatestPostsByTag, getPrevArticleData, getTagData } from "@/components/api/api.service";
import { useRouter } from "next/router";
import Link from "next/link";
import { Skeleton } from '@chakra-ui/react';
import { GetTagInfo } from "@/components/helpers/teg-helper";
import ShareButtons from "@/components/ShareButtons";
// @ts-ignore There is no types for this package
import AnchorLink from 'react-anchor-link-smooth-scroll-v2'
import CategoryListItem from "@/components/CategoryListItem";
import { categoryData } from "@/components/helpers/category - data";
import { NextSeo } from "next-seo";
import PostCardNoImg from "@/components/PostCardNoImg";
import SubscribeBlogBlock from "@/components/SubscribeBlogBlock";
import { Checklist, Delimiter, Header, ImageBlock, ListBLock, Paragraph, Quote, CodeBlock, TableBlock } from "@/components/helpers/EditorBlocks";
import BlogLatestPosts from "@/components/BlogLatestPosts";
import Comments from "@/components/Comments";
import axios from "axios";
import VerticalCardImg from "@/components/VerticalCardImg";
import { BlogPostsMainData } from "@/Types/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export default function PostPage() {
	const [data, setData] = useState<any>();
	const [pageUrl, setPageUrl] = useState<any>();
	const [articlesData, setArticlesData] = useState<any>();
	const [page, setPage] = useState<number>();
	const [counter, setCounter] = useState<number>();
	const [pageCount, setPageCount] = useState<number>();
	const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>();
	const [isNextDisabled, setIsNextDisabled] = useState<boolean>();
	const [isPagination, setIsPagination] = useState<boolean>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const router = useRouter();

	const tagData = async () => {
		const fetchedData = await getTagData(router.query.slug as string);

		setData(fetchedData);
		setPageUrl(fetchedData.tag.attributes.url);
		setIsLoading(false);
	}

	const updateAticlesList = async () => {
		const fetchedData = await getLatestPostsByTag(router.query.slug as string, page!);

		setArticlesData(fetchedData);
		setCounter(fetchedData.articles.meta.pagination.total);
		setIsLoading(false);
		setIsPagination(fetchedData.articles.meta.pagination.pageCount > 1);
		setPageCount(fetchedData.articles.meta.pagination.pageCount);
	}

	useEffect(() => {
		if (router.isReady) {
			setPage(+(router.query.page as unknown as number) || 1);

			tagData();
		}
	}, [router.query.slug]);

	useEffect(() => {
		setIsPrevDisabled(page === 1)

		articlesData && setIsNextDisabled(page === articlesData.articles.meta.pagination.pageCount);

		if(pageUrl !== undefined){
			router.push({
				pathname: `/tags/[slug]`,
				query: {
					pageUrl,
					page
				}
			},
				`/tags/${pageUrl}?page=${page}`,
				{shallow: true}
			);
		}

	}, [page, articlesData]);

	const handelClick = useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});

		setArticlesData(null);
		setIsLoading(true);

		if(router.isReady && page !== undefined) {
			updateAticlesList();
		}
	}, [page])

  return(
		<>
			{data && (
				<NextSeo
					title={data?.tag.attributes.seo.metaTitle}
					description={data?.tag.attributes.seo.metaDescription}
					canonical={data?.tag.attributes.seo.canonicalURL}
				/>
			)}
			<Box
				maxWidth="1216px"
				margin="0 auto"
				width="90%"
				mb="32px"
				as="header"
				pt={{ base: "60px", lg: "80px" }}
			>
				{data && (
					<>
						<Heading
							mb="32px"
							as="h1"
							fontWeight="800"
							position="relative"
						>
							{data.tag.attributes.tag}
							<Text
								as="span"
								bgColor="blue.500"
								width="20px"
								height="20px"
								color="#fff"
								display="inline-flex"
								fontWeight="700"
								fontSize="12px"
								lineHeight="16px"
								justifyContent="center"
								alignItems="center"
								position="relative"
								ml="20px"
								top="-5px"
							>
								{counter}
							</Text>
						</Heading>
						<Text
							color="gray.600"
							fontSize="20px"
							lineHeight="28px"
						>
							{data.tag.attributes.description}
						</Text>
					</>
				)}
			</Box>
			{isLoading && (
				<Flex
					maxWidth="1216px"
					margin="0 auto"
					width="90%"
					columnGap="32px"
					rowGap="32px"
					flexWrap="wrap"
					pb={{ base: "44px", lg: "64px" }}
					justifyContent="flex-start"
				>
					<Skeleton
						height={{ base: "200px", md: "400px"}}
						width={{ base: "100%", lg: "calc(33% - 17.5px)" }}
						borderRadius="6px"
					/>
					<Skeleton
						height={{ base: "200px", md: "400px"}}
						width={{ base: "100%", lg: "calc(33% - 17.5px)" }}
						borderRadius="6px"
					/>
					<Skeleton
						height={{ base: "200px", md: "400px"}}
						width={{ base: "100%", lg: "calc(33% - 17.5px)" }}
						borderRadius="6px"
					/>
					<Skeleton
						height={{ base: "200px", md: "400px"}}
						width={{ base: "100%", lg: "calc(33% - 17.5px)" }}
						borderRadius="6px"
					/>
					<Skeleton
						height={{ base: "200px", md: "400px"}}
						width={{ base: "100%", lg: "calc(33% - 17.5px)" }}
						borderRadius="6px"
					/>
					<Skeleton
						height={{ base: "200px", md: "400px"}}
						width={{ base: "100%", lg: "calc(33% - 17.5px)" }}
						borderRadius="6px"
					/>
				</Flex>
			)}
			{articlesData && (
				<>
					<Flex
						maxWidth="1216px"
						margin="0 auto"
						width="90%"
						columnGap="32px"
						rowGap="32px"
						flexWrap="wrap"
						pb={{ base: "44px", lg: "64px" }}
						justifyContent="flex-start"
					>
						{(articlesData.articles.data).map((item: BlogPostsMainData, index: number) =>
							<VerticalCardImg notMainPage key={index} item={item} />
						)}
					</Flex>
				</>
			)}
			{isPagination && (
				<Flex
					padding="12px"
					bgColor="#fff"
					columnGap={{ base: "16px", md: "32px" }}
					border="1px solid #E2E8F0"
					borderRadius="6px"
					alignItems="center"
					width="fit-content"
					margin="0 auto"
					mb="80px"
				>
					<Button
						className={isPrevDisabled? 'disabled' : ''}
						onClick={() => [setPage(page! - 1), handelClick]}
						width={{ base: "90px", md: "150px"}}
						display="flex"
						alignItems="center"
						bgColor="blue.500"
						lineHeight="1"
						fontWeight="600"
						fontSize={{ base: "13px", md: "16px" }}
						color="#fff"
						border="1px solid transparent"
						disabled={true}
						_hover={{ color: "gray.800", bgColor: "#fff", borderColor: "#E2E8F0" }}
						_disabled={{  bgColor: "#fff", borderColor: "#E2E8F0" }}
					>
						<ChevronLeftIcon />Previous
					</Button>
					<Text
						fontSize={{ base: "13px", md: "16px" }}
						color="gray.500"
						fontWeight="400"
					>
						Page {page} of {pageCount}
					</Text>
					<Button
						className={isNextDisabled ? 'disabled' : ''}
						onClick={() => [setPage(page! + 1), handelClick]}
						width={{ base: "90px", md: "150px"}}
						display="flex"
						alignItems="center"
						bgColor="blue.500"
						lineHeight="1"
						fontWeight="600"
						fontSize={{ base: "13px", md: "16px" }}
						border="1px solid transparent"
						color="#fff"
						_hover={{ color: "gray.800", bgColor: "#fff", borderColor: "#E2E8F0" }}
						_disabled={{ color: "gray.800", bgColor: "#fff", borderColor: "#E2E8F0" }}
					>
						Next <ChevronRightIcon />
					</Button>
				</Flex>
			)}
		</>
  )
}
