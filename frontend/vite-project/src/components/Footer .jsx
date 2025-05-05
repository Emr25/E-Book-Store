import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#fefae0] text-[#081c15] py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-[#2d6a4f] mb-4">Kitap Dünyası</h2>
                    <p className="text-sm">
                        Kitaplar, bilgi ve ilhamın birleşimidir. Biz burada, okuma yolculuğunuzda size eşlik etmek için varız.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-[#2d6a4f] mb-3">Kurumsal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-[#2d6a4f] transition">Hakkımızda</a></li>
                        <li><a href="#" className="hover:text-[#2d6a4f] transition">Kariyer</a></li>
                        <li><a href="#" className="hover:text-[#2d6a4f] transition">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-[#2d6a4f] mb-3">İletişim</h3>
                    <p className="text-sm">
                        Email: info@kitapdunyasi.com <br />
                        Tel: +90 123 456 78 90 <br />
                        Adres: İstanbul, Türkiye
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-[#2d6a4f] mb-3">Bizi Takip Edin</h3>
                    <div className="flex space-x-4 text-xl text-[#2d6a4f]">
                        <a href="#" className="hover:text-[#40916c] transition"><FaFacebookF /></a>
                        <a href="#" className="hover:text-[#40916c] transition"><FaTwitter /></a>
                        <a href="#" className="hover:text-[#40916c] transition"><FaInstagram /></a>
                    </div>
                </div>
            </div>
            <div className="mt-10 text-center text-sm text-[#081c15] border-t border-[#b7e4c7] pt-4">
                &copy; 2025 Kitap Dünyası. Tüm hakları saklıdır.
            </div>
        </footer>
    );
};

export default Footer;
