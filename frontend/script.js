        // Select all cards
        const cards = document.querySelectorAll(".card");

        // Status text
        const statusText = document.getElementById("statusText");

        // Add click event to every card
        cards.forEach(card => {

            card.addEventListener("click", () => {

                // Get device name from the card text
                const deviceName =
                    card.querySelector("span").innerText;

                // Update status panel
                statusText.innerText =
                    `${deviceName} selected`;

                // Visual feedback
                cards.forEach(c =>
                    c.classList.remove("active")
                );

                card.classList.add("active");

                console.log("Selected:", deviceName);

                sendCommand(deviceName);

            });

        });

        async function sendCommand(device){

        try{

            const response =
                await fetch(
                    "http://localhost:3000/matrix",
                    {
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify({

                            command:
                            `COMMAND_FOR_${device}`

                        })
                    }
                );

            const data =
                await response.json();

            console.log(data);

        }
        catch(error){

            console.log(error);
        }

    }