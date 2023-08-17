const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, './client/dist')));
app.use(express.json());

// routers
const QuestionAndAnswersRoutes = require('./server/Routers/qanda-routes');
const productRouter = require('./server/Routers/products-routes');
const reviewsRouter = require('./server/Routers/reviews-routes');
const cartRouter = require('./server/Routers/cart-routes');

// routes
app.use('/qa', QuestionAndAnswersRoutes);
app.use('/products', productRouter);
app.use('/reviews', reviewsRouter);
app.use('/cart', cartRouter);

// added port into .env
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening at port http://localhost:${port}`);
});
