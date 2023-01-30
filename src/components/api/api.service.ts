import {
	ARTICLE_DATA,
	GET_BEAUTY_POSTS,
	GET_FASHION_POSTS,
	GET_FOOTER_MENU,
	GET_FOUR_LATESTS_POSTS,
	GET_LIFESTYLE_POSTS,
	GET_MAIN_BANNER,
	GET_NEXT_POST,
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

export const getArticleData = async function getServerSideProps( params: string ) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: ARTICLE_DATA,
		variables: { slugUrl: params },
	})

	const attr = data.articles.data[0].attributes;

	return {
		article: data.articles.data[0],
  }
}

export const getPrevArticleData = async function getServerSideProps( params: string) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_NEXT_POST,
		variables: { id: params },
	})

	return {
		article: data.articles.data[0]
	}
}
