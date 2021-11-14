const fs = require('fs');

class FileService {

  getPathToFile(req, file) {
    let fullPath = req.filePath + '/' + file.user._id + '/' + file.path
    if (file.type !== 'dir') {
      fullPath += '/' + file.name
    }
    return fullPath;
  }

  createDir(req, file) {
    const filePath = `${req.filePath}/${file.user}/${file.path}`
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return resolve({message: 'Directory was created'})
        } else {
          return reject({message: 'Directory already exist'})
        }
      } catch (e) {
        return reject({message: 'Directory create error'})
      }
    })
  }

  deleteFile(req, file) {
    const path = this.getPathToFile(req, file)
    if (file.type === 'dir') {
      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }
  }

}

module.exports = new FileService();