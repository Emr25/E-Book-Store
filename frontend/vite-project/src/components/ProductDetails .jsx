import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../redux/BasketSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                setError("Ürün getirilemedi");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToBasket({ ...product, count: parseInt(count) }));
        }
    };

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="product-details p-4 max-w-3xl mx-auto">
            <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-64 object-contain mb-4"
                />
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-xl font-semibold mb-4">Fiyat: {product.price} TL</p>
                <div className="mb-4 flex items-center">
                    <label htmlFor="count" className="mr-2 font-medium">Adet:</label>
                    <input
                        type="number"
                        id="count"
                        min="1"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded"
                    />
                </div>
                <button
                    onClick={handleAddToCart}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Sepete Ekle
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
