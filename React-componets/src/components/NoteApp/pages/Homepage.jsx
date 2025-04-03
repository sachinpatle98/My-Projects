import {
    Button,
    Flex,
    Heading,
    Image,
    Spacer,
    Stack,
    Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import homeBg from '/assets/img/homebg.jpeg'


const Homepage = () => {
    const nav = useNavigate();

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} alignItems={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <Text color={'#5b9cf2'} as={'span'}>
                            📚 Quick Notes
                        </Text>{' '}
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                        Capture meeting notes, project updates, and work-related ideas.
                    </Text>
                    <Stack direction={'row'} spacing={8} align={'center'} alignItems={'center'} justify={'center'}>
                        <Button
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: '#01d8fb',
                            }}
                            onClick={() => {
                                nav("/project/9/login")
                            }}
                        >
                            Log In
                        </Button>
                        <Button rounded={'full'} onClick={() => { nav("/project/9/register") }}>Sign Up</Button>
                    </Stack>
                    <Spacer />
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={homeBg}
                />
            </Flex>
        </Stack>
    )
}

export default Homepage;