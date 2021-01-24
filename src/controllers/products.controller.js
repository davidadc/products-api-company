import Product from '../models/Product';

export const createProduct = async (req, res) => {
  // res.json('CREATE Products.');
  const { body } = req;

  try {
    const product = new Product(body);
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (e) {
    console.log(e.message);
    res.status(500).json(e.message);
  }
};

export const listProducts = async (req, res) => {
  // res.json('READ Products.');
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (e) {
    console.log(e.message);
    res.status(500).json(e.message);
  }
};

export const getProductById = async (req, res) => {
  // res.json('READ Product.');
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    res.status(200).json(product);
  } catch (e) {
    console.log(e.message);
    res.status(500).json(e.message);
  }
};

export const updateProductById = async (req, res) => {
  // res.json('UPDATE Product.');
  const { id } = req.params;
  const { body } = req;

  try {
    const product = await Product.findByIdAndUpdate(id, body, { new: true });

    res.status(200).json(product);
  } catch (e) {
    console.log(e.message);
    res.status(500).json(e.message);
  }
};

export const deleteProductById = async (req, res) => {
  // res.json('DELETE Product.');
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);

    res.status(204).json();
  } catch (e) {
    console.log(e.message);
    res.status(500).json(e.message);
  }
};
