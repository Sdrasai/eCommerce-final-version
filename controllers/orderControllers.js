const { AppError } = require('../providers');
const { OrderService, CartService } = require('../services');
const axios = require('axios');
require('dotenv').config();

const orderService = new OrderService();
const cartService = new CartService();

async function createOrder(req, res){
    const productsInCart = await cartService.getAllProductInUserCart(req.user.userId);
    if (productsInCart.length === 0){
        throw new Error('no item in cart!');
    }
    const cart = await cartService.getCartByUserId(req.user.userId);
    await cartService.deleteAllItemsInCart(cart.cartId);
    const totalPriceArr = productsInCart.map((val) => {return val.product.price * val.count});
    const totalPrice = totalPriceArr.reduce((prev, curr) => {return prev + curr;}, 0);
    const orderProducts = productsInCart.map((val) => ({
        productId: val.productId,
        price: val.product.price,
        count: val.count
    }));
    const order = await orderService.createOrder(req.user.userId, totalPrice, orderProducts);
    res.send(order);
}

async function myActiveOrders(req, res){
    const allOrders = await orderService.getUserAllActiveOrders(req.user.userId);
    res.status(200).send(allOrders);
}

async function specificOrder(req, res){
    const specific = await orderService.getSpecificOrderById(req.params.orderId, req.user.userId);
    res.status(200).send(specific);
}

async function deleteOrder(req, res){
    await orderService.deleteOrder(req.params.orderId, req.user.userId);
    res.status(204).send('succesfully deleted!');
}

async function pay(req, res){
    const order = await orderService.getSpecificOrderById(req.params.orderId, req.user.userId);
    let info;
    await axios.post(process.env.CHECKOUT_URL, {
        "merchant": "zibal",
        "amount": +order.totalPrice,
        "callbackUrl": "http://localhost:3000/api/order/",
        "orderId": order.orderId
      })
      .then(function (response) {
        info = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

      await axios.get(`https://gateway.zibal.ir/start/${info.trackId}`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

}

async function checkOut(req, res){
    const { success, status, trackId, orderId } = req.query;
    let verify;
    if (success){
        await axios.post("https://gateway.zibal.ir/v1/verify",
        {
            "merchant": "zibal",
            "trackId": trackId
        })
        .then(function (response) {
            verify = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
    } else {
        throw new AppError('payment not verified!', 401);
    }

    if (verify.result === 100){
        await orderService.changeOrderStatus(verify.orderId, "Paid");
        const order = await orderService.getSpecificOrderById(verify.orderId);
        res.send(order)
    } else {
        await orderService.changeOrderStatus(verify.orderId, "FailedToPay");
        const order = await orderService.getSpecificOrderById(verify.orderId);
        res.send(order);
    }
}

module.exports = {
    createOrder,
    myActiveOrders,
    specificOrder,
    deleteOrder,
    pay,
    checkOut
}