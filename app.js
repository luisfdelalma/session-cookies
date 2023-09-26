const express = require('express')
// const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const port = 8080

// app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())

//Ruta para la vista

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html")
// })

// //Ruta para manejar el POST
// app.post("/setCookie", (req, res) => {
//     const user = req.body
//     res.cookie("user", user, { maxAge: 50000 }).send("Cookie creada")
// })

// app.get("/setCookie", (req, res) => {
//     res.cookie("coderCookie", "Cookie en mi navegador", { maxAge: 10000, signed: true }).send("Cookie")
// })

// app.get("/getCookie", (req, res) => {
//     const userCookie = req.cookies.user
//     console.log("My cookie", userCookie);
//     res.send("Cookie mostrada en consola")
// })

// app.get("/deleteCookie", (req, res) => {
//     res.clearCookie("coderCookie").send("Cookie eliminada")
// })

// ------------------------------------------------------------------------------------------------------------
// LOGIN

app.use(session({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true
}))

app.get("/session", (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`Cantidad de visitas: ${req.session.counter}`)
    } else {
        req.session.counter = 1
        res.send("Mensaje de bienvenida")
    }
})

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.send("Logout")
        } else { res.send("Error al intentar salir") }
    })
})

app.get("/login", (req, res) => {
    const { username, password } = req.query
    if (username !== "Andres" || password !== "AndresCoder") {
        return res.send("Nombre de usuario o contraseña inválido")
    }
    req.session.user = username
    req.session.admin = true
    res.send("Acceso satisfactorio")
})

function auth(req, res, next) {
    if (req.session?.user === "Andres" && req.session?.admin) {
        return next()
    } else {
        return res.status(401).send("Error de autenticacion")
    }
}

app.get("/provate", auth, (req, res) => {
    res.send("Eres el admin")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
