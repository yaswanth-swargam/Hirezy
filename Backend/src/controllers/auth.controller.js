import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // check if user already exists
        const [existing] = await pool.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                message: "User already exists with this email"
            });
        }

        const hashed_pass = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users (name, email, password_hash, role)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await pool.query(query, [
            name,
            email,
            hashed_pass,
            role || "job_seeker"
        ]);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: result.insertId,
                name,
                email,
                role: role || "job_seeker"
            }
        });

    } catch (error) {
        console.error("Register error:", error.message);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
    const { email, password } = req.body; // ✅ FIXED

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const [rows] = await pool.query(
            "SELECT id, name, email, password_hash, role FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = rows[0];

        // ✅ correct bcrypt comparison
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.cookie('token',token,{
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 24* 60* 60* 1000
        })

        return res.status(200).json({
            message: "User Logged in successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (err) {
        console.error("Login error:", err.message);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


export const logout=(req,res)=>{
    try{
        res.clearCookie('token');
        res.status(200).send({
            message: 'logout successfully'
        })
    }
    catch(e){
        res.status(501).send({
            message: "internal error"
        })
    }
}



export const verifyToken=(req,res)=>{
    return res.status(200).json({
        user: req.user
    })
}