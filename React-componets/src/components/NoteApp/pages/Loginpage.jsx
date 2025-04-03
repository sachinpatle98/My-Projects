import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../redux/users/user_actions';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Loginpage = () => {
    const { auth } = useSelector((state) => state.userReducer);
    const nav = useNavigate();
    const dispatch = useDispatch();

    if (auth) {
        nav("/project/9/notes");
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/, "Invalid email format (must end with .com)")
            .required("Email is required"),
        password: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
                     "Password must have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character")
            .required("Password is required"),
    });

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            dispatch(getUser(values));
                        }}
                    >
                        {({ errors, touched, isValid, dirty }) => (
                            <Form>
                                <Stack spacing={4}>
                                    {/* Email Field */}
                                    <Field name="email">
                                        {({ field }) => (
                                            <FormControl isInvalid={errors.email && touched.email}>
                                                <FormLabel>Email address</FormLabel>
                                                <Input {...field} type="email" />
                                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    {/* Password Field */}
                                    <Field name="password">
                                        {({ field }) => (
                                            <FormControl isInvalid={errors.password && touched.password}>
                                                <FormLabel>Password</FormLabel>
                                                <Input {...field} type="password" />
                                                <FormErrorMessage>{errors.password}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    {/* Submit Button (Disabled until fields are valid) */}
                                    <Stack spacing={10}>
                                        <Button
                                            type="submit"
                                            bg={'blue.400'}
                                            color={'white'}
                                            _hover={{ bg: 'blue.500' }}
                                            isDisabled={!(isValid && dirty)}
                                        >
                                            Sign in
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Loginpage;
