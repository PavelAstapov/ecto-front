import { useEffect, useState } from "react";
import { getPrivacyNotice } from "@/components/api/api.service";
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
import { StaticPage } from "@/Types/types";
import { Box, Heading } from "@chakra-ui/react";
import Blocks from "editorjs-blocks-react-renderer";
import { NextSeo } from "next-seo";


function PrivacyNotice() {
  const [data, setData] = useState<StaticPage>()

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await getPrivacyNotice();
      setData(fetchedData.data);
    }

    getData()
  }, []);
  return(
    <>
      {data && (
				<NextSeo
					title={data?.seo.metaTitle}
					description={data?.seo.metaDescription}
					canonical={data?.seo.canonicalURL}
				/>
			)}
      <Box
        maxWidth="1120px"
        margin="0 auto"
        width="90%"
        mb="32px"
        as="header"
        pt={{ base: "60px", lg: "80px" }}
        pb={{ base: "60px", lg: "80px" }}
      >
        {data && (
          <>
            <Heading
              mb={{ base: "40px", lg: "80px" }}
              as="h1"
              fontWeight="800"
            >
              {data.title}
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
                  data={JSON.parse(data.content!)}
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
          </>
        )}
      </Box>
    </>

  )
}

export default PrivacyNotice;
