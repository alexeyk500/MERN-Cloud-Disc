const Router = require('express');
const router = new Router();
const authMiddleware = require('./../middlewear/auth.middleware');

const fileController = require('./../controllers/fileCintrollers')

router.post('', authMiddleware, fileController.createDir)
router.get('', authMiddleware, fileController.getFiles)

module.exports = router;