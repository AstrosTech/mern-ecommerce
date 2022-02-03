import React, { useState } from 'react';
import {SimpleGrid, Box, Flex, Spacer, Wrap} from '@chakra-ui/react'
import Header from '../components/Nav2.0/header'
import Hero from '../components/hero';
import Product from '../components/product-card'
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

const Homepage = () => {
    return (

       <main>
           <div>
               <Box>
                   <Header/>
               </Box>
                <Spacer />

                <Box>
                    <Hero/>
                </Box>
                <Spacer />

               <Box>
                    <SimpleGrid minChildWidth='12px' spacing='10px'>

                        <Box bg='white' height='80px'>
                            <Product.ProductAddToCart/>
                        </Box>

                        <Box bg='white' height='80px'>
                            <Product.ProductAddToCart/>
                        </Box>

                        <Box bg='white' height='80px'>
                            <Product.ProductAddToCart/>
                        </Box>

                        <Box bg='white' height='80px'>
                            <Product.ProductAddToCart/>
                        </Box>
                    </SimpleGrid>
               </Box>
           </div>
       </main>
    )
};


 export default Homepage;                                                                                                                                                      