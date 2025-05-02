const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
    const { title, price, image, description } = req.body;

    try {
        const newProduct = new Product({
            title,
            price,
            image,
            description,
            createdBy: req.user.id,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: "Error creating product", error: err });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Error fetching products", error: err });
    }
};
