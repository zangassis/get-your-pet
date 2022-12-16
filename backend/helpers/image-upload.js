const { unwatchFile } = require('fs')
const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
    destination: function(req, res, cb) {
        let folder = ''

        if (req.baseUrl.includes('users')) {
            folder = 'users'
        } else if (req.baseUrl.includes('pets')) {
            folder = 'pets'
        }
        cb(null, `public/images/${folder}`)
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Image format invalid, send onçy jpg ou png format'))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }