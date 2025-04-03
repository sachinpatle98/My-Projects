import React from 'react'
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from '@chakra-ui/react';
import "react-toastify/dist/ReactToastify.css";
import AllRoutes from './routes/AllRoutes'
import Navbar from './components/Navbar'
import './NoteApp.css'

const NoteApp = () => {
  return (
    <ChakraProvider>
    <div className="App">
        <Navbar/>
        <AllRoutes />
        <ToastContainer />
    </div>
    </ChakraProvider>
  )
}

export default NoteApp
