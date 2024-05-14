# AI_Prototype
- Step 1 Clone
  - git clone https://github.com/Remo0031/AI_Prototype.git
  - Download Weights
     - Download Weights [HERE](https://drive.google.com/drive/folders/17OTVe1YzfwiH9wiUsPtzBEVmSIbvYc2r?usp=drive_link)
- Step 2 Make sure you have node js
  - Install node js
- Step 3 Upload the model to roboflow
```
from roboflow import Roboflow
rf = Roboflow(api_key="API_KEY")
project = rf.workspace().project("PROJECT_ID")
project.version(DATASET_VERSION).deploy(model_type=”yolov8”, model_path=f”{HOME}/runs/detect/train/”)
```

- Step 4 Update the code on the Script.js to use the api of the model you uplaoded
```
  function sendImageToAPI(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, { encoding: 'base64' }, (err, data) => {
            if (err) {
                return reject(err);
            }

            axios({
                method: 'POST',
                url: 'xxx', //Change URL
                params: {
                    api_key: 'xxx'  // Change API KEY
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
```

  - Step 5 Run the Code/Server
      - Node script.js
