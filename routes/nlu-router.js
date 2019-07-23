const router = require("express").Router()
const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter
})

const nlu_controller = require("../controllers/nlu-controller")

router.post("/upload", upload.single('file'), nlu_controller.NLU)

function fileFilter(req, file, cb) {
    console.table(file)
    if (file.mimetype == 'application/pdf') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = router