import express from 'express'
import auth from '../middlewares/middleware.js'
import { currentUser, updateRole } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/me', auth, currentUser)
router.put('/update-role', auth, updateRole)

export default router