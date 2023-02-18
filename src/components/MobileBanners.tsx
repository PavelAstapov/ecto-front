import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import {
  Box,
  Link as ChakraLink,
  Tag,
  Heading,
  Flex
} from '@chakra-ui/react';
import Link from 'next/link';
import { MainBanner } from '@/Types/types';
import { GetTagInfo } from './helpers/teg-helper';
import { CldImage } from 'next-cloudinary';

interface Props {
  data: MainBanner[];
}

export default function MobileBanners({ data }: Props) {
  return (
    <Swiper className="mySwiper">
      {data?.map(( item: MainBanner, index: number ) =>
        <SwiperSlide key={index}>
          <ChakraLink
            as={Link}
            display="block"
            width="100%"
            height={{ base: "400", md: '582' }}
            top="0"
            left="0"
            href={item?.attributes.url}
            position="relative">
            <CldImage
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 768px) 400px, 400px"
              blurDataURL={item?.attributes?.mainImage.data.attributes.url}
              style={{ objectFit:"cover" }}
              src={item?.attributes?.mainImage.data.attributes.url}
              alt={item?.attributes.title}/>
            <Box
              display="block"
              width="100%"
              height="100%"
              position="absolute"
              top="0"
              left="0"
              bgGradient="linear-gradient(180deg, rgba(45, 55, 72, 0) 27.39%, #2D3748 100%)"
            />
            <Flex
              height="100%"
              justifyContent="flex-end"
              alignItems="flex-start"
              position="relative"
              width="90%"
              pb="80px"
              maxWidth="1216px"
              margin=" 0 auto"
              flexDirection="column"
            >
              <Tags data={item}/>
              <Heading
                as="h1"
                fontSize={{ base: "30px", md: '45px' , xl: '60px' }}
                color="#fff"
                width="100%"
                >
                  {item.attributes.title}
              </Heading>
            </Flex>
          </ChakraLink>
        </SwiperSlide>
      )}
    </Swiper>
  )
}

export function Tags (item: any) {
	const tagData = GetTagInfo(item.data.attributes.category)

	const { categoryColor, categoryName } = tagData
	return (
		<Tag bgColor={categoryColor} color="#fff" textTransform="uppercase" mb="24px">{categoryName}</Tag>
	)
}