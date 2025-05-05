const Product = require('../models/Product');

// Ürün ekle
exports.createProduct = async (req, res) => {

    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: "Ürün eklenemedi", error: err.message });
    }
};

// Tüm ürünleri getir
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Ürünler alınamadı", error: err.message });
    }
};

// Tek ürünü getir
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Ürün alınamadı", error: err.message });
    }
};

// Ürünü güncelle
exports.updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Ürün güncellenemedi", error: err.message });
    }
};

// Ürünü sil
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Ürün silindi" });
    } catch (err) {
        res.status(500).json({ message: "Ürün silinemedi", error: err.message });
    }
};
