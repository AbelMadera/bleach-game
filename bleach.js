// Get references to HTML elements
const map = document.getElementById('seireitei-map');
const squadList = document.getElementById('squad-list');
const deployButton = document.getElementById('deploy-btn');
const meetingButton = document.getElementById('meeting-btn');
const resolveIssueButton = document.getElementById('resolve-issue-btn');
const deployModal = document.getElementById('deploy-modal');
const issueModal = document.getElementById('issue-modal');
const closeDeployModal = deployModal.querySelector('.close');
const closeIssueModal = issueModal.querySelector('.close');
const confirmDeployButton = document.getElementById('confirm-deploy');
const squadSelect = document.getElementById('squad-select');
const actionSelect = document.getElementById('action-select');
const timeSelect = document.getElementById('time-select');
const dialogueText = document.getElementById('dialogue-text');
const energyStatus = document.getElementById('energy-status');
const moraleStatus = document.getElementById('morale-status');
const issueText = document.getElementById('issue-text');
const resolveIssueButtonModal = document.getElementById('resolve-issue');

// Example squad data
const squads = [
    { name: "Squad 1", status: "Ready" },
    { name: "Squad 2", status: "On Mission" },
    { name: "Squad 3", status: "Training" },
    { name: "Squad 4", status: "Patrolling" },
    { name: "Squad 5", status: "Resting" },
    { name: "Squad 6", status: "On Standby" },
    { name: "Squad 7", status: "Ready" },
    { name: "Squad 8", status: "On Mission" },
    { name: "Squad 9", status: "Training" },
    { name: "Squad 10", status: "Patrolling" },
    { name: "Squad 11", status: "Ready" },
    { name: "Squad 12", status: "Researching" },
    { name: "Squad 13", status: "Defending" }
];

// Example resources data
let spiritualEnergy = 500;
let morale = "High";

// Example issues
const issues = [
    "Hollow outbreak in District 80",
    "Traitor in Squad 5",
    "Arrancar sighted near the gate"
];

let currentIssueIndex = -1;

// Function to update squad status display
function updateSquadStatus() {
    squadList.innerHTML = '';
    squads.forEach(squad => {
        squadList.innerHTML += `<p>${squad.name}: ${squad.status}</p>`;
    });
}

// Function to update resources display
function updateResources() {
    energyStatus.innerText = `Spiritual Energy: ${spiritualEnergy}`;
    moraleStatus.innerText = `Morale: ${morale}`;
}

// Populate the squad select dropdown
function populateSquadSelect() {
    squadSelect.innerHTML = '';
    squads.forEach((squad, index) => {
        squadSelect.innerHTML += `<option value="${index}">${squad.name}</option>`;
    });
}

// Populate the issue modal
function populateIssueModal() {
    if (issues.length === 0) {
        issueText.innerText = "No current issues.";
        resolveIssueButtonModal.style.display = 'none';
    } else {
        issueText.innerText = issues[currentIssueIndex];
        resolveIssueButtonModal.style.display = 'block';
    }
}

// Event listener for map clicks
map.addEventListener('click', function() {
    alert('You clicked on the Seireitei map!');
});

// Event listener for "Deploy Squad" button to open the deploy modal
deployButton.addEventListener('click', function() {
    populateSquadSelect();
    deployModal.style.display = 'flex';
});

// Event listener for closing the deploy modal
closeDeployModal.addEventListener('click', function() {
    deployModal.style.display = 'none';
});

// Event listener for confirming deployment
confirmDeployButton.addEventListener('click', function() {
    const selectedSquadIndex = squadSelect.value;
    const selectedAction = actionSelect.value;
    const selectedTime = timeSelect.value;

    // Update the selected squad's status
    squads[selectedSquadIndex].status = `${selectedAction} (ETA: ${selectedTime} hours)`;

    // Deduct spiritual energy based on the action
    if (selectedAction === "Attack") {
        spiritualEnergy -= 100;
    } else if (selectedAction === "Recon") {
        spiritualEnergy -= 50;
    } else if (selectedAction === "Defend") {
        spiritualEnergy -= 75;
    } else if (selectedAction === "Patrol") {
        spiritualEnergy -= 30;
    }

    // Update the display
    updateSquadStatus();
    updateResources();

    // Close the deploy modal
    deployModal.style.display = 'none';
});

// Event listener for "Hold Meeting" button
meetingButton.addEventListener('click', function() {
    alert('Holding a captain\'s meeting...');
    // Example logic to hold a meeting
    morale = "Improved";
    updateResources();
});

// Event listener for "Resolve Current Issue" button to open the issue modal
resolveIssueButton.addEventListener('click', function() {
    if (issues.length > 0) {
        currentIssueIndex = 0; // Start with the first issue
        populateIssueModal();
        issueModal.style.display = 'flex';
    }
});

// Event listener for closing the issue modal
closeIssueModal.addEventListener('click', function() {
    issueModal.style.display = 'none';
});

// Event listener for resolving an issue
resolveIssueButtonModal.addEventListener('click', function() {
    if (currentIssueIndex >= 0 && currentIssueIndex < issues.length) {
        // Remove the resolved issue
        issues.splice(currentIssueIndex, 1);
        currentIssueIndex = -1; // Reset the current issue index

        // Update the issue modal
        populateIssueModal();
        updateSquadStatus();
        updateResources();
    }
});

// Initial updates when the page loads
updateSquadStatus();
updateResources();