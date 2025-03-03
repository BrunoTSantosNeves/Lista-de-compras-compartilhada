export const jwtConstants = {
    secret: process.env.JWT_SECRET, // Pegando do .env
    expiresIn: '1h', // Expiração do token
};