import { getHomePage } from '@/components/api/api.service';
import BeautyPosts from '@/components/MainPage/BeautyPosts';
import FashionPosts from '@/components/MainPage/FashionPosts';
import LifestylePosts from '@/components/MainPage/LifestylePosts';
import MainBanner from '@/components/MainPage/MainBanner'
import PickPosts from '@/components/MainPage/PickPosts';
import ResentPosts from '@/components/MainPage/ResentPosts';
import TrendingPosts from '@/components/MainPage/TrendingPosts';
import WellnessPosts from '@/components/MainPage/WellnessPosts';
import SubscribeBlock from '@/components/SubscribeBlock';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';

export default function Home(props: any) {
  const [data, setData] = useState<any>();

  // <MainBanners>

	useEffect(() => {
		const getData = async () => {
			const fetchedData = await getHomePage();

			setData(fetchedData);
		}

	  getData();
	}, [])

  return (
    <>
      <NextSeo
        title="Ecto Blog"
        description="A short description goes here."
      />
      <MainBanner data={data && data.data.articles.data}/>
      <ResentPosts img={data && data.data.sponsorImg.data.attributes.url} link={data && data.data.sponsorLink} />
      <PickPosts />
      <BeautyPosts />
      <FashionPosts />
      <TrendingPosts />
      <WellnessPosts />
      <LifestylePosts />
      <SubscribeBlock />
    </>
  )
}
