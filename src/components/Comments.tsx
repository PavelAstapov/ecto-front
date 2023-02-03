import { Box, Button, Divider, FormControl, FormLabel, Input, Textarea, Text, Avatar, Flex, FormErrorMessage } from "@chakra-ui/react";

function Comments(){
  return(
    <Box
      padding="32px"
      pt="0"
    >
      <Divider mb="28px" />
      <form
        style= {{
          display:"flex",
          flexWrap:"wrap",
          rowGap:"24px",
          columnGap:"24px",
        }}
      >
        <FormControl
          width="100%"
        >
          <Textarea width="100%" rows={5} placeholder="Start a conversation" />
          <FormErrorMessage>Comment is required.</FormErrorMessage>
        </FormControl>
        <FormControl
          flex="1 2 100%"
          maxWidth={{ base: "100%", md: "calc(50% - 12px)" }}
        >
          <Input
            type='text'
            placeholder="Your name" />
            <FormErrorMessage>Email is required.</FormErrorMessage>
        </FormControl>
        <FormControl
          flex="1 2 100%"
          maxWidth={{ base: "100%", md: "calc(50% - 12px)" }}
        >
          <Input
            type='email'
            placeholder="Your email" />
          <FormErrorMessage>Name is required.</FormErrorMessage>
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
      </form>
      <Box
        mt="16px"
      >
        <Text
          font-weight= "500"
          font-size="16px"
          line-height="24px"
          color="blue.500"
          mb="16px"
        >
          2 comments
        </Text>
        <Flex
          flexDir="column"
          rowGap="16px"
        >
          <Box
            borderRadius="6px"
            border="1px solid #E2E8F0"
            padding="20px"
          >
            <Flex alignItems="center">
              <Avatar name='Kola Tioluwani' mr="16px" size="sm" />
              <Box>
                <Text
                  fontWeight="500"
                  fontSize="14px"
                  lineHeight="20px"
                >
                  Name
                </Text>
                <Text
                  fontSize="12px"
                  lineHeight="16px"
                >
                  a year ago
                </Text>
              </Box>
            </Flex>
            <Text
              mt="12px"
              pl={{ base: "20px", md:"48px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum.
            </Text>
          </Box>
          <Box
            borderRadius="6px"
            border="1px solid #E2E8F0"
            padding="20px"
          >
            <Flex alignItems="center">
              <Avatar name='Kola Tioluwani' mr="16px" size="sm" />
              <Box>
                <Text
                  fontSize="14px"
                  lineHeight="20px"
                  fontWeight="500"
                >
                  Name
                </Text>
                <Text
                  fontSize="12px"
                  lineHeight="16px"
                >
                  a year ago
                </Text>
              </Box>
            </Flex>
            <Text
              mt="12px"
              pl={{ base: "20px", md:"48px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum.
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}


export default Comments;
