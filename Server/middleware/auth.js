import jwt from 'jsonwebtoken';

const auth= (req, res, next) => {
    const token = req.headers.authorization;
    try{
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
}
export default auth;