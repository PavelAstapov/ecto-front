import { Box, Flex, Heading, Text, Button, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import VerticalCardImg from "@/components/VerticalCardImg";
import { BlogPostsMainData } from "@/Types/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { LATESTS_POSTS_BY_TAG, TAG_DATA } from "@/graphql/queries";
import { GetServerSideProps } from "next";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import HeaderMenu from "@/components/HeaderMenu";
import Footer from "@/components/Footer";

export default function PostPage(props: any) {
	const [pageUrl, setPageUrl] = useState<any>();
	const [page, setPage] = useState<number>();
	const [counter, setCounter] = useState<number>();
	const [pageCount, setPageCount] = useState<number>();
	const [prevHref, setPrevHref] = useState<string>();
	const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>();
	const [isNextDisabled, setIsNextDisabled] = useState<boolean>();
	const [isPagination, setIsPagination] = useState<boolean>();
	const router = useRouter();

	useEffect(() => {
		setIsPrevDisabled(page === 1);

		props && setIsNextDisabled(page === props.latesPosts.data.articles.meta.pagination.pageCount);

		if(pageUrl !== undefined){
			if(page !== 1) {
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

			if(page === 1) {
				router.push({
					pathname: `/tags/[slug]`,
					query: {
						pageUrl
					}
				},
					`/tags/${pageUrl}`,
					{shallow: true}
				);
			}
		}
	}, [page]);

	const handelClick = useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});

		if(page === 2) {
			setPrevHref(`/tags/${props.tags.data[0].attributes.url}`)
		} else if (page === 1){
			setPrevHref('')
		} else {
			setPrevHref(`?page=${page! - 1}`)
		}
	}, [page])

	useEffect(() => {
		setPageUrl(props.tags.data[0].attributes.url);
		setCounter(props.latesPosts.data.articles.meta.pagination.total);
		setPageCount(props.latesPosts.data.articles.meta.pagination.pageCount);
		setIsPagination(props.latesPosts.data.articles.meta.pagination.pageCount > 1);
		if (router.isReady) {
			setPage(+(router.query.page as unknown as number) || 1);
		}
	}, [router.query.slug, router.query.page])

	useEffect(() => {
		router.replace(router.asPath);
	}, [router.asPath])

  return(
		<>
			<HeaderMenu cookies={props.cookies.data} menu={props.header[0].items} />
			<NextSeo
				title={props.tags.data[0].attributes.seo.metaTitle}
				description={props.tags.data[0].attributes.seo.metaDescription}
				canonical={props.tags.data[0].attributes.seo.canonicalURL}
			/>
			<Box
				maxWidth="1216px"
				margin="0 auto"
				width="90%"
				mb="32px"
				as="header"
				pt={{ base: "60px", lg: "80px" }}
			>
				<Heading
					mb="32px"
					as="h1"
					fontWeight="800"
					position="relative"
				>
					{props.tags.data[0].attributes.tag}
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
					{props.tags.data[0].attributes.description}
				</Text>
			</Box>
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
				{(props.latesPosts.data.articles.data).map((item: BlogPostsMainData, index: number) =>
					<VerticalCardImg notMainPage key={index} item={item} />
				)}
			</Flex>
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
					<Link
						href={prevHref}
						className={isPrevDisabled? 'disabled' : ''}
						onClick={(e) => [e.preventDefault(), setPage(page! - 1), handelClick]}
						width={{ base: "90px", md: "150px"}}
						display="flex"
						alignItems="center"
						bgColor="blue.500"
						height="40px"
						justifyContent="center"
						borderRadius="6px"
						lineHeight="1"
						fontWeight="600"
						fontSize={{ base: "13px", md: "16px" }}
						color="#fff"
						border="1px solid transparent"
						_hover={{ color: "gray.800", bgColor: "#fff", borderColor: "#E2E8F0" }}
						_disabled={{  bgColor: "#fff", borderColor: "#E2E8F0" }}
					>
						<ChevronLeftIcon />Previous
					</Link>
					<Text
						fontSize={{ base: "13px", md: "16px" }}
						color="gray.500"
						fontWeight="400"
					>
						Page {page} of {pageCount}
					</Text>
					<Link
						href={isNextDisabled ? "" : `?page=${page! + 1}`}
						className={isNextDisabled ? 'disabled' : ''}
						onClick={(e) => [e.preventDefault(), setPage(page! + 1), handelClick]}
						width={{ base: "90px", md: "150px"}}
						display="flex"
						justifyContent="center"
						borderRadius="6px"
						height="40px"
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
					</Link>
				</Flex>
			)}
			<Footer menu={props.footer[0].items} />
		</>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: TAG_DATA,
		variables: { slugUrl: context.params?.slug },
	})

	const latesPosts = await client.query({
		query: LATESTS_POSTS_BY_TAG,
		variables: { tag: data.tags.data[0].attributes.url,  page: (context.query?.page && +(context.query?.page)) || 1 },
	})

	return {
		props: {...data, latesPosts: {...latesPosts} }
  }
}

