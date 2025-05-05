import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { completeCart, removeFromCart } from '../redux/BasketSlice';

const SepetCard = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.basket);
    const [order, setOrder] = useState(false);

    const handleDelete = (_id) => {
        dispatch(removeFromCart({ _id }));
    };

    const complete = () => {
        dispatch(completeCart());
        setOrder(true);
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-center text-3xl font-bold mb-8 text-[#1b4332]">Sepetim</h1>

            {order && (
                <div className="bg-[#d8f3dc] border border-[#95d5b2] text-[#1b4332] px-4 py-3 rounded relative mb-4 text-center font-medium">
                    Siparişler Oluşturuldu ✔
                </div>
            )}

            {products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div key={index} className="bg-[#fefae0] text-[#1b4332] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 max-w-xs mx-auto">
                            <img
                                className="w-full h-64 object-cover"
                                src={product.imageUrl}
                                alt={product.name}
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-bold">{product.name}</h2>
                                <p className="mt-1">Fiyat: <span className="font-semibold">{product.price} TL</span></p>
                                <p>Adet: {product.count}</p>
                                <p className="font-medium mt-1">Tutar: {product.count * product.price} TL</p>
                                <button
                                    className="bg-[#d00000] hover:bg-[#9d0208] text-white py-1.5 px-4 rounded mt-4 w-full"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Kaldır
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">Sepetinizde kitap yok.</p>
            )}

            {products && products.length > 0 && (
                <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-2xl font-bold text-[#1b4332]">
                        Toplam Tutar:{" "}
                        {products.reduce((total, product) => total + product.count * product.price, 0)} TL
                    </h2>
                    <button
                        className="bg-[#40916c] hover:bg-[#2d6a4f] text-white py-2 px-6 rounded text-lg"
                        onClick={complete}
                    >
                        Siparişi Tamamla
                    </button>
                </div>
            )}
        </div>
    );
};

export default SepetCard;
