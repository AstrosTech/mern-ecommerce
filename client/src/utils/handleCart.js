
module.exports.handleCart = (cart) => {
    let newCart = [{ id: cart[0]._id, name: cart[0].name, imageUrl: cart[0].imageURL, price: cart[0].price, quantity: 1, description: cart[0].description }]
    if(cart.length === 1) return newCart

    cart = cart.slice(1)
    for(const item of cart) {
        let checkNewCart = newCart.find(cartItem => cartItem.price === item.price)
        if(checkNewCart) {
            checkNewCart.quantity++
            continue
        }
        newCart.push({ id: item._id, name: item.name, imageUrl: item.imageURL, price: item.price, quantity: 1, description: item.description })
    }

    return newCart
}