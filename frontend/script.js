// Select all cards
const cards = document.querySelectorAll(".card");

// Status text
const statusText = document.getElementById("statusText");

// Device IP addresses
const deviceIPs = {
    "WyreStorm": "http://192.168.11.143",
    "Projeto": "http://192.168.0.8",
    "Yamaha Sound Board": "http://192.168.11.145",
    "Device 4": "http://192.168.11.146"
};

// Add click event to every card
cards.forEach(card => {

    card.addEventListener("click", () => {

        // Get device name
        const deviceName =
            card.querySelector("span").innerText;

        // Update status panel
        statusText.innerText =
            `${deviceName} selected`;

        // Remove active class from all cards
        cards.forEach(c =>
            c.classList.remove("active")
        );

        // Highlight clicked card
        card.classList.add("active");

        console.log("Selected:", deviceName);

        // Open corresponding IP
        const deviceIP =
            deviceIPs[deviceName];

        if(deviceIP){

            window.open(
                deviceIP,
                "_blank"
            );

        }
        else{

            alert(
                `No IP configured for ${deviceName}`
            );

        }

    });

});