import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Heading, HStack, VStack, Box, Container, useColorModeValue } from '@chakra-ui/react';
import { motion } from "framer-motion"
import { useAuthStore } from '../store/authStore';
import { Loader } from 'lucide-react';

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setAccountType] = useState("user"); // New state for account type
    const { signup, error, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password, name, accountType);  // Pass accountType as parameter
            navigate("/verify-email");
        } catch (error) {
            console.log("error in signing up", error);
        }
    };

    return (
        <Container>
            <Box
                w={"full"} bg={useColorModeValue("white", "gray.800")}
                rounded={"lg"} p={6} shadow={"md"} mt={"20"}>
                <VStack gap={3}>
                    <Heading as={"h1"} mb={10} className='mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text'>Create an Account</Heading>

                    <form onSubmit={handleSubmit}>
                        <Input
                            placeholder='Enter first name'
                            type='text'
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            marginBottom={"15px"}
                        />
                        <Input
                            placeholder="Enter your email"
                            name='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            marginBottom={"15px"}
                        />
                        <Input
                            placeholder="Enter your password"
                            name='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            marginBottom={"15px"}
                        />

                        <select
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                            style={{ marginBottom: '15px', padding: '8px', borderRadius: '4px' }}
                        >
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>

                        {error && <p style={{ color: "red" }}> {error} </p>}
                        <motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='w-full px-4 py-3 my-3 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
							type='submit'
                           
						>
							{isLoading ? <Loader className='mx-auto size-6 animate-spin' /> : "Register"}
						</motion.button>
                            <div>Already have an account?
                                <Link to={"/login"} style={{ color: "gray" }}>
                                    &nbsp;Login
                                </Link>
                            </div>
                      
                    </form>
                </VStack>
            </Box>
        </Container>
    );
};

export default RegisterPage;
