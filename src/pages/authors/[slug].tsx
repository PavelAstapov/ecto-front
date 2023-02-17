import { Box, Flex, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import VerticalCardImg from "@/components/VerticalCardImg";
import { BlogPostsMainData } from "@/Types/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Image from 'next/image'
import Link from "next/link";
import { GetServerSideProps } from "next";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { AUTHOR_DATA, LATESTS_POSTS_BY_AUTHOR } from "@/graphql/queries";
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
					pathname: `/authors/[slug]`,
					query: {
						pageUrl,
						page
					}
				},
					`/authors/${pageUrl}?page=${page}`,
					{shallow: true}
				);
			}

			if(page === 1) {
				router.push({
					pathname: `/authors/[slug]`,
					query: {
						pageUrl
					}
				},
					`/authors/${pageUrl}`,
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
			setPrevHref(`/authors/${props.author.data[0].attributes.url}`)
		} else if (page === 1){
			setPrevHref('')
		} else {
			setPrevHref(`?page=${page! - 1}`)
		}
	}, [page])

	useEffect(() => {
		setPageUrl(props.author.data[0].attributes.url);
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
				title={props.author.data[0].attributes.seo.metaTitle}
				description={props.author.data[0].attributes.seo.metaDescription}
				canonical={props.author.data[0].attributes.seo.canonicalURL}
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
					Published by {props.author.data[0].attributes.name}
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
			</Box>
			<Box
				maxWidth="1216px"
				margin="0 auto"
				width="90%"
				mb="32px"
				pt={{ base: "60px", lg: "80px" }}
				bgColor="#fff"
				boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
				borderRadius="8px"
				padding={{ base: "20px 20px", md: "80px 56px" }}
			>
				<Flex
				alignItems="flex-start"
				justifyContent="space-between"
				columnGap="64px"
				rowGap="32px"
				flexDirection={{ base:"column", lg: "row" }}
			>
				<Box
					position="relative"
					overflow="hidden"
					borderRadius="100%"
					width="128px"
					minWidth="128px"
					height="128px"
				>
					<Image
						fill
						placeholder="blur"
						blurDataURL={props.author.data[0].attributes.img.data.attributes.url}
						style={{ objectFit:"cover" }}
						sizes="(max-width: 767px) 128px, 128px"
						src={props.author.data[0].attributes.img.data.attributes.url}
						alt={props.author.data[0].attributes.name}/>
				</Box>
				<Box
					maxWidth={{ base: "100%", lg: "384px" }}
				>
					<Text
						mb="8px"
						fontWeight="700"
						fontSize="20px"
						lineHeight="28px"
					>
						{props.author.data[0].attributes.name}
					</Text>
					<Text
						mb="24px"
						fontWeight="400"
						fontSize="16px"
						lineHeight="24px"
					>
						{props.author.data[0].attributes.jobTitle}
					</Text>
					<Text
						fontWeight="400"
						fontSize="16px"
						lineHeight="24px"
					>
						{props.author.data[0].attributes.description}
					</Text>
				</Box>
				<Box minWidth="128px">
					<Text
						mb="24px"
						fontWeight="600"
						fontSize="16px"
						lineHeight="24px"
					>
						Expertise
					</Text>
					{(props.author.data[0].attributes.Expertise).map((item: { text: string}, index: number) =>
						<Text
							key={index}
							fontWeight="400"
							fontSize="16px"
							lineHeight="28px"
							color="gray.600"
						>
							{item.text}
						</Text>
					)}
				</Box>
				<Box minWidth="128px">
					<Text
						mb="24px"
						fontWeight="600"
						fontSize="16px"
						lineHeight="24px"
					>
						Social Media
					</Text>
					{props.author.data[0].attributes.instagram && (
						<ChakraLink
							as={Link}
							display="block"
							fontWeight="400"
							fontSize="16px"
							lineHeight="28px"
							color="gray.600"
							target="_blank"
							href={props.author.data[0].attributes.instagram}
						>
							<svg style={{ marginRight: "4px", display: "inline-block", position: "relative", top: "5px" }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10 6.40625C8 6.40625 6.40625 8.03125 6.40625 10C6.40625 12 8 13.5938 10 13.5938C11.9688 13.5938 13.5938 12 13.5938 10C13.5938 8.03125 11.9688 6.40625 10 6.40625ZM10 12.3438C8.71875 12.3438 7.65625 11.3125 7.65625 10C7.65625 8.71875 8.6875 7.6875 10 7.6875C11.2812 7.6875 12.3125 8.71875 12.3125 10C12.3125 11.3125 11.2812 12.3438 10 12.3438ZM14.5625 6.28125C14.5625 6.75 14.1875 7.125 13.7188 7.125C13.25 7.125 12.875 6.75 12.875 6.28125C12.875 5.8125 13.25 5.4375 13.7188 5.4375C14.1875 5.4375 14.5625 5.8125 14.5625 6.28125ZM16.9375 7.125C16.875 6 16.625 5 15.8125 4.1875C15 3.375 14 3.125 12.875 3.0625C11.7188 3 8.25 3 7.09375 3.0625C5.96875 3.125 5 3.375 4.15625 4.1875C3.34375 5 3.09375 6 3.03125 7.125C2.96875 8.28125 2.96875 11.75 3.03125 12.9062C3.09375 14.0312 3.34375 15 4.15625 15.8438C5 16.6562 5.96875 16.9062 7.09375 16.9688C8.25 17.0312 11.7188 17.0312 12.875 16.9688C14 16.9062 15 16.6562 15.8125 15.8438C16.625 15 16.875 14.0312 16.9375 12.9062C17 11.75 17 8.28125 16.9375 7.125ZM15.4375 14.125C15.2188 14.75 14.7188 15.2188 14.125 15.4688C13.1875 15.8438 11 15.75 10 15.75C8.96875 15.75 6.78125 15.8438 5.875 15.4688C5.25 15.2188 4.78125 14.75 4.53125 14.125C4.15625 13.2188 4.25 11.0312 4.25 10C4.25 9 4.15625 6.8125 4.53125 5.875C4.78125 5.28125 5.25 4.8125 5.875 4.5625C6.78125 4.1875 8.96875 4.28125 10 4.28125C11 4.28125 13.1875 4.1875 14.125 4.5625C14.7188 4.78125 15.1875 5.28125 15.4375 5.875C15.8125 6.8125 15.7188 9 15.7188 10C15.7188 11.0312 15.8125 13.2188 15.4375 14.125Z" fill="#C13584"/>
							</svg>
							Instagram
						</ChakraLink>
					)}
					{props.author.data[0].attributes.twitter && (
						<ChakraLink
							display="block"
							as={Link}
							fontWeight="400"
							fontSize="16px"
							lineHeight="28px"
							color="gray.600"
							target="_blank"
							href={props.author.data[0].attributes.twitter}
						>
							<svg style={{ marginRight: "4px", display: "inline-block", position: "relative", top: "5px" }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M16.3438 6.75C16.3438 6.90625 16.3438 7.03125 16.3438 7.1875C16.3438 11.5312 13.0625 16.5 7.03125 16.5C5.15625 16.5 3.4375 15.9688 2 15.0312C2.25 15.0625 2.5 15.0938 2.78125 15.0938C4.3125 15.0938 5.71875 14.5625 6.84375 13.6875C5.40625 13.6562 4.1875 12.7188 3.78125 11.4062C4 11.4375 4.1875 11.4688 4.40625 11.4688C4.6875 11.4688 5 11.4062 5.25 11.3438C3.75 11.0312 2.625 9.71875 2.625 8.125V8.09375C3.0625 8.34375 3.59375 8.46875 4.125 8.5C3.21875 7.90625 2.65625 6.90625 2.65625 5.78125C2.65625 5.15625 2.8125 4.59375 3.09375 4.125C4.71875 6.09375 7.15625 7.40625 9.875 7.5625C9.8125 7.3125 9.78125 7.0625 9.78125 6.8125C9.78125 5 11.25 3.53125 13.0625 3.53125C14 3.53125 14.8438 3.90625 15.4688 4.5625C16.1875 4.40625 16.9062 4.125 17.5312 3.75C17.2812 4.53125 16.7812 5.15625 16.0938 5.5625C16.75 5.5 17.4062 5.3125 17.9688 5.0625C17.5312 5.71875 16.9688 6.28125 16.3438 6.75Z" fill="#1DA1F2"/>
							</svg>

							Twitter
						</ChakraLink>
					)}
					{props.author.data[0].attributes.website && (
						<ChakraLink
							display="block"
							as={Link}
							fontWeight="400"
							fontSize="16px"
							lineHeight="28px"
							color="gray.600"
							target="_blank"
							href={props.author.data[0].attributes.website}
						>
							<svg style={{ marginRight: "4px", display: "inline-block", position: "relative", top: "5px" }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M13 10C13 10.7188 12.9375 11.375 12.875 12H7.09375C7.03125 11.375 6.96875 10.7188 6.96875 10C6.96875 9.3125 7.03125 8.65625 7.09375 8H12.875C12.9375 8.65625 13 9.3125 13 10ZM17.7188 8C17.9062 8.65625 18 9.3125 18 10C18 10.7188 17.9062 11.375 17.7188 12H13.875C13.9375 11.375 14 10.6875 14 10C14 9.3125 13.9375 8.65625 13.875 8H17.7188ZM17.4062 7H13.75C13.4375 5.03125 12.8125 3.34375 12.0312 2.28125C14.4688 2.9375 16.4688 4.6875 17.4062 7ZM12.75 7H7.21875C7.40625 5.875 7.71875 4.875 8.0625 4.0625C8.40625 3.3125 8.75 2.78125 9.125 2.4375C9.46875 2.125 9.75 2 10 2C10.2188 2 10.5 2.125 10.8438 2.4375C11.2188 2.78125 11.5625 3.3125 11.9062 4.0625C12.25 4.875 12.5625 5.875 12.75 7ZM2.5625 7C3.5 4.6875 5.5 2.9375 7.9375 2.28125C7.15625 3.34375 6.53125 5.03125 6.21875 7H2.5625ZM6.09375 8C6.03125 8.65625 5.96875 9.3125 5.96875 10C5.96875 10.6875 6.03125 11.375 6.09375 12H2.25C2.0625 11.375 2 10.7188 2 10C2 9.3125 2.0625 8.65625 2.25 8H6.09375ZM8.0625 15.9688C7.71875 15.1562 7.40625 14.1562 7.21875 13H12.75C12.5625 14.1562 12.25 15.1562 11.9062 15.9688C11.5625 16.7188 11.2188 17.25 10.8438 17.5938C10.5 17.9062 10.2188 18 9.96875 18C9.75 18 9.46875 17.9062 9.125 17.5938C8.75 17.25 8.40625 16.7188 8.0625 15.9688ZM7.9375 17.75C5.5 17.0938 3.5 15.3438 2.5625 13H6.21875C6.53125 15 7.15625 16.6875 7.9375 17.75ZM12.0312 17.75C12.8125 16.6875 13.4375 15 13.75 13H17.4062C16.4688 15.3438 14.4688 17.0938 12.0312 17.75Z" fill="#2F4F4F"/>
							</svg>
							Website
						</ChakraLink>
					)}
				</Box>
			</Flex>
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
					<ChakraLink
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
					</ChakraLink>
					<Text
						fontSize={{ base: "13px", md: "16px" }}
						color="gray.500"
						fontWeight="400"
					>
						Page {page} of {pageCount}
					</Text>
					<ChakraLink
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
					</ChakraLink>
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
		query: AUTHOR_DATA,
		variables: { slugUrl: context.params?.slug },
	})

	const latesPosts = await client.query({
		query: LATESTS_POSTS_BY_AUTHOR,
		variables: { author: data.author.data[0].attributes.url,  page: (context.query?.page && +(context.query?.page)) || 1 },
	})

	return {
		props: {...data, latesPosts: {...latesPosts} }
  }
}

