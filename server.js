import express from "express"
import router from "./routes/auth.js"

const app = express()

app.use(express.json()) // json parser

app.listen(5000, () => console.log(`Server is running on port 5000`))

app.use('/', router)