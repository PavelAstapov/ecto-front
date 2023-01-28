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

export default function Home(props: any) {
  return (
    <>
      <NextSeo
        title="Ecto Blog"
        description="A short description goes here."
      />
      <MainBanner />
      <ResentPosts />
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
