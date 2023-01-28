import {
	GET_BEAUTY_POSTS,
	GET_FASHION_POSTS,
	GET_FOOTER_MENU,
	GET_FOUR_LATESTS_POSTS,
	GET_LIFESTYLE_POSTS,
	GET_MAIN_BANNER,
	GET_PICK_POSTS,
	GET_TRENDING_POSTS,
	GET_WELLNESS_POSTS
} from '@/graphql/queries';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import axios from 'axios';

export const getHeaderMenu = async function getServerSideProps() {
  const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/menus/1?populate=*`,);

  return data.data.data.attributes.items.data
}

export const getMainBanner = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_MAIN_BANNER,
	})

	return {
    banners: data.homepage.data.attributes.articles.data
  }
}

// export const getBlogSLugs = async function getStaticPaths() {
//   const client = new ApolloClient({
//     uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
// 		cache: new InMemoryCache(),
// 	})

// 	const { data } = await client.query({
// 		query: GET_BLOG_SLUGS,
// 	})

// 	const paths = data?.articles.data.map((post: any) =>{
// 		return { params: { slug: post.attributes.url }}
// 	})

// 	return {
//     paths,
// 		fallback: false
//   }
// }

// export const blogQuery = async function getStaticProps({ params }: any) {
//   const client = new ApolloClient({
//     uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
// 		cache: new InMemoryCache(),
// 	})

// 	const { data } = await client.query({
// 		query: ARTICLE_DATA,
// 		variables: { slugUrl: params.slug },
// 	})

// 	const attr = data.articles.data[0].attributes

// 	return {
//     props: {
// 			articles: {
// 				url: attr.url
// 			}
// 		}
//   }
// }

export const getFooterMenu = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_FOOTER_MENU,
	})

	return {
    menu: data.renderNavigation[0].items
  }
}

export const getFourLatestsPosts = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_FOUR_LATESTS_POSTS
	})

	return {
    articles: data.articles.data
  }
}

export const getPickPosts = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_PICK_POSTS
	})

	return {
    articles: data.articles.data
  }
}

export const getLatestBeautyPosts = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_BEAUTY_POSTS
	})

	return {
    articles: data.articles.data
  }
}

export const getLatestWellnessPosts = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_WELLNESS_POSTS
	})

	return {
    articles: data.articles.data
  }
}

export const getLatestFashionPosts = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_FASHION_POSTS
	})

	return {
    articles: data.articles.data
  }
}

export const getLatestLifestylePosts = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_LIFESTYLE_POSTS
	})

	return {
    articles: data.articles.data
  }
}

export const getTrendingPosts = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_TRENDING_POSTS
	})

	return {
    articles: data.articles.data
  }
}
