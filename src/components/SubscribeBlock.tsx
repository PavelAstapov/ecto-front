import React, { useState } from 'react';
import {
    Box,
		Heading,
		Text,
		Flex,
		FormControl,
		FormLabel,
		Input,
		FormErrorMessage,
		Button,
		useToast
} from '@chakra-ui/react';
import { subscribeUser } from '@strapi-newsletter/react';
import { Spinner } from '@chakra-ui/react'

function SubscribeBlock() {
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading ] = useState(false);
	const toast = useToast()

	const handeSubscribeSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true)

		if(!(e.target.email.value === '')){
			await subscribeUser(e.target.email.value, `${process.env.NEXT_PUBLIC_API_URL}`);
			toast({
				title: 'Thank you.',
				description: "We've received your email address.",
				status: 'success',
				duration: 3000,
				isClosable: true,
			})
			setIsLoading(false)
		} else {
			setIsError(e.target.email.value === '');
		}
	}

  return (
		<Box
			as="section"
			width="100%"
			paddingBottom={{ base: "60px", lg: '80px' }}
			paddingTop={{ base: "60px", lg: '80px' }}
			position="relative"
			bgColor="gray.50"
		>
			<Flex
				maxWidth="1216px"
				margin="0 auto"
				width="90%"
				flexDir="column"
				bgColor="#fff"
				flexWrap="wrap"
				justifyContent="center"
				alignItems="center"
				boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
				borderRadius="8px"
				pt={{ base: "36px", md: "56px"}}
				pb={{ base: "36px", md: "56px"}}
			>
				<Heading
					mb="16px"
					as="h2"
					color="gray.800"
					textAlign="center"
				>
					Subscribe to our newsletter!
				</Heading>
				<Text
					lineHeight="1.56"
          fontWeight="regular"
          fontSize="18px"
          color="gray.600"
          alignSelf="stretch"
          textAlign="center"
					mb="24px"
				>
					We'll send you the best of our blog just once a month. We promise.
				</Text>
					<form
						style={{ width: "100%", maxWidth: "304px", textAlign: "center"}}
						onSubmit={(e) => handeSubscribeSubmit(e)}
					>
						<FormControl isInvalid={isError}>
							<Input
								variant="Outline"
								size="lg"
								width="100%"
								border="1px solid #E2E8F0;"
								name="email"
								placeholder="Enter your email to join"
								type='email' />
								{isError && <FormErrorMessage mb="10px">Email is required.</FormErrorMessage>}
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
							Submit
						</Button>
						{isLoading && <Spinner margin=" 0 auto" mt="15px" color='blue.500' />}
					</form>
			</Flex>
		</Box>
  );
}

export default SubscribeBlock;