import jsonwebtoken from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jsonwebtoken.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"30d"
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: "production",
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};

export default generateToken;