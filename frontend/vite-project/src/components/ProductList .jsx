import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../redux/productSlice';
import Footer from './Footer ';

const ProductList = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllProducts()).then(() => setLoading(false));
    }, [dispatch]);

    const handleProductClick = (productId) => {
        navigate(`/product-details/${productId}`);
    };

    return (
        <div className="bg-[#fefae0] min-h-screen pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-center text-4xl font-serif text-[#1b4332] mt-10">
                    Kitap Koleksiyonumuz
                </h1>
                <hr className="my-6 border-[#b7e4c7]" />

                {loading && (
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#d8f3dc] border border-[#95d5b2] text-[#1b4332] px-6 py-3 rounded-md shadow-md">
                            Ürünler Yükleniyor...
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 mt-10 pb-20">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300 border border-[#d8f3dc] flex flex-col"
                        >
                            <img
                                className="w-full h-72 object-cover"
                                src={product.imageUrl}
                                alt={product.name}
                            />
                            <div className="p-5 text-[#081c15] flex flex-col flex-grow">
                                <h2 className="text-2xl font-bold text-[#2d6a4f] mb-2 leading-snug">
                                    {product.name}
                                </h2>
                                <p className="text-sm mb-3 text-gray-600 flex-grow">
                                    <span className="font-semibold text-[#40916c]">Fiyat:</span>{' '}
                                    <span className="text-[#1b4332]">{product.price} TL</span>
                                </p>
                                <button
                                    onClick={() => handleProductClick(product._id)}
                                    className="mt-auto w-full bg-[#95d5b2] hover:bg-[#74c69d] text-[#1b4332] font-semibold py-2 rounded-md transition"
                                >
                                    İncele & Satın Al
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductList;
