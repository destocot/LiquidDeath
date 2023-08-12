const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, './client/dist')));
app.use(express.json());

// routers
const QuestionAndAnswersRoutes = require('./server/Routers/qanda-routes');
const productRouter = require('./server/Routers/products-routes');
const reviewsRouter = require('./server/Routers/reviews-routes');

// routes
app.use('/qa/questions', QuestionAndAnswersRoutes);
app.use('/products', productRouter);
app.use('/reviews', reviewsRouter);

// added port into .env
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening at port http://localhost:${port}`);
});
