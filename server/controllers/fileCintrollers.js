const fileService = require('./../services/fileService');
const User = require('./../models/User');
const File = require('./../models/File');
const fs = require('fs');
const uuid = require('uuid')

class FileControllers {
  async createDir(req, res) {
    try {
      const {name, type, parent} = req.body;
      const file = new File({name, type, parent, user: req.user.id});
      const parentFile = await File.findOne({_id: parent});
      if (!parent) {
        file.path = name;
        await fileService.createDir(req, file)
      } else {
        file.path = `${parentFile.path}/${file.name}`;
        await fileService.createDir(req, file);
        parentFile.childs.push(file.id);
        await parentFile.save()
      }
      await file.save()
      return res.json(file)
    } catch (e) {
      console.log(e)
      return res.status(400).json(e)
    }
  };

  async getFiles(req, res) {
    try {
      let files;
      const {parent, sort} = req.query
      switch (sort) {
        case 'name': {
          files = await File.find({user: req.user.id, parent: parent}).sort({name: 1})
          break
        }
        case 'date': {
          files = await File.find({user: req.user.id, parent: parent}).sort({date: 1})
          break
        }
        case 'size': {
          files = await File.find({user: req.user.id, parent: parent}).sort({size: 1})
          break
        }
        case 'type': {
          files = await File.find({user: req.user.id, parent: req.query.parent}).sort({type: 1})
          break
        }
        default:
          files = await File.find({user: req.user.id, parent: req.query.parent})
      }
      return res.json(files)
    } catch (e) {
      return res.status(500).json({message: 'Can not get files'})
    }
  };

  async uploadFile(req, res) {
    try {
      const file = req.files.file;
      const user = await User.findOne({_id: req.user.id})
      const parent = await File.findOne({user: req.user.id, _id: req.body.parent})

      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({message: 'There no space in the Disk'})
      }

      user.usedSpace = user.usedSpace + file.size;

      let path;
      if (parent) {
        path = `${req.filePath}/${user._id}/${parent.path}/${file.name}`
      } else {
        path = `${req.filePath}/${user._id}/${file.name}`
      }

      if (fs.existsSync(path)) {
        return res.status(400).json({message: 'File already exist'})
      }
      file.mv(path)

      const type = file.name.split('.').pop();

      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: parent?.path,
        parent: parent?._id,
        user: user._id,
      })

      await dbFile.save();
      await user.save();

      res.json(dbFile)

    } catch (e) {
      return res.status(500).json({message: 'Upload file error'})
    }
  };

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({_id: req.query.id, user: req.user.id});
      const path = fileService.getPathToFile(file)
      if (fs.existsSync(path)) {
        return res.download(path, file.name)
      }
      return res.status(400).json({message: 'Download file error'})
    } catch (e) {
      return res.status(500).json({message: 'Download file error'})
    }
  };

  async deleteFile(req, res) {
    try {
      const file = await File.findOne({_id: req.query.id, user: req.user.id})
      if (!file) {
        res.status(400).json({message: 'File not found'})
      }
      fileService.deleteFile(req, file)
      await file.remove()
      return res.json({message: 'File was deleted'})

    } catch (e) {
      return res.status(500).json({message: 'Delete file error'})
    }
  };

  async searchFile(req, res) {
    try {
      const searchName = req.query.search
      let files = await File.find({user: req.user.id})
      files = files.filter(file => file.name.includes(searchName))
      return res.json(files)
    } catch (e) {
      return res.status(500).json({message: 'Search file error'})
    }
  };

  async uploadAvatar(req, res) {
    try {
      const file = req.files.file
      const fileType = file.name.split('.').pop();
      const user = await User.findById(req.user.id);
      const avatarName = uuid.v4() + '.' + fileType;
      file.mv(req.staticPath + '/' + avatarName);
      user.avatar = avatarName;
      await user.save();
      res.json(user)
    } catch (e) {
      return res.status(511).json({message: 'Upload avatar error'})
    }
  };

  async deleteAvatar(req, res) {
    try {
      const user = await User.findById(req.user.id);
      fs.unlinkSync(req.staticPath + '/' + user.avatar)
      user.avatar = null;
      await user.save();
      res.json(user)
    } catch (e) {
      return res.status(511).json({message: 'Delete avatar error'})
    }
  };

}

module.exports = new FileControllers();