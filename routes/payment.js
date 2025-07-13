// // // const path = require('path');
// // // const express = require('express');
// // // const router = express.Router();

// // // module.exports = router;
// // const express = require('express');
// // const router = express.Router();
// // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// // router.post('/checkout', async (req, res) => {
// //     const session = await stripe.checkout.sessions.create({
// //         payment_method_types: ['card'],
// //         line_items: [{
// //             price_data: {
// //                 currency: 'inr',
// //                 product_data: { name: req.body.location },
// //                 unit_amount: req.body.amount * 100,
// //             },
// //             quantity: 1,
// //         }],
// //         mode: 'payment',
// //         success_url: 'http://localhost:3000/user/confirmation',
// //         cancel_url: 'http://localhost:3000/user/home',
// //     });

// //     res.redirect(303, session.url);
// // });
// const express = require('express');
// const router = express.Router();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// router.post('/checkout', async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [{
//             price_data: {
//                 currency: 'inr',
//                 product_data: { name: req.body.location },
//                 unit_amount: req.body.amount * 100,
//             },
//             quantity: 1,
//         }],
//         mode: 'payment',
//         success_url: 'http://localhost:3000/user/confirmation',
//         cancel_url: 'http://localhost:3000/user/home',
//     });

//     res.redirect(303, session.url);
// });

// module.exports = router;
