const Telnet = require("telnet-client");

const devices = {
    WyreStorm: "192.168.0.6",
    Projetor: "192.168.0.8",
    Yamaha: "192.168.0.2",
    Dolby: "192.168.1.151"
};

async function sendCommand(deviceName, command){

    const ip = devices[deviceName];

    if(!ip){
        throw new Error("Unknown device");
    }

    const connection = new Telnet();

    const params = {
        host: ip,
        port: 23,
        timeout: 5000
    };

    await connection.connect(params);

    const response =
        await connection.send(
            command + "\r\n"
        );

    connection.end();

    return response;
}

module.exports = {
    sendCommand
};