import jwt from 'jsonwebtoken'

export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET || 'awd')
}

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'awd', {
        expiresIn: '1h',
    });
};