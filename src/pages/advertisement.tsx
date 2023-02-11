import React from "react";
import {
  Checklist,
  Delimiter,
  Header,
  ListBLock,
  Paragraph,
  Quote,
  CodeBlock,
  TableBlock
} from "@/components/helpers/EditorBlocks";
import { Box, Heading } from "@chakra-ui/react";
import Blocks from "editorjs-blocks-react-renderer";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ADVERTISEMENT } from "@/graphql/queries";
import HeaderMenu from "@/components/HeaderMenu";
import Footer from "@/components/Footer";


function Advertisment(props:any) {
  return(
    <>
      <HeaderMenu cookies={props.cookies.data} menu={props.header[0].items} />
      <NextSeo
        title={props.advert.data.attributes.seo.metaTitle}
        description={props.advert.data.attributes.seo.metaDescription}
        canonical={props.advert.data.attributes.seo.canonicalURL}
      />
      <Box
        maxWidth="1120px"
        margin="0 auto"
        width="90%"
        mb="32px"
        as="header"
        pt={{ base: "60px", lg: "80px" }}
        pb={{ base: "60px", lg: "80px" }}
      >
        <Heading
          mb={{ base: "40px", lg: "80px" }}
          as="h1"
          fontWeight="800"
        >
          {props.advert.data.attributes.title}
        </Heading>
        <Box
          bgColor="#fff"
          as="article"
          maxWidth="100%"
          overflow="hidden"
          boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);"
          borderRadius="8px"
        >
          <Box
            className="article"
            padding="56px 32px 24px 32px"
          >
            <Blocks
              data={JSON.parse(props.advert.data.attributes.content!)}
              renderers={{
                checklist: Checklist,
                header: Header,
                paragraph: Paragraph,
                delimiter: Delimiter,
                list: ListBLock,
                quote: Quote,
                code: CodeBlock,
                table: TableBlock,
              }}/>
          </Box>
        </Box>
      </Box>
      <Footer menu={props.footer[0].items} />
    </>
  )
}

export default Advertisment;

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache(),
	})

	const { data } = await client.query({
		query: GET_ADVERTISEMENT,
	})

	return {
		props: data
  }
}
