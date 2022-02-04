import {
    Box,
    Flex,
    Heading,
    HStack,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { CartItem } from '../components/Cart/CartItem'
import { CartOrderSummary } from '../components/Cart/CartOrderSummary'
import Auth from '../utils/auth'
import { GET_ACCOUNT } from '../utils/queries'
import { handleCart } from '../utils/handleCart'

const Cart = () => {
    let accountId = Auth.getAccount().data._id
    const { loading, data } = useQuery(GET_ACCOUNT, {
        variables: { accountId },
    });
    
    const [currentCart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    

    useEffect(() => {
        if(!loading && data) {

            let cart = Object.values(data)[0].cart
            if(!cart || cart.length < 1) return

            let newCart = handleCart(cart)

            setCart(newCart)
            setTotal(newCart.map(item => item.price).reduce((prev, next) => prev + next))
        }
    }, [data])

    return (
    <Box
        maxW={{ base: '3xl', lg: '7xl' }}
        mx="auto"
        px={{ base: '4', md: '8', lg: '12' }}
        py={{ base: '6', md: '8', lg: '12' }}
    >   
        <Stack
                direction={{ base: 'column', lg: 'row' }}
                align={{ lg: 'flex-start' }}
                spacing={{ base: '8', md: '16' }}
            >

            <Stack spacing={{ base: '8', md: '10' }} flex="2">
                <Heading fontSize="2xl" fontWeight="extrabold">
                    Shopping Cart ({currentCart.length || 0} items)
                </Heading>
                {(currentCart && currentCart.length > 0) ? currentCart.map((item) => ( <CartItem key={item.id} {...item} />)) : 
                <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
                    Your cart is currently empty.
                </Text>}
            </Stack>

            <Flex direction="column" align="center" flex="1">
                <CartOrderSummary amount={total}/>
                <HStack mt="6" fontWeight="semibold">
                    <Link href="/" color={mode('blue.500', 'blue.200')}>Continue Shopping</Link>
                </HStack>
            </Flex>
        </Stack>
    </Box>
    )
}

export default Cart
