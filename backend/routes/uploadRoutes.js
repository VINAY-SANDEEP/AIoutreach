const express = require("express");
const multer = require("multer");

const router = express.Router();

const { uploadExcel } = require("../controllers/uploadController");

const fs = require("fs");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        if (!fs.existsSync("uploads/")) {
            fs.mkdirSync("uploads/", { recursive: true });
        }
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        cb(null, Date.now() + "-" + file.originalname);

    }

});

const upload = multer({ storage });

router.post("/excel", upload.single("file"), uploadExcel);

module.exports = router;