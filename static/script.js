// script.js

const petNames = ['pet1', 'pet2', 'pet3', 'pet4'];
const raspIp = 'http://99.99.99.99:5000';

function initialize() {
    let baseInput = document.getElementById('base');
    petNames.forEach(name => {
        let petInput = document.getElementById(name);
        petInput.addEventListener('input', () => calculateDiff(baseInput, petInput));
    });
}

function calculateDiff(baseInput, petInput) {
    let diffElement = document.getElementById(petInput.id + 'Diff');
    let diff = Math.floor((petInput.value - baseInput.value) * 10) / 10;
    diffElement.innerText = diff.toFixed(1);
}

async function submitForm(event) {
    event.preventDefault();
    let date = new Date().toISOString();
    let baseWeight = document.getElementById('base').value;
    let data = [];
    let baseData = {
        "Name": "Base",
        "Weight": parseFloat(baseWeight.trim()),
        "Date": date
    }
    data.push(baseData);
    petNames.forEach(name => {
        let diffElement = document.getElementById(name + 'Diff');
        let diff = parseFloat(diffElement.innerText.trim());
        let petData = {
            "Name": name,
            "Weight": diff,
            "Date": date
        };
        data.push(petData);
    });

    try {
        const response = await fetch(raspIp, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log('There was a problem with the fetch operation: ' + error.message);
    }
}
