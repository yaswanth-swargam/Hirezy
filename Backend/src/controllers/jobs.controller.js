import pool from '../config/db.js'

// export const jobs=async (req,res)=>{
//     const useId=req.user.id;
//     const role=req.user.role;

//     try{
//         const [rows]=await pool.query(`select * from jobs where title like ?`,[`%${role}%`]);

//         // const [rows]=await pool.query(`select * from jobs`)
//         if(rows.length===0){
//             return res.status(404).json({
//                 message: `No job/Intern roles found for ${role} role`
//             })
//         }

//         res.status(200).json({
//             jobs: rows
//         })
//     }
//     catch(e){
//         console.log("Jobs error: ",e.message);
//         return res.status(500).json({
//             message: "Internal server error"
//         })
//     }
// }





export const jobs = async (req, res) => {
    const userId = req.user.id

    try {
        // get fresh role from DB instead of JWT
        const [userRows] = await pool.query(
            `SELECT role FROM users WHERE id = ?`, [userId]
        )

        if (userRows.length === 0) {
            return res.status(404).json({ message: "User not found" })
        }

        const role = userRows[0].role

        const [rows] = await pool.query(
            `SELECT * FROM jobs WHERE title LIKE ?`,
            [`%${role}%`]
        )

        if (rows.length === 0) {
            return res.status(404).json({
                message: `No job/Intern roles found for ${role} role`
            })
        }

        res.status(200).json({ jobs: rows })

    } catch (e) {
        console.error("Jobs error: ", e.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}