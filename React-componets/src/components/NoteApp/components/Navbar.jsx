import React from 'react'
import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    useColorMode
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import userIcon from '/assets/img/user.png'
import { LOGOUT } from '../redux/users/user_types';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const nav = useNavigate();
    const dispatch = useDispatch();

    const { auth, user, token, loading, error } = useSelector((state) => state.userReducer);

    let handleLogout = () => {
        dispatch({ type: LOGOUT })
        toast.success("Log out Successfully", {
            position: "top-right"
        });
    }

    return (
        <>
            <Box zIndex={"9999"} top={0} position={"fixed"} w={"100%"} boxShadow={"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"} bg={"#5b9cf2"} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box fontWeight={"bold"} cursor={'pointer'} onClick={() => {
                        nav("/project/9/")
                    }}>Daily Journal</Box>
                    <Flex alignItems={'center'}>
                        <Stack alignItems={'center'} direction={'row'} spacing={7}>
                            <Button display={"block"} bg={"#01d8fb"} onClick={() => {
                                nav("/project/9/notes")
                            }}>All Notes
                            </Button>
                            {!token &&
                                <>
                                    <Button display={"block"} bg={"#01d8fb"} onClick={() => {
                                        nav("/project/9/login")
                                    }}>Log In
                                    </Button>
                                    <Button display={"block"} bg={"#01d8fb"} onClick={() => {
                                        nav("/project/9/register")
                                    }}>Sign Up
                                    </Button>
                                </>
                            }
                            <Button bg={"#01d8fb"} onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            <Menu>
                                <MenuButton display={auth ? "block" : "none"}
                                    as={Button}
                                    border="2px solid #5b9cf2"
                                    padding={2}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}
                                >
                                    <Avatar
                                        size={'sm'}
                                        src={userIcon}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'lg'}
                                            src={userIcon}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>{user}</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem onClick={handleLogout}>Logout
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>

        </>
    )
}

export default Navbar
