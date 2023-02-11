import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  IconButton,
  useDisclosure,
  Link as ChakraLink,
  Stack,
  Collapse,
  Container,
  Text,
  CloseButton,
 } from '@chakra-ui/react';
import Image from 'next/image';
import Logo from 'src/img/logo.svg';
import Link from 'next/link'
import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import { HeaderMenuData } from '@/Types/types';
import { hasCookie, setCookie } from 'cookies-next';
import Search from './MainPage/Search';
import 'instantsearch.css/themes/reset.css';
import 'instantsearch.css/themes/satellite.css';


interface Props {
  menu: HeaderMenuData[];
  cookies: any;
}

function HeaderMenu({ menu, cookies }: Props) {
  const { isOpen, onToggle } = useDisclosure();
  const [isCookieBanner, seIsCookieBanner] = useState<boolean>(false);

  useEffect(() => {
    if(!hasCookie("notFirstVisit")){
      seIsCookieBanner(true)
    }

    const cookiesData = async () => {
      cookies.map((item: any) => {
        if(!hasCookie(`${item.attributes.name}`)) {
          const maxAge = () => {
            if (item.attributes.duration.days * item.attributes.duration.hours * item.attributes.duration.minutes === 0) {
              return (new Date(new Date().setFullYear(new Date().getFullYear() + 1))).getTime();
            } else {
              return item.attributes.duration.days * item.attributes.duration.hours * item.attributes.duration.minutes;
            };
          }
          setCookie(`${item.attributes.name}`, `${item.attributes.description}`, { path: '/', maxAge: maxAge()});
        }
      })
    }

    cookiesData();
  }, []);

  const closeCookieBanner = () => {
    seIsCookieBanner(false);
    setCookie('notFirstVisit', true, { path: '/', maxAge: (new Date(new Date().setFullYear(new Date().getFullYear() + 1))).getTime()});
  }

  return (
    <>
      {isCookieBanner && (
        <Container
          as="section"
          pb="10px"
          zIndex="999"
          position="fixed"
          bottom="0"
          minWidth="100%"
        >
          <Box
            bg="blue.500"
            color="#fff"
            p={{ base: '4', md: '3' }}
            py={{ base: '3', md: '5' }}
            position="relative"
            borderRadius="xl"
            margin="0 auto"
            width="90vw"
            maxWidth="1216px"
          >
            <Stack
              direction={{ base: 'column', md: 'row' }}
              justify="center"
              spacing={{ base: '0.5', md: '1.5' }}
              pe={{ base: '4', sm: '0' }}
            >
              <Text fontWeight="medium">This site is using cookies.</Text>
              <Text color="on-accent-muted">
                Read our <ChakraLink as={Link} href="/privacy-notice">Privacy notice</ChakraLink>
              </Text>
            </Stack>
            <CloseButton onClick={closeCookieBanner} position="absolute" right="2" top={{ base: '2', md: '4' }} />
          </Box>
        </Container>
      )}
      <Box className="nav-wrapper" zIndex="999" position="fixed" backgroundColor="#fff" top="0px" width="100%">
        <Flex
          maxW="1216px"
          width="95%"
          m="0 auto"
          pt={{ base: "15px",  lg: '28px' }}
          pb={{ base: "15px",  lg: '28px' }}
          align="center"
          justifyContent="space-between"
        >
            <Flex
              align="center"
              columnGap="84px"
            >
              <Link href="/">
                <Image
                  src={Logo}
                  alt="Ecto"
                  width="95"
                  height="28"
                  priority
                  placeholder="blur"
                  blurDataURL={Logo.src}
                />
              </Link>
              <Box display={{ base: "none", lg:"block" }}>
                <Search />
              </Box>
            </Flex>
            {menu && (
              <>
                <Flex
                  align="center"
                  columnGap="32px"
                  as="nav"
                  display={{ base: "none", lg: 'flex' }}
                >
                  {menu.map((item: HeaderMenuData) =>
                    <ChakraLink
                      href={item.path}
                      key={item.id}
                      fontWeight={600}
                      color="#1A202C"
                      _hover={{ color: 'blue.600' }}
                      _last={{ bgColor: "blue.500", color: "#fff", borderRadius: "8px", pt: "8px", pb: "8px", pr: "16px", pl: "16px",  _hover: { background: 'blue.600' } }}
                      as={Link}>
                      {item.title}
                    </ChakraLink>
                  )}
                </Flex>
                <Collapse in={isOpen} animateOpacity>
                  <MobileNav props={menu} />
                </Collapse>
              </>
            )}
          <IconButton
            onClick={onToggle}
            display={{lg: 'none' }}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
      </Box>
    </>
  );
}

const MobileNav = ({ props }: any) => {
  return (
    <Stack
      bg="white"
      position="fixed"
      left="0px"
      width="100%"
      top="60px"
      pb="20px"
      zIndex={999}
      alignItems="center"
    >
      {props.map((item: HeaderMenuData) =>
        <ChakraLink
          as={Link}
          key={item.id}
          _hover={{ color: 'blue.600' }}
          pt="10px"
          width="100%"
          fontWeight="600"
          pl="20px"
          borderBottom="1px solid"
          borderColor='gray.300'
          pb="15px"
          href={item.path}
        >
          {item.title}
        </ChakraLink>
      )}
       <Search />
    </Stack>
  );
};

export default HeaderMenu;