const db = require('./db.js');
// const { hashPassword } = require('.//utilities')
// const { CartService, ProfileService } = require('./services');

const authentication = require("./middlewares/authenticationMiddleware");

// const cartService = new CartService();
// const profileService = new ProfileService();

// // async function addtoCart(cartId, productId, count){
// //     await db.productToCart.create({
// //         data: {
// //             cartId,
// //             productId,
// //             count
// //         }
// //     })
// // }

// async function superUser(){
//     const password = "1234"
//     const createdUser = await db.user.create({data: {
//         userName: "Sepehr",
//         password: await hashPassword(password),
//         email: "Sepehr@gmail.com",
//         role: "Owner"
//     }})
//     await cartService.createCart(createdUser.userId);
//     await profileService.createProfile(createdUser.userId);
// }

// superUser(); // manually add the superadmin