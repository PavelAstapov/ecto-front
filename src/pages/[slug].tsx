// import { blogQuery, getBlogSLugs } from "@/components/api/api.service";
import { ARTICLE_DATA, GET_BLOG_SLUGS } from "@/graphql/queries";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Image from 'next/image'
import { formatDate } from "@/components/helpers/format-date";
import Blocks from 'editorjs-blocks-react-renderer';

export default function PostPage({ articles }:any) {
	const date = formatDate(articles.updatedAt);

  return(
		<>
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
				{articles.title}
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
					By Jane Smith
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
					Published In {articles.category}</Text>
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
				 {articles.readingTime} min read
				</Text>
			</Flex>
			<Flex
				columnGap="64px"
				flexDir={{ base: "column", lg: "row" }}
			>
				<Box
					bgColor="#fff"
					as="article"
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
						<Image src={articles.mainImage.data.attributes.url} fill alt={articles.title} />
					</Box>
					<Box
						padding="0 32px 32px 32px"
					>
						<Blocks data={JSON.parse(articles.content)} />
					</Box>
				</Box>
				<Box
					minWidth="360px"
					as="aside"
				></Box>
			</Flex>
		</Box>
		</>
  )
}

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_BLOG_SLUGS,
	})

	const paths = data?.articles.data.map((post: any) =>{
		return { params: { slug: post.attributes.url }}
	})

	return {
    paths,
		fallback: false
  }
}

export async function getStaticProps({ params }: any) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: ARTICLE_DATA,
		variables: { slugUrl: params.slug },
	})

	const attr = data.articles.data[0].attributes;

	return {
    props: {
			articles: {
				url: attr.url,
        title: attr.title,
        category: attr.category,
        content: attr.content,
        readingTime: attr.readingTime,
				mainImage: {
          data: {
            attributes: {
              url: attr.mainImage.data.attributes.url,
            }
          }
        }
			}
		}
  }
}