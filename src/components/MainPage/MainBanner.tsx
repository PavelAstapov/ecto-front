import React, { useEffect, useState } from 'react';
import {
    Box,
		Tag,
		Heading,
		Flex
	} from '@chakra-ui/react';
import PostCardNoImg from '../PostCardNoImg';
import { MainBanner } from '@/Types/types';
import { GetTagInfo } from '../helpers/teg-helper';
import dynamic from 'next/dynamic';
import { CldImage } from 'next-cloudinary';

interface Props {
	data: MainBanner[];
}

function MainBanner({ data }: Props ) {
	const [isMobile, setIsMobile] = useState<Boolean>();
	const MobileBanners = dynamic(() => import('@/components/MobileBanners'))

	useEffect(() => {
		setIsMobile((window.innerWidth <= 830) ? true : false)

		const bannerCard = document.querySelectorAll(".onBanner");

		bannerCard[0]?.nextElementSibling?.classList.add('show');

		bannerCard.forEach(item => {
			item.addEventListener('mouseenter', () => {
				document.querySelector('.show')!.classList.remove('show');
				item.nextElementSibling!.classList.add('show');
			})
		})
	}, [data])

  return (
		<Box
			as="section"
			width="100%"
			bgColor="gray.300"
			height={{ base: "400", md: '582' }}
			paddingBottom={{ base: "0", lg: '80px' }}
			paddingTop={{ base: "0", lg: '80px' }}
			position="relative">
			{isMobile && (
				<MobileBanners data={data} />
			)}
			{!isMobile && (
				<Box
					maxWidth="1216px"
					margin="0 auto"
					display="flex"
					alignItems="flex-end"
					justifyContent="flex-end"
					columnGap="32px"
					width="90%"
				>
					<Box display={{ base: "none", md: 'flex' }} flexDirection="column" rowGap="16px">
						{data && (data?.map(( item: MainBanner, index: number ) =>
							<Box key={index} className={index === 0 ? "show" : ""}>
								<PostCardNoImg isOnBanner item={item} />
								<Box
									width="100%"
									height="100%"
									top="0"
									left="0"
									display="none"
									position="absolute">
									<CldImage
										fill
										style={{ objectFit:"cover" }}
										placeholder="blur"
										blurDataURL={item?.attributes?.mainImage.data.attributes.url}
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
											maxWidth="800px"
											fontSize={{ base: "36px", md: '45px' , xl: '60px' }}
											color="#fff"
											width="100%"
											>
												{item?.attributes?.title}
										</Heading>
									</Flex>
								</Box>
							</Box>
						))}
					</Box>
				</Box>
			)}
		</Box>
  );
}

export function Tags (item: any) {
	const tagData = GetTagInfo(item.data.attributes.category)

	const { categoryColor, categoryName } = tagData
	return (
		<Tag bgColor={categoryColor} color="#fff" textTransform="uppercase" mb="24px">{categoryName}</Tag>
	)
}

export default MainBanner;