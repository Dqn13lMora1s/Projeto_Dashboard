const express = require("express");
const cors = require("cors");

const { sendCommand } = require("./matrixService");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is alive");
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