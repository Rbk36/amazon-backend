// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();
// const stripe = require("stripe")(process.env.STRIPE_KEY);

// const app = express();

// // app.use(cors({ origin: true }));
// app.use(
//   cors({
//     origin: "https://symphonious-vacherin-6464d9.netlify.app",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(express.json());
// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "success",
//   });
// });

// app.post("/payment/create", async (req, res) => {
//   const total = req.query.total;
//   if (total > 0) {
//     // console.log("Payment successful ", total);
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: total,
//       currency: "USD",
//     });
//     res.status(201).json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } else {
//     res.status(403).json({
//       message: "Total must be greater than 0",
//     });
//   }
// });

// app.listen(5000, (err) => {
//   if (err) throw err;
//   console.log("Amazon running at http://localhost:5000");
// });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

app.use(
  cors({
    origin: "https://symphonious-vacherin-6464d9.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

app.post("/payment/create", async (req, res) => {
  try {
    const total = parseInt(req.query.total, 10);

    if (!total || total <= 0) {
      return res
        .status(400)
        .json({ message: "Total must be a positive number" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "USD",
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Amazon backend running on port ${PORT}`);
});
