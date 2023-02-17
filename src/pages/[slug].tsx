import { Box, Flex, Heading, Text, Link as ChakraLink, Divider, OrderedList, ListItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import { formatDate } from "@/components/helpers/format-date";
import Blocks from 'editorjs-blocks-react-renderer';
import SubscribeBlock from "@/components/SubscribeBlock";
import Link from "next/link";
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
import { GetServerSideProps } from "next/types";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ARTICLE_DATA, GET_LATEST_CATEGORY_POSTS, GET_NEXT_POST } from "@/graphql/queries";
import HeaderMenu from "@/components/HeaderMenu";
import Footer from "@/components/Footer";

export default function PostPage( props: any ) {
	const [date, setDate] = useState<String>();

	const scrollToHeaders = () => {
		const ArticleWrapper = document.querySelector('article');
		const SecodLevelTitles = ArticleWrapper?.querySelectorAll('h2');

		SecodLevelTitles?.forEach((item) => {
			item.setAttribute('id', (item.innerText).replace(/\s/g, ''));
		});
	}

	useEffect(() => {
		scrollToHeaders()
		setDate(formatDate(props.articles.data[0].attributes.updatedAt));
	}, [props]);

  return(
		<>
			<HeaderMenu cookies={props.cookies.data} menu={props.header[0].items} />
			<NextSeo
				title={props.articles.data[0].attributes.seo.metaTitle}
				description={props.articles.data[0].attributes.seo.metaDescription}
				canonical={props.articles.data[0].attributes.seo.canonicalURL && props.articles.data[0].attributes.seo.canonicalURL}
				openGraph={{
					title: props.articles.data[0].attributes.seo.metaTitle,
					description: props.articles.data[0].attributes.seo.metaDescription,
					url: `${process.env.NEXT_PUBLIC_SITE_URL}/${props.articles.data[0].attributes.url}`,
					type: 'article',
					article: {
						publishedTime: props.articles.data[0].attributes.updatedAt,
						authors: [
							`${process.env.NEXT_PUBLIC_SITE_URL}/authors/${props.articles.data[0].attributes.author.data.attributes.url}`,
						],
					},
					images: [
						{
							url: props.articles.data[0].attributes.mainImage.data.attributes.url,
							alt: props.articles.data[0].attributes.seo.metaTitle,
						},
					],
				}}
			/>
			<Box
				maxWidth="1216px"
				margin="0 auto"
				width="90%"
				mb="32px"
				as="header"
				pt={{ base: "60px", lg: "80px" }}
				pb={{ base: "60px", lg: "80px" }}
			>
				<Heading
					mb="20px"
					as="h1"
					fontWeight="800"
				>
					{props.articles.data[0].attributes.title}
				</Heading>
				<Flex
					columnGap="8px"
					rowGap="8px"
					flexWrap="wrap"
					mb={{ base: "60px", lg: "80px" }}
				>
						<Text
							color="gray.500"
							fontSize="16px"
							lineHeight="24px"
						>
							By&nbsp;
							<ChakraLink
								as={Link}
								fontWeight="600"
								_hover={{ textDecor: "none", color: "blue.500" }}
								href={`authors/${props.articles.data[0].attributes.author.data.attributes.url}`}
							>
								{props.articles.data[0].attributes.author.data.attributes.name}
							</ChakraLink>
						</Text>
					<Text
						color="gray.500"
						fontSize="16px"
						lineHeight="24px"
					>
						•
					</Text>
					<Text
						color="gray.500"
						fontSize="16px"
						lineHeight="24px"
					>
						Published In <Tag item={props.articles.data[0].attributes.category} /></Text>
					<Text
						color="gray.500"
						fontSize="16px"
						lineHeight="24px"
					>
						•
					</Text>
					<Text
						color="gray.500"
						fontSize="16px"
						lineHeight="24px"
					>
						{date}
					</Text>
					<Text
						fontSize="16px"
						lineHeight="24px"
						color="red.500"
					>
						•
					</Text>
					<Text
						fontSize="16px"
						lineHeight="24px"
						fontWeight="600"
						color="red.500"
					>
						{props.articles.data[0].attributes.readingTime} min read
					</Text>
				</Flex>
				<Flex
					columnGap="64px"
					alignItems="flex-start"
					flexDir={{ base: "column", lg: "row" }}
				>
					<Box
						bgColor="#fff"
						as="article"
						maxWidth="100%"
						overflow="hidden"
						boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);"
						borderRadius="8px"
					>
						<Box
							width="100%"
							position="relative"
							mb="32px"
							height={{ base: "300px", lg: "400px" }}
						>
							<Image
								src={props.articles.data[0].attributes.mainImage.data.attributes.url}
								fill
								style={{
									objectFit: "cover"
								}}
								placeholder="blur"
								blurDataURL={props.articles.data[0].attributes.mainImage.data.attributes.url}
								alt={props.articles.data[0].attributes.title}
								priority={true}
								sizes="(max-width: 768px) 90vw, 792px"
							/>
						</Box>
						<Box
							className="article"
							padding="0 32px 0 32px"
						>
							<Blocks
								data={JSON.parse(props.articles.data[0].attributes.content)}
								renderers={{
									checklist: Checklist,
									header: Header,
									paragraph: Paragraph,
									delimiter: Delimiter,
									image: ImageBlock,
									list: ListBLock,
									quote: Quote,
									code: CodeBlock,
									table: TableBlock,
								}}/>
						</Box>
						<Divider
							mt="32px"
							width="calc(100% - 64px)"
							display="block"
							bgColor="#CBD5E0"
							margin="0 auto"
						/>
						<Flex
							mt="40px"
							mb="40px"
							padding="0 32px 0 32px"
							justifyContent="space-between"
							columnGap="32px"
							rowGap="20px"
							flexDirection={{ base: "column", md: "row" }}
						>
							<Flex
								columnGap="4px"
								alignItems="center"
								flexWrap="wrap"
								rowGap="20px"
							>
								<Text
									marginRight="8px"
									fontSize="14px"
									fontWeight="600"
									color="gray.500"
								>
									Tags
								</Text>
								{props.articles.data[0].attributes.tags.data && (props.articles.data[0].attributes.tags.data).map((item: any, i: number) =>
									<ChakraLink
										key={i}
										as={Link}
										padding="8px 12px"
										borderRadius="8px"
										bgColor="gray.100"
										_hover={{ bgColor: "blue.100" }}
										color="gray.500"
										fontWeight="500"
										fontSize="12px"
										href={`tags/${item.attributes.url}`}
									>
										#{item.attributes.tag}
									</ChakraLink>
								)}
							</Flex>
							<ShareButtons url={props.articles.data[0].attributes.url} />
						</Flex>
						<Comments slug={props.articles.data[0].id} />
						<Box
							padding="5px"
						>
							<Flex
								bgColor="gray.200"
								columnGap="32px"
								rowGap="32px"
								borderBottomLeftRadius="8px"
								borderBottomRightRadius="8px"
								padding="27px 27px 43px 27px"
								justifyContent="space-between"
							>
								<Box
									flex="1 2 100%"
								>
									<Text
										color="gray.500"
										fontSize={{ base: "13", md: "16" }}
										lineHeight="24px"
										fontWeight="400px"
									>
										Previous Article
									</Text>
									<ChakraLink
										as={Link}
										_hover={{ textDecor: "none" }}
										color="gray.600"
										fontWeight="600"
										fontSize={{ base: "13", md: "16" }}
										marginTop="12px"
										display="block"
										href={props.prevAticle.data.articles.data[0].attributes.url}
									>
										{props.prevAticle.data.articles.data[0].attributes.title}
									</ChakraLink>
								</Box>
								<Box
									textAlign="right"
									flex="1 2 100%"
								>
									<Text
										color="gray.500"
										fontSize={{ base: "13", md: "16" }}
										lineHeight="24px"
										fontWeight="400px"
									>
										Next Article
									</Text>
									<ChakraLink
										as={Link}
										_hover={{ textDecor: "none" }}
										color="gray.600"
										fontWeight="600"
										fontSize={{ base: "13", md: "16" }}
										marginTop="12px"
										display="block"
										href={props.nextAticle.data.articles.data[0]?.attributes.url || props.saveNextArticle.data.articles.data[0].attributes.url}
									>
										{props.nextAticle.data.articles.data[0]?.attributes.title || props.saveNextArticle.data.articles.data[0].attributes.title}
									</ChakraLink>
								</Box>
							</Flex>
						</Box>
					</Box>
					<Box
						minWidth={{ base: "100%", md: "360px" }}
						as="aside"
						display="flex"
						flexDir="column"
						rowGap="64px"
						mt={{ base: "40px", lg: "0" }}
					>
						<Box
							width="100%"
							textAlign="center"
							boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
							borderRadius="8px"
							overflow="hidden"
						>
							<Box
								height="80px"
								bgColor="blue.600"
								width="100%"
							>
								<ChakraLink
									as={Link}
									href={`authors/${props.articles.data[0].attributes.author.data.attributes.url}`}
								>
									<Image
										width="96"
										height="96"
										style={{
											borderRadius: "100%",
											position: "relative",
											top: "32px",
											margin: "0 auto"
										}}
										alt={props.articles.data[0].attributes.author.data.attributes.name}
										src={props.articles.data[0].attributes.author.data.attributes.img.data.attributes.url}/>
								</ChakraLink>
							</Box>
							<Box
								padding="64px 20px 20px 32px"
								bgColor="#fff"
							>
								<ChakraLink
									as={Link}
									fontWeight="700"
									color="gray.800"
									fontSize="16px"
									lineHeight="24px"
									_hover={{ textDecor: "none", color: "blue.500" }}
									href={`authors/${props.articles.data[0].attributes.author.data.attributes.url}`}
								>
									{props.articles.data[0].attributes.author.data.attributes.name}
								</ChakraLink>
								<Text
									fontSize="14px"
									color="gray.600"
									lineHeight="20px"
									fontWeight="400"
									mt="4px"
								>
										{props.articles.data[0].attributes.author.data.attributes.jobTitle}
								</Text>
								<Flex
									columnGap="12px"
									justifyContent="center"
									mt="16px"
								>
									{props.articles.data[0].attributes.author.data.attributes.instagram && (
										<ChakraLink
											as={Link}
											target="_blank"
											width="48px"
											height="48px"
											borderRadius="100%"
											display="flex"
											justifyContent="center"
											bgColor="gray.100"
											alignItems="center"
											_hover={{ bgColor: "blue.100" }}
											href={props.articles.data[0].attributes.author.data.attributes.instagram}
										>
											<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M10 0C12.717 0 13.056 0.00999994 14.122 0.0599999C15.187 0.11 15.912 0.277 16.55 0.525C17.21 0.779 17.766 1.123 18.322 1.678C18.8305 2.1779 19.224 2.78259 19.475 3.45C19.722 4.087 19.89 4.813 19.94 5.878C19.987 6.944 20 7.283 20 10C20 12.717 19.99 13.056 19.94 14.122C19.89 15.187 19.722 15.912 19.475 16.55C19.2247 17.2178 18.8311 17.8226 18.322 18.322C17.822 18.8303 17.2173 19.2238 16.55 19.475C15.913 19.722 15.187 19.89 14.122 19.94C13.056 19.987 12.717 20 10 20C7.283 20 6.944 19.99 5.878 19.94C4.813 19.89 4.088 19.722 3.45 19.475C2.78233 19.2245 2.17753 18.8309 1.678 18.322C1.16941 17.8222 0.775931 17.2175 0.525 16.55C0.277 15.913 0.11 15.187 0.0599999 14.122C0.0129999 13.056 0 12.717 0 10C0 7.283 0.00999994 6.944 0.0599999 5.878C0.11 4.812 0.277 4.088 0.525 3.45C0.775236 2.78218 1.1688 2.17732 1.678 1.678C2.17767 1.16923 2.78243 0.775729 3.45 0.525C4.088 0.277 4.812 0.11 5.878 0.0599999C6.944 0.0129999 7.283 0 10 0ZM10 5C8.67392 5 7.40215 5.52678 6.46447 6.46447C5.52678 7.40215 5 8.67392 5 10C5 11.3261 5.52678 12.5979 6.46447 13.5355C7.40215 14.4732 8.67392 15 10 15C11.3261 15 12.5979 14.4732 13.5355 13.5355C14.4732 12.5979 15 11.3261 15 10C15 8.67392 14.4732 7.40215 13.5355 6.46447C12.5979 5.52678 11.3261 5 10 5ZM16.5 4.75C16.5 4.41848 16.3683 4.10054 16.1339 3.86612C15.8995 3.6317 15.5815 3.5 15.25 3.5C14.9185 3.5 14.6005 3.6317 14.3661 3.86612C14.1317 4.10054 14 4.41848 14 4.75C14 5.08152 14.1317 5.39946 14.3661 5.63388C14.6005 5.8683 14.9185 6 15.25 6C15.5815 6 15.8995 5.8683 16.1339 5.63388C16.3683 5.39946 16.5 5.08152 16.5 4.75ZM10 7C10.7956 7 11.5587 7.31607 12.1213 7.87868C12.6839 8.44129 13 9.20435 13 10C13 10.7956 12.6839 11.5587 12.1213 12.1213C11.5587 12.6839 10.7956 13 10 13C9.20435 13 8.44129 12.6839 7.87868 12.1213C7.31607 11.5587 7 10.7956 7 10C7 9.20435 7.31607 8.44129 7.87868 7.87868C8.44129 7.31607 9.20435 7 10 7Z" fill="#2D3748"/>
											</svg>
										</ChakraLink>
									)}
									{props.articles.data[0].attributes.author.data.attributes.twitter && (
										<ChakraLink
											target="_blank"
											width="48px"
											height="48px"
											borderRadius="100%"
											display="flex"
											bgColor="gray.100"
											justifyContent="center"
											alignItems="center"
											_hover={{ bgColor: "blue.100" }}
											as={Link}
											href={props.articles.data[0].attributes.author.data.attributes.twitter}
										>
											<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M21.1621 2.65593C20.3986 2.99362 19.589 3.2154 18.7601 3.31393C19.6338 2.79136 20.2878 1.96894 20.6001 0.999927C19.7801 1.48793 18.8811 1.82993 17.9441 2.01493C17.3147 1.34151 16.4804 0.89489 15.571 0.744511C14.6616 0.594133 13.728 0.748418 12.9153 1.18338C12.1026 1.61834 11.4564 2.30961 11.0772 3.14972C10.6979 3.98983 10.6068 4.93171 10.8181 5.82893C9.15516 5.74558 7.52838 5.31345 6.04334 4.56059C4.55829 3.80773 3.24818 2.75097 2.19805 1.45893C1.82634 2.09738 1.63101 2.82315 1.63205 3.56193C1.63205 5.01193 2.37005 6.29293 3.49205 7.04293C2.82806 7.02202 2.17869 6.84271 1.59805 6.51993V6.57193C1.59825 7.53763 1.93242 8.47354 2.5439 9.22099C3.15538 9.96843 4.00653 10.4814 4.95305 10.6729C4.33667 10.84 3.69036 10.8646 3.06305 10.7449C3.32992 11.5762 3.85006 12.3031 4.55064 12.824C5.25123 13.3449 6.09718 13.6337 6.97005 13.6499C6.10253 14.3313 5.10923 14.8349 4.04693 15.1321C2.98464 15.4293 1.87418 15.5142 0.779053 15.3819C2.69075 16.6114 4.91615 17.264 7.18905 17.2619C14.8821 17.2619 19.0891 10.8889 19.0891 5.36193C19.0891 5.18193 19.0841 4.99993 19.0761 4.82193C19.8949 4.23009 20.6017 3.49695 21.1631 2.65693L21.1621 2.65593Z" fill="#2D3748"/>
											</svg>
										</ChakraLink>
									)}
									{props.articles.data[0].attributes.author.data.attributes.website && (
										<ChakraLink
											target="_blank"
											width="48px"
											height="48px"
											borderRadius="100%"
											display="flex"
											bgColor="gray.100"
											justifyContent="center"
											alignItems="center"
											_hover={{ bgColor: "blue.100" }}
											as={Link}
											href={props.articles.data[0].attributes.author.data.attributes.website}
										>
											<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M10 0C4.475 0 1.45954e-06 4.475 1.45954e-06 10C-0.00113276 12.0993 0.658815 14.1456 1.88622 15.8487C3.11362 17.5517 4.84615 18.8251 6.838 19.488C7.338 19.575 7.525 19.275 7.525 19.012C7.525 18.775 7.512 17.988 7.512 17.15C5 17.613 4.35 16.538 4.15 15.975C4.037 15.687 3.55 14.8 3.125 14.562C2.775 14.375 2.275 13.912 3.112 13.9C3.9 13.887 4.462 14.625 4.65 14.925C5.55 16.437 6.988 16.012 7.562 15.75C7.65 15.1 7.912 14.663 8.2 14.413C5.975 14.163 3.65 13.3 3.65 9.475C3.65 8.387 4.037 7.488 4.675 6.787C4.575 6.537 4.225 5.512 4.775 4.137C4.775 4.137 5.612 3.875 7.525 5.163C8.33906 4.93706 9.18017 4.82334 10.025 4.825C10.875 4.825 11.725 4.937 12.525 5.162C14.437 3.862 15.275 4.138 15.275 4.138C15.825 5.513 15.475 6.538 15.375 6.788C16.012 7.488 16.4 8.375 16.4 9.475C16.4 13.313 14.063 14.163 11.838 14.413C12.2 14.725 12.513 15.325 12.513 16.263C12.513 17.6 12.5 18.675 12.5 19.013C12.5 19.275 12.688 19.587 13.188 19.487C15.173 18.8168 16.8979 17.541 18.1199 15.8392C19.3419 14.1373 19.9994 12.0951 20 10C20 4.475 15.525 0 10 0Z" fill="#2D3748"/>
											</svg>
										</ChakraLink>
									)}
								</Flex>
							</Box>
						</Box>
						<Box
							display={{ base: "none", md: "block" }}
						>
							<Text
								fontWeight="700"
								fontSize="18px"
								mb="12px"
							>
								Table Of Contents
							</Text>
							<Box
								width="100%"
								boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
								borderRadius="8px"
								bgColor="#fff"
								overflow="hidden"
								padding="28px"
							>
								<OrderedList
									display="flex"
									marginLeft="0"
									flexDir="column"
									rowGap="24px"
									style={{ counterReset: "item" }}
									listStyleType="none"
								>
								{JSON.parse(props.articles.data[0].attributes.content).blocks.filter((item: any) => {
									return item.type === 'header' && (item.data.level && item.data.level === 2)
									}).map((item: any, index: number) =>
									<ListItem key={index} style={{ counterIncrement: "item"}}>
										<ChakraLink
											offset="120"
											display="block"
											as={AnchorLink}
											fontWeight="500"
											fontSize="16px"
											lineHeight="24px"
											position="relative"
											pl="35px"
											color="gray.600"
											_hover={{ textDecor: "none", color: "blue.500" }}
											_before={{
												content: "counter(item)",
												display: "inline-flex",
												justifyContent: "center",
												alignItems: "center",
												width: "24px",
												height: "24px",
												bgColor: "blue.50",
												borderRadius: "100%",
												marginRight: "16px",
												position: "absolute",
												left: "0",
												top: "2px",
												color: "blue.500",
												fontWeight: "600"
												}}
												href={`#${(item.data.text).replace(/\s/g, '')}`}
											>
												{item.data.text}
										</ChakraLink>
									</ListItem>
								)}
								</OrderedList>
							</Box>
						</Box>
						<Box>
							<Text
								fontWeight="700"
								fontSize="18px"
								mb="12px"
							>
								Topics
							</Text>
							{categoryData.map((items, index) =>
								<CategoryListItem key={index} item={items} />
							)}
						</Box>
						<SubscribeBlogBlock />
						<Box>
							<Text
								fontWeight="700"
								fontSize="18px"
								mb="12px"
							>
								Related Posts
							</Text>
							<Flex
								width="100%"
								flexDirection="column"
								rowGap="12px"
							>
								{(props.articles.data[0].attributes.relatedArticles.data).map((item: any, i: number) =>
									<PostCardNoImg key={i} item={item} />
								)}
							</Flex>
						</Box>
					</Box>
				</Flex>
			</Box>
			<BlogLatestPosts item={props.categoryPosts.data.articles.data}/>
			<SubscribeBlock />
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
		query: ARTICLE_DATA,
		variables: { slugUrl: context.params?.slug },
	})

	if (!(data.articles.data).length) {
    return {
      notFound: true,
    };
  }

	const cleanCategoryString = (data.articles.data[0].attributes.category).replace('_and_', ' & ');

	const categoryPosts = await client.query({
		query: GET_LATEST_CATEGORY_POSTS,
		variables: { category: cleanCategoryString, id: data.articles.data[0].id },
	})

	const prevId = +(data.articles.data[0].id) === 1 ? (+(data.articles.data[0].id) + 2) : (+(data.articles.data[0].id) - 1);

	const prevAticle = await client.query({
		query: GET_NEXT_POST,
		variables: { id: prevId },
	})

	const nextAticle = await client.query({
		query: GET_NEXT_POST,
		variables: { id: (+(data.articles.data[0].id) + 1) },
	})

	const saveNextArticle = await client.query({
		query: GET_NEXT_POST,
		variables: { id: (+(data.articles.data[0].id) - 2) },
	})

	return {
		props: { ...data, categoryPosts: {...categoryPosts}, prevAticle: {...prevAticle}, nextAticle: {...nextAticle}, saveNextArticle: {...saveNextArticle} },
  }
}

export function Tag (item: any) {
	const tagData = GetTagInfo(item.item)

	const { categoryName, categoryLink } = tagData
	return (
		<ChakraLink
			as={Link}
			fontWeight="600"
			href={categoryLink}
			_hover={{ textDecoration: "none", color: "blue.500" }}
		>
			{categoryName}
		</ChakraLink>
	)
}