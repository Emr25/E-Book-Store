const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Email kontrolü
        const userExist = await User.findOne({ email });
        if (userExist)
            return res.status(400).json({ message: 'Bu email zaten kayıtlı.' });

        // Şifreyi hash'leme
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yeni kullanıcı oluşturma
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Token oluşturma
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        // Response
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Register Error:", error); // veya login/me için de benzeri
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcıyı bulma
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'Kullanıcı bulunamadı' });

        // Şifreyi kontrol etme
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Şifre yanlış' });

        // Token oluşturma
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        // Response
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

// Me (User info with token)
const me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

module.exports = {
    register,
    login,
    me,
};
