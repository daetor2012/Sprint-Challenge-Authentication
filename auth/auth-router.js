const router = require('express').Router();
const db = require("./auth-model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const restrict = require("./authenticate-middleware")

router.post('/register', async (req, res, next) => {
  try {
    const { username } = req.body
    const user = db.findBy({ username }).first()

    if(!user) {
      return res.status(409).json({ message: "User already exists" })
    }
    
    res.status(201).json(await db.add(req.body))
    
  } catch(err) {
      next(err)
  }
});

router.post('/login', async (req, res, next) => {
    const authError = {
      message: "You shall not pass!"
    }
    try {
      const { username, password } = req.body
      const user = await db.findBy({ username }).first()
      if(!user) {
        return res.status(401).json(authError)
      }
      const passwordValid = await bcrypt.compare(password, user.password)
      if(!passwordValid) {
        return res.status(401).json(authError)
      }
      const payload = {
        userId: user.id
      }
      const token = jwt.sign(payload, "hello there")
      res.cookie("token", token)
      res.json({
        message: `Welcome ${user.username}`,
        token: token
      })
    } catch(err) {
      next(err)
    }
});

router.get("/", restrict(), async (req, res, next) => {
  try {
    const retrieve = await db.find()
    res.status(200).json(retrieve)
  } catch(err) {
    next(err)
  }
})

module.exports = router;
