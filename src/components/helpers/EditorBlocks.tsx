import { RenderFn } from "editorjs-blocks-react-renderer"
import {
  Checkbox,
  Heading,
  Text,
  Divider,
  Box,
  UnorderedList,
  ListItem,
  OrderedList,
  Flex,
  TableContainer,
  Thead,
  Td,
  Tbody,
  Th,
  Tr,
  Table,
  As,
} from "@chakra-ui/react";
import HTMLReactParser from "html-react-parser";
import Image from 'next/image'
// @ts-ignore There is no types for this package
import Prism from 'prismjs';
import { useEffect, useState } from "react";

export const Checklist: RenderFn<{
  items: any
  }> = ({
    data,
  }) => {
  return (
    <>
      <Flex mb="32px" rowGap="18px" alignItems="flex-start" flexDirection='column'>
        {data?.items.map((item: any, i: number) => (
            <Checkbox
              _hover={{ cursor: "auto" }}
              key={i}
              size='lg'
              readOnly
              defaultChecked={item.checked}
              colorScheme='green'
            >
              <Text
                as="span"
                position="relative"
                color="gray.600"
                top="-2px"
                fontSize={{ base: "16px", lg: "20px" }}
              >
                  {HTMLReactParser(item.text)}
              </Text>
            </Checkbox>
        ))}
      </Flex >
    </>
  )
}

export const Header: RenderFn<{
  text: string;
  level: number;
  id: string
  }> = ({
    data,
  }) => {
    const TitleLevel = (`h${data.level}`) as As<any> | undefined
    return (
      <Heading
        mt={{ base: "30px", lg: "48px" }}
        mb="32px"
        color="gray.800"
        as={TitleLevel}
      >
        {data.text}
      </Heading>
    )
}

export const Paragraph: RenderFn<{
  text: string;
  }> = ({
    data,
  }) => {
    return (
      <Text
        color="gray.600"
        fontSize={{ base: "16px", lg: "20px" }}
      >
        {HTMLReactParser(data.text)}
      </Text>
    )
}

export const Delimiter: RenderFn<{
  }> = ({
  }) => {
    return (
      <Divider bgColor="gray.300" mt="32px" mb="32px" />
    )
}

export const ImageBlock: RenderFn<{
  text: string;
  file: {
    formats: {
      medium: {
        height: number
        url: string
      }
      thumbnail: {
        height: number
      }
    }
  }
  }> = ({
    data,
  } ) => {
    const [height, setHeight] = useState<number>();

    useEffect(() => {
      setHeight(window && window.innerWidth < 767 ? data.file.formats.thumbnail.height : data.file.formats.medium.height);
    }, []);

  return (
    <>
    <figure style={{
        marginBottom: "32px",
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        position: "relative",
      }}>
        <Box
          height={`${height}px`}
          width="100%"
          position="relative"
        >
          <Image
            placeholder="blur"
            blurDataURL={data.file.formats.medium.url}
            priority={false}
            quality={90}
            sizes="(max-width: 768px) 90vw, 1200px"
            style={{ objectFit: "cover" }}
            fill
            src={data.file.formats.medium.url}
            alt="ecto blog" />
        </Box>
      <figcaption
        style={{
          color: "gray.600",
          padding: "16px",
          textAlign: "center",
          fontStyle: "italic",
          fontSize: "14px",
          fontFamily: "var(--chakra-fonts-body)"
        }}
      >test</figcaption>
    </figure>
    </>
  )
}

export const ListBLock: RenderFn<{
  items: string[],
  style: string,
  }> = ({
    data,
  }) => {
  return (
    <>
      {data.style === "unordered" ? (
        <UnorderedList mb="32px" >
          {data?.items.map((item, i: number) => (
            <ListItem key={i} color="gray.600" fontSize={{ base: "16px", lg: "20px" }}>{item}</ListItem>
          ))}
        </UnorderedList>
        ) : (
          <OrderedList mb="32px" >
            {data?.items.map((item, i: number) => (
                <ListItem key={i} color="gray.600" fontSize={{ base: "16px", lg: "20px" }}>{item}</ListItem>
            ))}
          </OrderedList>
        )
      }
    </>
  )
}

export const Quote: RenderFn<{
  text: string;
  }> = ({
    data,
  }) => {
  return (
    <Box
      mb="32px"
      ml={{ base: "16px", md: "32px" }}
      pl={{ base: "20px", md: "40px" }}
      borderLeft="4px solid #BEE3F8"
    >
      <Text
        color="gray.600"
        fontStyle="italic"
        fontSize={{ base: "16px", lg: "20px" }}
      >
        {HTMLReactParser(data.text)}
      </Text>
    </Box>
  )
}

export const CodeBlock: RenderFn<{
  code: string;
  }> = ({
    data,
  }) => {
    useEffect(() => {
      Prism.highlightAll();
    }, []);
  return (
    <Box
      mb="32px"
      maxW="100%"
      borderRadius="8px"
      overflow="hidden"
      overflowX="auto"
    >
      <pre><code className="language-javascript">{data.code}</code></pre>
    </Box>
  )
}

export const TableBlock: RenderFn<{
  content: [[string[]]],
  }> = ({
    data,
  }) => {
  return (
    <>
      <TableContainer
        mb="32px"
        borderBottom="none"
        border="1px solid"
        borderRadius="4px"
        borderColor="gray.200"
      >
        <Table variant='simple'>
          <Thead>
            <Tr>
              {data.content[0].map((item, i) =>
                <Th key={i}>{item}</Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {data.content.slice(1).map((item, i) =>
              <Tr>
              {item.map(items =>
                <Td key={i}>{items}</Td>
              )}
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
