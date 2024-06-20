const jwt = require('jsonwebtoken')
const User = require("../models/user.model")

exports.authorization = async (req, res, nxt) => {
  let token = req?.cookies?.token
  if (!token) return res.status(401).send("Not authorized user")
  try {
    const { id } = jwt.verify(token, process.env.SECRET_TOKEN)

    let user = await User.findById(id)
    req.user = user
    nxt()
  } catch (err) {
    console.log(err.message);
    res.status(401).send("Not authorized user");
  }
}

exports.checkOnline = async (req, res, nxt) => {
  let token = req?.cookies?.token
  if (!token) return res.status(401).send("Not authorized user")
  try {
    const { user } = jwt.verify(token, process.env.SECRET_TOKEN)
    req.user = user
    res.send()
  } catch (err) {
    console.log(err.message);
    res.status(401).send("Not authorized user");
  }
}