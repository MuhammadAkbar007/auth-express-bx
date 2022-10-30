import { Router } from "express"
import users from '../config/users.js'
import isAuthed from "../middlewares/auth.js"

const router = Router()

const findByUsername = async username => {
    const user = users.filter(user => user.username === username)
    return user[0]
}

router.get('/', (req, res) => res.status(200).json({ message: 'Bismillah', users }))

router.get('/profile', isAuthed, (req, res) => res.status(200).json({ message: 'You are now in your profile' }))

router.post('/login', async (req, res) => {
    const user = await findByUsername(req.body.username)
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })
    if (user.password !== req.body.password) return res.status(400).json({ message: 'Invalid credentials' })
    return res.status(200).json({ message: 'You are logged in', user })
})

router.post('/signup', (req, res) => {
    if (!req.body.username || !req.body.password) return res.status(400).json({ message: 'Please provide username and password' })
    const newUser = { id: new Date().getTime(), username: req.body.username, password: req.body.password }
    users.push(newUser)
    return res.status(201).json({ message: 'Successfully registered', newUser })
})

export default router