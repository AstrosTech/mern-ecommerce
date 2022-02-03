module.exports.toCent = (amount) => {
    const str = amount.toString()
    const int = str.split('.')

    return Number(amount.toFixed(2).replace('.', '').padEnd(int.length === 1 ? 3 : 4, '0'))
}

module.exports.formatCart = async (cart) => {
    let price = cart[0].priceId
    let newCart = [{ price, quantity: 1 }]

    if(cart.length == 1) return newCart

    cart.shift()
    for(item of cart) {
        let checkNewCart = newCart.find(cartItem => cartItem.price == item.price)
        if(checkNewCart) return checkNewCart.quantity++

        let itemPrice = item.priceId
        newCart.push({ price: itemPrice, quantity: 1 })
    }
    
    return newCart
}