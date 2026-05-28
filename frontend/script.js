// Select all cards
const cards = document.querySelectorAll(".card");
const statusText = document.getElementById("statusText");

// Device Configuration
const deviceConfig = {
    "WyreStorm": { type: "url", address: "http://192.168.0.6" },
    "Panasonic Projetor": { type: "url", address: "http://192.168.0.8" },
    "Yamaha TF1": { type: "app", endpoint: "http://localhost:3000/open-app" }, // Calls your local API
    "Dolby": { type: "url", address: "http://192.168.1.151" }
};

cards.forEach(card => {
    card.addEventListener("click", async () => {
        const deviceName = card.querySelector("span").innerText;
        
        // Update UI
        statusText.innerText = `${deviceName} selected`;
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        const config = deviceConfig[deviceName];

        if (!config) {
            alert(`No configuration found for ${deviceName}`);
            return;
        }

        // Handle Web Interfaces
        if (config.type === "url") {
            window.location.href = config.address;
        } 
        // Handle Local App Launch (Yamaha)
        else if (config.type === "app") {
            statusText.innerText = `${deviceName} launching...`;
            
            try {
                // Call your local server.js
                const response = await fetch(config.endpoint);
                const result = await response.json();

                if (result.success) {
                    statusText.innerText = `${deviceName} launched successfully!`;
                } else {
                    alert(`Failed to launch: ${result.message}`);
                    statusText.innerText = `Error launching ${deviceName}`;
                }
            } catch (error) {
                console.error(error);
                alert("Could not connect to local server. Is 'node server.js' running?");
                statusText.innerText = `Connection error for ${deviceName}`;
            }
        }
    });
});