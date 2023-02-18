import React from 'react';
import Footer from '@/components/Footer';
import HeaderMenu from '@/components/HeaderMenu';
import MainBanner from '@/components/MainPage/MainBanner'
import ResentPosts from '@/components/MainPage/ResentPosts';
import SubscribeBlock from '@/components/SubscribeBlock';
import { GET_HOMEPAGE_DATA } from '@/graphql/queries';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import PickPosts from '@/components/MainPage/PickPosts';
import BeautyPosts from '@/components/MainPage/BeautyPosts';
import FashionPosts from '@/components/MainPage/FashionPosts';
import TrendingPosts from '@/components/MainPage/TrendingPosts';
import WellnessPosts from '@/components/MainPage/WellnessPosts';
import LifestylePosts from '@/components/MainPage/LifestylePosts';

export default function Home(props: any) {
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

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
