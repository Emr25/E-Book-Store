import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/AuthSlice';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        await dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <header className="bg-[#1b4332] text-white shadow-md sticky top-0 z-50 w-full">
            <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-[#95d5b2] tracking-wide">
                    YeşilKitap
                </Link>

                {/* Menü */}
                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-[#d8f3dc] transition">Ana Sayfa</Link>
                    <Link to="/categories" className="hover:text-[#d8f3dc] transition">Kategoriler</Link>
                    <Link to="/about" className="hover:text-[#d8f3dc] transition">Hakkımızda</Link>
                    <Link to="/contact" className="hover:text-[#d8f3dc] transition">İletişim</Link>
                </nav>

                {/* Sağ kısım */}
                <div className="flex items-center space-x-4">
                    <Link to="/card" className="hover:text-[#95d5b2] transition">
                        <FaShoppingCart size={20} />
                    </Link>

                    {user ? (
                        <>
                            <Link
                                to="/profile"
                                className="bg-[#95d5b2] text-[#1b4332] hover:bg-[#b7e4c7] font-semibold px-3 py-1.5 rounded-md text-sm"
                            >
                                Profilim
                            </Link>
                            <button
                                onClick={logout}
                                className="bg-[#d00000] hover:bg-[#9d0208] text-white px-3 py-1.5 rounded-md text-sm"
                            >
                                Çıkış
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-[#fefae0] text-[#1b4332] hover:bg-[#e9edc9] font-semibold px-3 py-1.5 rounded-md text-sm"
                            >
                                Giriş Yap
                            </Link>
                            <Link
                                to="/register"
                                className="bg-[#95d5b2] hover:bg-[#b7e4c7] text-[#1b4332] font-semibold px-3 py-1.5 rounded-md text-sm"
                            >
                                Kayıt Ol
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>

    );
};

export default Header;
