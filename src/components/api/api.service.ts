import {
	ARTICLE_DATA,
	AUTHOR_DATA,
	BEAUTY_PAGE,
	FASHION_PAGE,
	FOOD_PAGE,
	GET_BEAUTY_POSTS,
	GET_CONTACT_US,
	GET_COOKIES,
	GET_FASHION_POSTS,
	GET_FOOTER_MENU,
	GET_FOUR_LATESTS_POSTS,
	GET_HEADER_MENU,
	GET_LATEST_CATEGORY_POSTS,
	GET_LIFESTYLE_POSTS,
	GET_MAIN_BANNER,
	GET_NEXT_POST,
	GET_PICK_POSTS,
	GET_PRIVACY_NOTICE,
	GET_TRENDING_POSTS,
	GET_WELLNESS_POSTS,
	LATESTS_POSTS_BY_AUTHOR,
	LATESTS_POSTS_BY_CATEGORY,
	LATESTS_POSTS_BY_TAG,
	LIFESTYLE_PAGE,
	TAG_DATA
} from '@/graphql/queries';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import axios from 'axios';

export const getHeaderMenu = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_HEADER_MENU,
	})

	return {
    menu: data.renderNavigation[0].items
  }
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

export const getArticleData = async function getServerSideProps(params: string) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: ARTICLE_DATA,
		variables: { slugUrl: params },
	})

	if (!Array.from(data.articles.data).length) {
    return {
      notFound: true,
    };
  }

	return {
		article: data.articles.data[0],
  }
}

export const getPrevArticleData = async function getServerSideProps(params: string) {
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

export const getLatestCategoryData = async function getServerSideProps(params: any) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const cleanCategoryString = (params.attributes.category).replace('_and_', ' & ');

	const { data } = await client.query({
		query: GET_LATEST_CATEGORY_POSTS,
		variables: { category: cleanCategoryString,  id: params.id },
	})

	return {
		articles: data.articles.data
	}
}

export const getTagData = async function getServerSideProps(params: string) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: TAG_DATA,
		variables: { slugUrl: params },
	})

	return {
		tag: data.tags.data[0],
  }
}

export const getLatestPostsByTag = async function getServerSideProps(tag: string, page: number) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: LATESTS_POSTS_BY_TAG,
		variables: { tag: tag,  page: page },
	})

	return {
		articles: data.articles
	}
}

export const getBeautyPage = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: BEAUTY_PAGE,
	})

	return {
		category: data.beauty.data,
  }
}

export const getLifeStylePage = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: LIFESTYLE_PAGE,
	})

	return {
		category: data.lifestyle.data,
  }
}

export const getFashionPage = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: FASHION_PAGE,
	})

	return {
		category: data.fashionAndStyle.data,
  }
}

export const getFoodPage = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: FOOD_PAGE,
	})

	return {
		category: data.foodAndWellness.data,
  }
}

export const getLatestPostsByCategory = async function getServerSideProps(category: string, page: number) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: LATESTS_POSTS_BY_CATEGORY,
		variables: { category: category,  page: page },
	})

	return {
		articles: data.articles,
	}
}

export const getAuthorData = async function getServerSideProps(params: string) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: AUTHOR_DATA,
		variables: { slugUrl: params },
	})

	return {
		author: data.authors.data[0],
  }
}

export const getLatestPostsByAuthor = async function getServerSideProps(author: string, page: number) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: LATESTS_POSTS_BY_AUTHOR,
		variables: { author: author,  page: page },
	})

	return {
		articles: data.articles,
	}
}

export const getPrivacyNotice = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_PRIVACY_NOTICE,
	})

	return {
		data: data.privacyNotice.data.attributes,
	}
}

export const getCookies = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_COOKIES,
	})

	return {
		cookies: data.cookies.data,
	}
}

export const getContactUs = async function getServerSideProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_CONTACT_US,
	})

	return {
		data: data.contactUs.data.attributes,
	}
}

export const getComments = async function getServerSideProps(url: string) {
  const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/api::article.article:${url}?filters[approvalStatus][$eq]=APPROVED`);

	return data;
}