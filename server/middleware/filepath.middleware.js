function filePath(filePath, staticPath) {
    return function cors(req, res, next) {
        req.filePath = filePath
        req.staticPath = staticPath
        next();
    }
}

module.exports = filePath;