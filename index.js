const express = require("express");
const app = express();
const port = 4002;
const { products } = require('./data');

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  res.json(products);
});

app.get("/users/:productId", (req, res) => {
  const { productId } = req.params;
  console.log('route reached')
  const newProduct = products.find((product) => {
    return product.id === Number(productId);
  });
  if (!newProduct) {
    res.status(404).send("404 not found");
  }
  res.json(newProduct);
});

app.get("/users/singkat", (req, res) => {
  const newItem = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  console.log('hello')
  res.json(newItem);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
