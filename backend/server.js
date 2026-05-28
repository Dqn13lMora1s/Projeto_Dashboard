const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const { sendCommand } = require("./matrixService");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is alive");
});

app.get("/open-app", (req, res) => {
    // 1. Use the FULL absolute path to your file
    const batPath = "C:\\Users\\Luz\\Desktop\\batch_file.bat"; 

    console.log(`Executing: ${batPath}`);

    // 2. Execute the batch file
    // Note: We escape backslashes in the string or use forward slashes
    exec(`cmd.exe /c "${batPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution Error: ${error.message}`);
            return res.status(500).json({ success: false, message: error.message });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
        }
        console.log(`Stdout: ${stdout}`);
        
        res.json({ success: true, message: "Application launch triggered" });
    });
});


app.post("/matrix", async(req,res)=>{

    try{

        const { deviceName, command } = req.body;

        const result =
            await sendCommand(
                deviceName,
                command
            );

        res.json({
            success:true,
            data: result
        });

    }
    catch(error){

        res.status(500).json({
            success:false,
            error:error.message
        });

    }

});

app.listen(3000,()=>{

    console.log(
        "Server running on port 3000"
    );

});