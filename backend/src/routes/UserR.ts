import express from "express";
import { isAuthUser, login, logout, signUp } from "../controller/userAuth";
const router = express.Router();

router.post('/signup', signUp)
router.post('/login', login)
router.get('/', isAuthUser)
router.post('/logout', logout)

export default router;