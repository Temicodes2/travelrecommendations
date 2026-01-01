async function bang() {
    
    
    try {
        ;
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        
        console.log(data); // This will now show the actual travel data!
        
    } catch (error) {
        console.error("The fetch failed. Check your internet or the URL:", error.message);
    }
}

async function search() {
    const url = "travel_recommendation_api.json";
    const response = await fetch(url)
    const data = await response.json();
    console.log(data)
    input = document.getElementById("ding").value
    if (input === "temple" || input === "temples") {
        console.log("Results:", data.temples);
        results=data.temples
    } 
    else if (input === "beach" || input === "beaches") {
        console.log("Results:", data.beaches);
        results = data.beaches
    } 
    else if (input === "country" || input === "countries") {
        console.log("Results:", data.countries)
        results = data.countries
    }
    else {
        // Use .filter() to find a specific country name if they didn't type a category
        const results = data.countries.filter(item => 
            item.name.toLowerCase().includes(input)
        );
        console.log("Results:", results);
    }
    console.log(results)
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = ""; // This clears old results so they don't pile up
    if (input === "country" || input === "countries") {
        results.forEach(item => {
            // 1. Create a container for the individual result
            const placeCard = document.createElement('div');
            placeCard.classList.add('result-card');

            // 2. Build the HTML content using the item's properties
            placeCard.innerHTML = `
                <img src="${item.cities[0].imageUrl}" alt="${item.cities[0].name}" style="width:100%; border-radius:10px;">
                <h2>${item.cities[0].name}</h2>
                <p>${item.cities[0].description}</p>
                <button class="visit-btn">Visit</button>
            `;

            // 3. Add the card to your website's result area
            resultDiv.appendChild(placeCard);
        });
    }
    else {
        results.forEach(item => {
            // 1. Create a container for the individual result
            const placeCard = document.createElement('div');
            placeCard.classList.add('result-card');

            // 2. Build the HTML content using the item's properties
            placeCard.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" style="width:100%; border-radius:10px;">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <button class="visit-btn">Visit</button>
                <hr>
            `;

            // 3. Add the card to your website's result area
            resultDiv.appendChild(placeCard);
        });
    }
}
function resetandclear(){
    document.getElementById("results").innerHTML = ""
    document.getElementById("ding").innerHTML = ""
    console.log("cleared")
}