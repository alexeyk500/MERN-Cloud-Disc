const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  console.log('запускаю - authMiddleware')
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({message: 'Auth Error'})
    }
    req.user = jwt.verify(token, config.get('secretKey'))
    next()
  } catch (e) {
    return res.status(401).json({message: 'Auth Middleware Error'})
  }

}