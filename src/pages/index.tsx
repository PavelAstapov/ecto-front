import React from 'react';
import Footer from '@/components/Footer';
import HeaderMenu from '@/components/HeaderMenu';
import ResentPosts from '@/components/MainPage/ResentPosts';
import SubscribeBlock from '@/components/SubscribeBlock';
import { GET_HOMEPAGE_DATA } from '@/graphql/queries';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic'

export default function Home(props: any) {
  const PickPosts = dynamic(() => import('@/components/MainPage/PickPosts'), {
    loading: () => <p>Loading</p>,
  })
  const BeautyPosts = dynamic(() => import('@/components/MainPage/BeautyPosts'), {
    loading: () => <p>Loading</p>,
  })
  const FashionPosts = dynamic(() => import('@/components/MainPage/FashionPosts'), {
    loading: () => <p>Loading</p>,
  })
  const TrendingPosts = dynamic(() => import('@/components/MainPage/TrendingPosts'), {
    loading: () => <p>Loading</p>,
  })
  const WellnessPosts = dynamic(() => import('@/components/MainPage/WellnessPosts'), {
    loading: () => <p>Loading</p>,
  })
  const LifestylePosts = dynamic(() => import('@/components/MainPage/LifestylePosts'), {
    loading: () => <p>Loading</p>,
  })
  const MainBanner = dynamic(() => import('@/components/MainPage/MainBanner'), {
    loading: () => <p>Loading</p>,
  })
  return (
    <>
      <HeaderMenu cookies={props.cookies.data} menu={props.header[0].items} />
      <NextSeo
        title={props.homepage.data.attributes.seo.metaTitle}
        description={props.homepage.data.attributes.seo.metaDescription}
      />
      <MainBanner data={props.homepage.data.attributes.articles.data}/>
      <ResentPosts
        item={props.fourLatest.data}
        sponsorImg={props.homepage.data.attributes.sponsorImg.data.attributes.url}
        sponsorLink={props.homepage.data.attributes.sponsorLink}
      />
      <PickPosts item={props.top.data} />
      <BeautyPosts item={props.beauty.data} />
      <FashionPosts item={props.fashion.data} />
      <TrendingPosts item={props.trending.data} />
      <WellnessPosts item={props.wellness.data} />
      <LifestylePosts item={props.lifestyle.data}/>
      <SubscribeBlock />
      <Footer menu={props.footer[0].items} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_HOMEPAGE_DATA
	})

	return {
		props: data
  }
}
