import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/AuthSlice';

const Register = () => {
    const [username, setUsername] = useState(""); // 👈 yeni eklendi
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, status } = useSelector((store) => store.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Şifreler eşleşmiyor");
            return;
        }

        // 👇 username de gönderiliyor artık
        dispatch(registerUser({ username, email, password })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                alert("Başarıyla Üye Oldunuz");
                navigate("/");
            }
        });
    };

    return (
        <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Üye Ol</h2>
                    {status === 'failed' && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            {JSON.stringify(error)}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 py-6">
                        {/* 👇 username input */}
                        <div className="mb-4">
                            <label htmlFor="formBasicUsername" className="block text-gray-700 font-bold mb-2">Kullanıcı Adı</label>
                            <input
                                id="formBasicUsername"
                                type="text"
                                placeholder="Kullanıcı adı girin"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="formBasicEmail" className="block text-gray-700 font-bold mb-2">Email adresi</label>
                            <input
                                id="formBasicEmail"
                                type="email"
                                placeholder="Email girin"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="formBasicPassword" className="block text-gray-700 font-bold mb-2">Şifre</label>
                            <input
                                id="formBasicPassword"
                                type="password"
                                placeholder="Şifre"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-4">
                            <label htmlFor="formBasicConfirmPassword" className="block text-gray-700 font-bold mb-2">Şifreyi Onayla</label>
                            <input
                                id="formBasicConfirmPassword"
                                type="password"
                                placeholder="Şifreyi Onayla"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Üye Ol
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
