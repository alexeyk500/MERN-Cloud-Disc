const Router = require('express');
const User = require('../models/user.js');
const bcryptjs = require('bcryptjs');
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
        return res.status(400).json({message: `User with email ${email} already exist`})
      }

      const hashPassword = await bcryptjs.hash(password, 5);
      const user = new User({email, password: hashPassword});
      await user.save();
      return res.json({message: 'User was created'})

    } catch (e) {
      console.log(e)
      res.send({message: 'Server Error'})
    }
  })

module.exports = router;

