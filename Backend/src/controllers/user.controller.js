import pool from '../config/db.js'

export const currentUser=async (req,res)=>{
    const userId=req.user.id;

    try{
        const [rows]=await pool.query(`select id,name,email,role from users where id=?`,[userId]);

        if(rows.length===0){
            return res.status(404).json({
                message: "User not Found"
            })
        
        
        }

        res.status(200).json({
            user: rows[0]
        })
    }

    catch(error){
        console.log("Profile error:",error.message);
        res.status(500).json({
            message: "Internal Server error"
        })
    }



}


export const updateRole = async (req, res) => {
    const userId = req.user.id
    const { role } = req.body

    try {
        if (!role) {
            return res.status(400).json({
                message: "Role is required"
            })
        }

        await pool.query(
            "UPDATE users SET role = ? WHERE id = ?",
            [role, userId]
        )

        return res.status(200).json({
            message: "Role updated successfully",
            role
        })

    } catch (error) {
        console.error("Update role error:", error.message)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}