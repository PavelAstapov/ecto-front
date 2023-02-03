import React, { useState } from 'react';
import {
    Box,
		Text,
		Flex,
		FormControl,
		Input,
		FormErrorMessage,
		Button,
		useToast
} from '@chakra-ui/react';
import { subscribeUser } from '@strapi-newsletter/react';
import { Spinner } from '@chakra-ui/react'

function SubscribeBlogBlock() {
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading ] = useState(false);
	const toast = useToast()

	const handeSubscribeSubmit = async (e: any) => {
		e.preventDefault();

		if(!(e.target.email.value === '')){
			setIsLoading(true);
			try {
				await subscribeUser(e.target.email.value, `${process.env.NEXT_PUBLIC_API_URL}`);
				toast({
					title: 'Thank you.',
					description: "We've received your email address.",
					status: 'success',
					duration: 3000,
					isClosable: true,
				})
				setIsLoading(false)
			} catch (error) {
				setIsLoading(false)
				toast({
					title: 'Error!',
					description: "Probably you have already subscribed.",
					status: 'error',
					duration: 3000,
					isClosable: true,
				})
			}
		} else {
			setIsError(e.target.email.value === '');
		}
	}

  return (
		<Box
			width="100%"
			position="relative"
		>
			<Flex
				width="100%"
				flexDir="column"
				bgColor="#fff"
				flexWrap="wrap"
				justifyContent="center"
				alignItems="center"
				boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
				borderRadius="8px"
				padding="28px"
			>
				<Text
					lineHeight="1.56"
          fontWeight="400"
          fontSize="18px"
          color="gray.500"
          textAlign="left"
					mb="24px"
				>
					Make sure to subscribe to our newsletter and be the first to know the news.
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
								placeholder="Email Address"
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

export default SubscribeBlogBlock ;