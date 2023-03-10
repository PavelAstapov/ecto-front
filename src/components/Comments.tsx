import { Box, Button, Divider, FormControl, Input, Textarea, Text, Avatar, Flex, FormErrorMessage, useToast, Spinner } from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import uuid from 'react-uuid';

type Comment = {
  author: {
    name: string
  },
  content: string,
  createdAt: string
  id: number,
}

interface Props {
  item?: Comment[]
  id: number
}

function Comments({ item, id }: Props){
  const [emailError, setEmailError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [contentError, setContentError] = useState<boolean>(false);
  const [isLoading, setIsLoading ] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();

    setEmailError(e.target.email.value === '');
    setNameError(e.target.name.value === '');
    setContentError(e.target.content.value === '');

    if(!(e.target.email.value === '') && !(e.target.name.value === '') && !(e.target.content.value === '')){
      setIsLoading(true);
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/api::article.article:${id}`, {
          "author": {
            "id": uuid(),
            "name": e.target.name.value,
            "email": e.target.email.value,
          },
          "content": e.target.content.value,
        })
        toast({
					title: 'Thank you.',
					description: "Your comment is under review.",
					status: 'success',
					duration: 3000,
					isClosable: true,
				})
        setIsLoading(false);
        e.target.reset();
      } catch (e) {
        setIsLoading(false);
        toast({
					title: 'Error!',
					status: 'error',
					duration: 3000,
					isClosable: true,
				})
      }
    }
  }

  useEffect(() => {
    setEmailError(false);
    setNameError(false);
    setContentError(false);
  }, [router.query.slug])

  return(
    <Box
      padding="32px"
      pt="0"
    >
      <Divider mb="28px" />
      <form
        onSubmit={(e) => handleCommentSubmit(e)}
        style= {{
          display:"flex",
          flexWrap:"wrap",
          rowGap:"24px",
          columnGap:"24px",
        }}
      >
        <FormControl
          width="100%"
          isInvalid={contentError}
        >
          <Textarea name="content" width="100%" rows={5} placeholder="Start a conversation" />
          {contentError && <FormErrorMessage>Comment is required.</FormErrorMessage>}
        </FormControl>
        <FormControl
          flex="1 2 100%"
          isInvalid={nameError}
          maxWidth={{ base: "100%", md: "calc(50% - 12px)" }}
        >
          <Input
            name="name"
            type='text'
            placeholder="Your name" />
            {nameError && <FormErrorMessage>Name is required.</FormErrorMessage>}
        </FormControl>
        <FormControl
          flex="1 2 100%"
          isInvalid={emailError}
          maxWidth={{ base: "100%", md: "calc(50% - 12px)" }}
        >
          <Input
            name="email"
            type="email"
            placeholder="Your email" />
          {emailError && <FormErrorMessage>Email is required.</FormErrorMessage>}
        </FormControl>
        <Button
          mt="8px"
          size="lg"
          bgColor="blue.500"
          width="100%"
          fontWeight="600"
          color="#fff"
          type="submit"
          _hover={{ bgColor: "blue.600" }}
        >
          Post a comment
        </Button>
        {isLoading && <Spinner margin=" 0 auto" mt="15px" color='blue.500' />}
      </form>
      {item && (
        <Box
          mt="16px"
        >
          <Text
            fontWeight= "500"
            fontSize="16px"
            lineHeight="24px"
            color="blue.500"
            mb="16px"
          >
            {item.length} comments
          </Text>
          <Flex
            flexDir="column"
            rowGap="16px"
          >
            {item.map((item: any) =>
              <Box
                key={uuid()}
                borderRadius="6px"
                border="1px solid #E2E8F0"
                padding="20px"
              >
                <Flex alignItems="center">
                  <Avatar name={item.author.name} mr="16px" size="sm" />
                  <Box>
                    <Text
                      fontWeight="500"
                      fontSize="14px"
                      lineHeight="20px"
                    >
                      {item.author.name}
                    </Text>
                    <Text
                      fontSize="12px"
                      lineHeight="16px"
                    >
                      {dayjs(item.createdAt).format('MMMM D, YYYY')}
                    </Text>
                  </Box>
                </Flex>
                <Text
                  mt="12px"
                  pl={{ base: "20px", md:"48px" }}
                >
                  {item.content}
                </Text>
              </Box>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  )
}


export default Comments;
