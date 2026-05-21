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

        console.log("Trying to connect...");

        await connection.connect(params);

        console.log("CONNECTED ✔");

        const response =
            await connection.send(
                command + "\r\n"
            );

        connection.end();

        return response;

    }
    catch(error){

        console.log(error.message);

        throw error;
    }
}

module.exports = {
    sendCommand
};