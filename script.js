const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const app = express();
const port = 3002;

// Configure storage
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize Multer
const upload = multer({ storage: storage });

// Serve a simple form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle uploads
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const filepath = path.join(__dirname, 'uploads', req.file.filename);
    sendImageToAPI(filepath).then(apiResponse => {
        res.json(apiResponse)
    }).catch(error => {
        res.status(500).send(error.message);
    });
});

// Function to process the image and send to an API
function sendImageToAPI(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, { encoding: 'base64' }, (err, data) => {
            if (err) {
                return reject(err);
            }

            axios({
                method: 'POST',
                url: 'https://detect.roboflow.com/website-screenshots/1',
                params: {
                    api_key: 'e2DuCVaF9d0wbPUF9ThR'
                },
                data: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(response => {
                console.log(response.data);
                resolve(response.data);
            }).catch(error => {
                console.log(error.message);
                reject(error);
            });
        });
    });
}

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
