const Router = require('express');
const router = new Router();
const authMiddleware = require('./../middlewear/auth.middleware');

const fileController = require('./../controllers/fileCintrollers')

router.get('', authMiddleware, fileController.getFiles);
router.post('', authMiddleware, fileController.createDir);
router.post('/upload', authMiddleware, fileController.uploadFile)

module.exports = router;