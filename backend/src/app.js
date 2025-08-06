import express from "express";
import Product from "./models/product.model.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors()); // Conect with the frontend. Delete cors error.
app.use(express.json());

// Endpoint GET (create a route to get the products)
app.get("/products", async (req, res) => {
  const product = await Product.find();
  res.json(product);
});

// Endpoint POST (create a route to create a product)
app.post("/products", async (req, res) => {
  // Receive the data from the body (frontend)
  const { name, price, description } = req.body;

  // Save the data in the database
  const newProduct = await Product.create({ name, price, description });

  // Send the data to the frontend
  res.json(newProduct);
});

// Endpoint DELETE (create a route to delete a product)
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  res.json(product);
});

// Endpoint PUT (create a route to update a product)
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const product = await Product.findByIdAndUpdate(
    id,
    { name, price, description },
    { new: true }
  );
  res.json(product);
}); 

export default app;
