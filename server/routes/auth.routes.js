const Router = require('express');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, body, validationResult} = require('express-validator');

const router = new Router;

router.post(
  '/registration',
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Password must be longer than 5 symbols and shorter 12 symbols').isLength({min: 5, max: 12}),
  body('email').isEmail().normalizeEmail(),
  body('password').not().isEmpty().trim().escape().isLength({min: 5, max: 12}),
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Incorrect request', errors})
      }

      const {email, password} = req.body;
      console.log('email, password', email, password)
      const candidate = await User.findOne({email})
      console.log('candidate', candidate)

      if (candidate) {
        console.log('send - error with status(400)', ` User with email ${email} already exist`)
        return res.status(400).json({message: `User with email ${email} already exist`})
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = new User({email, password: hashPassword});
      await user.save();
      return res.json({message: 'User was created'})

    } catch (e) {
      res.send({message: 'Server Error'})
    }
  })

router.post(
  '/login',
  async (req, res) => {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email});

      if(!user) {
        return res.status(400).json({message: 'User not found'})
      }
      const isPassValid = bcrypt.compareSync(password, user.password)

      if(!isPassValid) {
        return res.status(400).json({message: 'Invalid Password'})
      }
      const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '4h'});

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          userAvatar: user.userAvatar,
        }
      })
    } catch (e) {
      console.log(e)
      res.send({message: 'Server Error'})
    }
  })

module.exports = router;
