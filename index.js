const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { products } = require("./data");
const logger = require("./logger");

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  res.json(products);
});

app.get("/users/:productId", (req, res) => {
  const { productId } = req.params;
  console.log("route reached");
  const newProduct = products.find((product) => {
    return product.id === Number(productId);
  });
  if (!newProduct) {
    res.status(404).send("404 not found");
  }
  res.json(newProduct);
});

app.get("/users/:productId/review/:reviewId", (req, res) => {
  console.log(req.params);
  res.send("hello");
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProduct = [...products];

  if (search) {
    sortedProduct = sortedProduct.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    sortedProduct = sortedProduct.slice(0, Number(limit));
  }
  if (sortedProduct < 1) {
    res.status(200).send("your product cannot be found");
  }
  res.status(200).json(sortedProduct);
});

// app.get("/users/singkat", (req, res) => {
//   const newItem = products.map((product) => {
//     const { id, name, image } = product;
//     return { id, name, image };
//   });
//   console.log("hello");
//   res.json(newItem);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
