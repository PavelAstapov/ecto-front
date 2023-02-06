import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  Link as ChakraLink,
  Text,
  Stack,
 } from '@chakra-ui/react';
import Image from 'next/image';
import Logo from 'src/img/logo.svg';
import Link from 'next/link'
import { getFooterMenu } from './api/api.service';
import { FooterData, FooterMenuData, FooterSubMenu } from '@/types/types';

function Footer() {
  const [data, setData] = useState<FooterData>()

  useEffect(() => {
    const menuData = async () => {
      const fetchedData = await getFooterMenu();
      setData(fetchedData);
    }

    menuData()

  }, []);

  return (
    <Box as="footer" backgroundColor="#fff" top="0px" width="100%">
      <Flex
        maxW="1216px"
        width="95%"
        m="0 auto"
        flexDirection={{ base: "column-reverse", lg: "row" }}
        pt={{ base: "44px",  lg: '64px' }}
        pb={{ base: "80px",  lg: '120px' }}
        align="flex-start"
        justifyContent={{ base: "flex-start", lg: "space-between" }}
      >
        <Box mt={{ base: "32px", lg: "0" }}>
          <Link href="/">
          <Image
            src={Logo}
            alt="Ecto"
            width={95}
            height={28}
          />
          </Link>
          <Text
            mt="32px"
            fontSize="14px"
            color="gray.800"
          >
            Copyright {new Date().getFullYear()}. All rights reserved
          </Text>
        </Box>
        <Flex
          align="center"
          columnGap="36px"
          as="nav"
          display="flex"
          flexDir={{ base: "column", md: "row" }}
          rowGap="40px"
        >
          {data?.menu.map((item: FooterMenuData, index: number) =>
            <Stack key={item.id} minW="176px">
              <>
                <Text mb="24px" fontWeight={700}>{item.title}</Text>
                {item.items.map((i: FooterSubMenu, indexx: number) =>
                  <ChakraLink
                    href={i.path}
                    key={i.id}
                    fontWeight="400"
                    fontSize="14px"
                    display="block"
                    paddingTop="12px"
                    lineHeight="20px"
                    color="#1A202C"
                    _hover={{ color: 'blue.600' }}
                    as={Link}
                  >
                    {i.title}
                  </ChakraLink>
                )}
              </>
            </Stack>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;