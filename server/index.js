require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

// GET catalog
app.get('/api/products', (req, res, next) => {
  const sql = `
  SELECT "productId", "name", "price", "image", "shortDescription"
  FROM "products"
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

// GET product detail by productId
app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    res.status(400).send({ error: 'Id must be a positive integer.' });
  }
  const sql = `
  SELECT "productId", "name", "price", "image", "shortDescription", "longDescription"
  FROM "products"
  WHERE "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        return next(new ClientError('No result found.', 404));
      }
      return res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

// GET cart
app.get('/api/cart', (req, res, next) => {
  if (req.session.cartId) {
    const sql = `
    select "c"."cartItemId",
    "c"."price",
    "p"."productId",
    "p"."image",
    "p"."name",
    "p"."shortDescription"
    from "cartItems" as "c"
    join "products" as "p" using ("productId")
    where "c"."cartId" = $1
    `;
    const value = [req.session.cartId];
    db.query(sql, value)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => next(err));
  } else {
    res.json([]);
  }
});

// POST item to cart
app.post('/api/cart', (req, res, next) => {
  if (!Number.isInteger(parseInt(req.body.productId), 10) || req.body.productId <= 0) {
    return next(new ClientError('Id must be a positive integer.', 400));
  }
  const sqlProduct = `
  SELECT "productId"
  FROM "products"
  WHERE "productId" = $1
  `;
  const id = [req.body.productId];
  db.query(sqlProduct, id)
    .then(result => {
      if (!result.rows.length) {
        return next(new ClientError(`Product ${req.body.productId} not found`, 400));
      }
      if (req.session.cartId) {
        return { cartId: req.session.cartId, price: req.body.price };
      } else {
        const sqlCart = `
        INSERT INTO "carts" ("cartId", "createdAt")
        VALUES (default, default)
        RETURNING "cartId"
        `;
        return db.query(sqlCart)
          .then(result => {
            return { cartId: result.rows[0].cartId, price: req.body.price };
          });
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const sqlCartItem = `
      INSERT INTO "cartItems" ("cartId", "productId", "price")
      VALUES ($1, $2, $3)
      RETURNING "cartItemId"
      `;
      const values = [req.session.cartId, req.body.productId, Number(req.body.price)];
      return db.query(sqlCartItem, values)
        .then(result => {
          return { cartItemId: result.rows[0].cartItemId };
        });
    })
    .then(result => {
      req.session.cartItemId = result.cartItemId;
      const sqlFinalCart = `
      SELECT "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
      FROM "cartItems" as "c"
      JOIN "products" as "p" using ("productId")
      WHERE "c"."cartItemId" = $1
      `;
      const cartItemId = [req.session.cartItemId];
      db.query(sqlFinalCart, cartItemId)
        .then(result => {
          res.status(201).json(result.rows[0]);
        });
    })
    .catch(err => next(err));
});

// Checkout Cart
app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    return next(new ClientError(`Cart ${req.session.cartId} is empty or not exist.`, 400));
  }
  if (!req.body.name) {
    return next(new ClientError('Name is a required field.', 400));
  }
  if (!req.body.creditCard) {
    return next(new ClientError('Credit card number is a required field.', 400));
  }
  if (!req.body.shippingAddress) {
    return next(new ClientError('Shipping address is a required field.', 400));
  }
  const sql = `
  INSERT INTO "orders" ("cartId", "name", "creditCard", "shippingAddress")
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `;
  const values = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
  db.query(sql, values)
    .then(result => {
      res.status(201).json(result.rows[0]);
      req.session.destroy();
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
