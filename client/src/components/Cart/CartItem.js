import { CloseButton, Flex, Link, Select, useColorModeValue } from '@chakra-ui/react'
import { PriceTag } from './PriceTag'
import { CartProductMeta } from './CartProductMeta'
import { useMutation } from '@apollo/client'
import { REMOVE_ALL_FROM_CART } from '../../utils/mutations'
import { handleCart } from '../../utils/handleCart'
import Auth from '../../utils/auth'

// const CartItemProps = {
//   isGiftWrapping?: boolean,
//   name: string,
//   description: string,
//   quantity: number,
//   price: number,
//   currency: string,
//   imageUrl: string,
//   onChangeQuantity?: (quantity) => {
      
//   },

//   onClickGiftWrapping?: () => {
      
//   },
//   onClickDelete?: () => {
      
//   }
// }

const QuantitySelect = (props) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  )
}

export const CartItem = ({
    id,
    name,
    description,
    quantity,
    imageUrl,
    price,
    onChangeQuantity
  }) => {

  let accountId = Auth.getAccount().data._id
  const [removeFromCart, { loading, data }] = useMutation(REMOVE_ALL_FROM_CART, {
        variables: { accountId, productId: id },
    });

    // useEffect(() => {
    //     if(!loading && data) {
    //         const cart = Object.values(data)[0].cart

    //         let newCart = handleCart(cart)
    //         props.handleCartChange(newCart, newCart.map(item => item.price).reduce((prev, next) => prev + next))
    //     }
    // }, [data])

  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
      <CartProductMeta
        name={name}
        description={description}
        image={imageUrl}
      />

      {/* Desktop */}
      <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value)
          }}
        />
        <PriceTag price={price}/>
        <CloseButton aria-label={`Delete ${name} from cart`} onClick={removeFromCart} />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: 'flex', md: 'none' }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value)
          }}
        />
        <PriceTag price={price} />
      </Flex>
    </Flex>
  )
}