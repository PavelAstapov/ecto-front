import { useEffect, useState } from "react";
import { getContactUs } from "@/components/api/api.service";
import { ContactUs } from "@/types/types";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
  useToast,
  Link as ChakraLink,
  Text,
  Link,
  Skeleton,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import axios from "axios";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";


function PrivacyNotice() {
  const [data, setData] = useState<ContactUs>();
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [companyNameError, setCompanyNameError] = useState<boolean>(false);
  const [subjectError, setSubjectError] = useState<boolean>(false);
  const [contentError, setContentError] = useState<boolean>(false);
  const [isLoading, setIsLoading ] = useState(false);
  const toast = useToast();

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();

    setEmailError(e.target.email.value === '');
    setNameError(e.target.name.value === '');
    setContentError(e.target.content.value === '');
    setPhoneError(e.target.phone.value === '');
    setCompanyNameError(e.target.companyName.value === '');
    setSubjectError(e.target.subject.value === '');

    if(!(e.target.email.value === '') && !(e.target.name.value === '') && !(e.target.content.value === '')){
      setIsLoading(true);
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/ezforms/submit`, {
          formName: 'Test Form',
          formData:{
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            company: e.target.companyName.value,
            subject: e.target.subject.value,
            message: e.target.content.value,
          }
        })
        toast({
					title: 'Thank you.',
					description: "Your message was sent.",
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
    const getData = async () => {
      const fetchedData = await getContactUs();
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
        maxWidth="1216px"
        margin="0 auto"
        width="90%"
        mb="32px"
        as="header"
        pt={{ base: "60px", lg: "80px" }}
        pb={{ base: "60px", lg: "80px" }}
      >
        {!data && (
          <>
            <Skeleton
              width="100%"
              height="40px"
              mb="20px"
              borderRadius="8px"
            />
            <Skeleton
              width="100%"
              height="40px"
              borderRadius="8px"
              mb={{ base: "60px", lg: "80px" }}
            />
            <Flex
              flexDirection={{ base: "column", lg: "row" }}
              columnGap="64px"
            >
              <Skeleton borderRadius="8px" width="100%" height={{ base: "400px", lg: "600px"}}/>
              <Skeleton borderRadius="8px" minWidth={{ base: "100%", md: "360px" }} height={{ base: "200px", lg: "600px"}} />
            </Flex>
          </>
        )}
        {data && (
          <>
            <Heading
              mb={{ base: "20px", lg: "32px" }}
              as="h1"
              fontWeight="800"
            >
              {data.title}
            </Heading>
            <Flex
              columnGap="128px"
							alignItems="flex-start"
							flexDir={{ base: "column", lg: "row" }}
            >
              <Box>
                <Text
                  color="gray.600"
                  fontSize="20px"
                  lineHeight="28px"
                  mb="32px"
                >
                  {data.description}
                </Text>
                <Box
                  bgColor="#fff"
                  as="article"
                  maxWidth="100%"
                  overflow="hidden"
                  padding="32px"
                  boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);"
                  borderRadius="8px"
                >
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
                      flex="1 2 100%"
                      isInvalid={nameError}
                      maxWidth={{ base: "100%", md: "calc(50% - 12px)" }}
                    >
                      <FormLabel>Name</FormLabel>
                      <Input
                        name="name"
                        type='text' />
                        {nameError && <FormErrorMessage>Name is required.</FormErrorMessage>}
                    </FormControl>
                    <FormControl
                      flex="1 2 100%"
                      isInvalid={companyNameError}
                      maxWidth={{ base: "100%", md: "calc(50% - 12px)" }}
                    >
                      <FormLabel>Company Name</FormLabel>
                      <Input
                        name="companyName"
                        type='text'/>
                        {companyNameError && <FormErrorMessage>Company name is required.</FormErrorMessage>}
                    </FormControl>
                    <FormControl
                      flex="1 2 100%"
                      isInvalid={emailError}
                      maxWidth={{ base: "100%", md: "calc(50% - 12px)" }}
                    >
                      <FormLabel>Email</FormLabel>
                      <Input
                        name="email"
                        type="email" />
                      {emailError && <FormErrorMessage>Email is required.</FormErrorMessage>}
                    </FormControl>
                    <FormControl
                      flex="1 2 100%"
                      isInvalid={phoneError}
                      maxWidth={{ base: "100%", md: "calc(50% - 12px)" }}
                    >
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        name="phone"
                        type="tel"/>
                      {phoneError && <FormErrorMessage>Phone number is required.</FormErrorMessage>}
                    </FormControl>
                    <FormControl
                      flex="1 1 100%"
                      isInvalid={subjectError}
                      maxWidth="100%"
                    >
                      <FormLabel>Subject</FormLabel>
                      <Input
                        name="subject"
                        type="text"/>
                      {subjectError && <FormErrorMessage>Subject is required.</FormErrorMessage>}
                    </FormControl>
                    <FormControl
                      width="100%"
                      isInvalid={contentError}
                    >
                      <FormLabel>Your Message</FormLabel>
                      <Textarea name="content" width="100%" rows={3} />
                      {contentError && <FormErrorMessage>Comment is required.</FormErrorMessage>}
                    </FormControl>
                    <Button
                      mt="8px"
                      size="lg"
                      bgColor="blue.500"
                      fontWeight="600"
                      color="#fff"
                      type="submit"
                      _hover={{ bgColor: "blue.600" }}
                    >
                      Submit
                    </Button>
                    {isLoading && <Spinner margin=" 0 auto" mt="15px" color='blue.500' />}
                  </form>
                </Box>
              </Box>
              <Box
                minWidth={{ base: "100%", lg: "360px" }}
                maxWidth={{ base: "100%", lg: "360px" }}
								as="aside"
								display="flex"
								flexDir="column"
								rowGap="64px"
								mt={{ base: "40px", lg: "0" }}
              >
                <Box>
                  <Text
										fontWeight="700"
										fontSize="18px"
										mb="12px"
									>
										Our Commitment
									</Text>
                  <Box
                    width="100%"
										boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
										borderRadius="8px"
										bgColor="#fff"
										overflow="hidden"
										padding="28px"
                  >
                    <Text
                      color="gray.500"
                      fontWeight="400"
                      fontSize="19px"
                      lineHeight="28px"
                    >
                      {data.ourCommitment}
                    </Text>
                  </Box>
                </Box>

                <Box>
                  <Text
										fontWeight="700"
										fontSize="18px"
										mb="12px"
									>
										Art Directing
									</Text>
                  <Box
                    width="100%"
										boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
										borderRadius="8px"
										bgColor="#fff"
										overflow="hidden"
										padding="28px"
                  >
                    <Text
                      color="gray.500"
                      fontWeight="400"
                      fontSize="19px"
                      lineHeight="28px"
                      mb="24px"
                    >
                       {data.artDescription}
                    </Text>
                    <Box >
                      <ChakraLink
                        as={Link}
                        htef={`phone:${data.artPhone}`}
                        fontWeight="500"
                        fontSize="16px"
                        lineHeight="24px"
                        color="gray.500"
                        display="flex"
                        alignItems="center"
                        columnGap="8px"
                        _hover={{ textDecor: "none" }}
                      >
                        <PhoneIcon /> {data.artPhone}
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        htef={`mailto:${data.artEmail}`}
                        fontWeight="500"
                        fontSize="16px"
                        lineHeight="24px"
                        color="gray.500"
                        display="flex"
                        alignItems="center"
                        columnGap="8px"
                        mt="20px"
                        _hover={{ textDecor: "none" }}
                      >
                        <EmailIcon /> {data.artEmail}
                      </ChakraLink>
                      <Text
                        fontWeight="500"
                        fontSize="16px"
                        lineHeight="24px"
                        color="gray.500"
                        display="flex"
                        alignItems="center"
                        columnGap="8px"
                        mt="20px"
                        _hover={{ textDecor: "none" }}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.3033 14.4698L10 19.7731L4.69667 14.4698C3.64779 13.4209 2.93349 12.0845 2.64411 10.6296C2.35473 9.17479 2.50326 7.6668 3.07092 6.29636C3.63858 4.92592 4.59987 3.75458 5.83324 2.93048C7.0666 2.10637 8.51665 1.6665 10 1.6665C11.4834 1.6665 12.9334 2.10637 14.1668 2.93048C15.4001 3.75458 16.3614 4.92592 16.9291 6.29636C17.4968 7.6668 17.6453 9.17479 17.3559 10.6296C17.0665 12.0845 16.3522 13.4209 15.3033 14.4698ZM10 10.8331C10.442 10.8331 10.866 10.6575 11.1785 10.345C11.4911 10.0324 11.6667 9.60847 11.6667 9.16644C11.6667 8.72441 11.4911 8.30049 11.1785 7.98793C10.866 7.67537 10.442 7.49977 10 7.49977C9.55798 7.49977 9.13405 7.67537 8.82149 7.98793C8.50893 8.30049 8.33334 8.72441 8.33334 9.16644C8.33334 9.60847 8.50893 10.0324 8.82149 10.345C9.13405 10.6575 9.55798 10.8331 10 10.8331Z" fill="#718096"/>
                        </svg>
                        {data.artAddress}
                      </Text>
                    </Box>
                  </Box>
                </Box>

              </Box>
            </Flex>
          </>
        )}
      </Box>
    </>

  )
}

export default PrivacyNotice;
