// Select all cards
const cards = document.querySelectorAll(".card");

// Status text
const statusText = document.getElementById("statusText");

// Device IP addresses
const deviceIPs = {
    "WyreStorm": "http://192.168.0.6",
    "Panasonic Projetor": "http://192.168.0.8",
    "Yamaha TF1": "http://192.168.0.2",
    "Dolby": "http://192.168.1.151"
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
            window.location.href = deviceIP;
        }
        else{

            alert(
                `No IP configured for ${deviceName}`
            );

        }

    });

});