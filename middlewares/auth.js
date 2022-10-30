const isAuthed = (req, res, next) => {
    if (req.header('Authorization') === 'token123') next()
    res.status(401).json({ message: 'Wrong authorization' })
}

export default isAuthed