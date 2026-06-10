import express from 'express'
import cors from 'cors'
import auth from './middlewares/middleware.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import './config/db.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import jobRoutes from './routes/jobs.routes.js'
import savedJobRoutes from './routes/savedJobs.routes.js'
const app=express()

app.use(cors({
    // origin: 'http://localhost:5173',
    origin: 'https://hirezy-three.versal.app',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))


app.get('/',(req,res)=>{
    res.send("server running...")
})

app.use('/api/auth',authRoutes)


app.use('/api/users',userRoutes)

app.use('/api/jobs',jobRoutes)

app.use('/api/saved-jobs',savedJobRoutes)
export default app;