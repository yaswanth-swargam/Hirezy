import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const token=  req.cookies.token;

        if(!token){
            return res.status(401).json({
                message: "Unothorised : token missing"
            })
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = payload;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token"
        });
    }
};

export default auth;
