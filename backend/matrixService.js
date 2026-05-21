const Telnet = require("telnet-client");

async function sendCommand(command){

    const connection = new Telnet();

    const params = {
        host: "192.168.11.143",
        port: 23,
        timeout: 5000,
        debug: true
    };

    try{

        console.log("Trying to connect to WyreStorm...");

        await connection.connect(params);

        console.log("CONNECTED ✔");

        console.log("Sending command:", command);

        const response = await connection.send(command + "\r\n");

        console.log("Response:", response);

        connection.end();

        return response;

    }
    catch(error){

        console.log("❌ MATRIX ERROR:");
        console.log(error.message);

        throw error;
    }
}