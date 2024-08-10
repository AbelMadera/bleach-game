// Data for squads and captains
const squads = [
    { id: 1, name: "Squad 1", captain: "Shinji Hirako", lieutenant: "Hiyori Sarugaki", action: "None", eta: "N/A", skills: ["Combat", "Speed"] },
    { id: 2, name: "Squad 2", captain: "Soi Fon", lieutenant: "Yoruichi Shihouin", action: "None", eta: "N/A", skills: ["Stealth", "Speed"] },
    { id: 3, name: "Squad 3", captain: "Rojuro Otoribashi", lieutenant: "Lisa Yadomaru", action: "None", eta: "N/A", skills: ["Healing", "Combat"] },
    { id: 4, name: "Squad 4", captain: "Isane Kotetsu", lieutenant: "Yachiru Unohana", action: "None", eta: "N/A", skills: ["Healing", "Support"] },
    { id: 5, name: "Squad 5", captain: "Seiireitei Kenpachi", lieutenant: "Yachiru Kusajishi", action: "None", eta: "N/A", skills: ["Combat", "Strength"] },
    { id: 6, name: "Squad 6", captain: "Byakuya Kuchiki", lieutenant: "Renji Abarai", action: "None", eta: "N/A", skills: ["Combat", "Swordsmanship"] },
    { id: 7, name: "Squad 7", captain: "Sajin Komamura", lieutenant: "Tetsuzaemon Iba", action: "None", eta: "N/A", skills: ["Strength", "Defense"] },
    { id: 8, name: "Squad 8", captain: "Shunsui Kyoraku", lieutenant: "Nanao Ise", action: "None", eta: "N/A", skills: ["Combat", "Tactics"] },
    { id: 9, name: "Squad 9", captain: "Kaname Tosen", lieutenant: "Hisagi Shuuhei", action: "None", eta: "N/A", skills: ["Stealth", "Speed"] },
    { id: 10, name: "Squad 10", captain: "Toshiro Hitsugaya", lieutenant: "Momo Hinamori", action: "None", eta: "N/A", skills: ["Ice", "Combat"] },
    { id: 11, name: "Squad 11", captain: "Kenpachi Zaraki", lieutenant: "Yachiru Kusajishi", action: "None", eta: "N/A", skills: ["Combat", "Strength"] },
    { id: 12, name: "Squad 12", captain: "Mayuri Kurotsuchi", lieutenant: "Nemu Kurotsuchi", action: "None", eta: "N/A", skills: ["Science", "Experimentation"] },
    { id: 13, name: "Squad 13", captain: "Jushiro Ukitake", lieutenant: "Rukia Kuchiki", action: "None", eta: "N/A", skills: ["Healing", "Support"] },
];

// Modal elements
const squadDetailModal = document.getElementById('squad-detail-modal');
const deployModal = document.getElementById('deploy-modal');
const meetingModal = document.getElementById('meeting-modal');
const closeSquadDetail = document.getElementById('close-squad-details');
const closeDeploy = document.getElementById('close-deploy');
const closeMeeting = document.getElementById('close-meeting');
const squadList = document.getElementById('squad-list');
const squadSelect = document.getElementById('squad-select');
const actionSelect = document.getElementById('action-select');
const timeSelect = document.getElementById('time-select');
const confirmDeployBtn = document.getElementById('confirm-deploy');
const deployBtn = document.getElementById('deploy-btn');
const meetingBtn = document.getElementById('meeting-btn');
const meetingReason = document.getElementById('meeting-reason');
const captainSelect = document.getElementById('captain-select');
const meetingContent = document.getElementById('meeting-content');
const captainDialogue = document.getElementById('captain-dialogue');

// Populate squad status and squad select
function populateSquadList() {
    squadList.innerHTML = '';
    squadSelect.innerHTML = '';
    captainSelect.innerHTML = '';

    squads.forEach(squad => {
        // Squad List
        const squadItem = document.createElement('div');
        squadItem.className = 'squad-item';
        squadItem.innerHTML = `
            <h3>${squad.name}</h3>
            <p>Action: ${squad.action}</p>
            <p>ETA: ${squad.eta}</p>
        `;
        squadItem.addEventListener('click', () => showSquadDetails(squad));
        squadList.appendChild(squadItem);

        // Squad Select
        const squadOption = document.createElement('option');
        squadOption.value = squad.id;
        squadOption.textContent = squad.name;
        squadSelect.appendChild(squadOption);

        // Captain Select
        const captainOption = document.createElement('option');
        captainOption.value = squad.id;
        captainOption.textContent = squad.name;
        captainSelect.appendChild(captainOption);
    });
}

// Show squad details
function showSquadDetails(squad) {
    const squadDetails = document.getElementById('squad-details');
    squadDetails.innerHTML = `
        <h3>${squad.name}</h3>
        <p>Captain: ${squad.captain}</p>
        <p>Lieutenant: ${squad.lieutenant}</p>
        <p>Skills: ${squad.skills.join(', ')}</p>
        <p>Current Action: ${squad.action}</p>
        <p>Estimated Time of Completion: ${squad.eta}</p>
    `;
    squadDetailModal.style.display = 'flex';
}

// Close modals
function closeModal(modal) {
    modal.style.display = 'none';
}

// Handle squad deployment
function handleDeploy() {
    const squadId = squadSelect.value;
    const action = actionSelect.value;
    const eta = timeSelect.value;

    const selectedSquad = squads.find(squad => squad.id == squadId);
    if (selectedSquad) {
        selectedSquad.action = action;
        selectedSquad.eta = eta;
        populateSquadList(); // Refresh the squad list
    }
    closeModal(deployModal);
}

// Start a meeting
function startMeeting() {
    const reason = meetingReason.value;
    const selectedCaptainId = captainSelect.value;

    const selectedCaptain = squads.find(squad => squad.id == selectedCaptainId);
    if (selectedCaptain) {
        meetingContent.innerHTML = `
            <p>Meeting with ${selectedCaptain.captain} - Reason: ${reason}</p>
            <p>Dialogue Options:</p>
            <button class="dialogue-option" data-dialogue="Discuss strategy">Discuss strategy</button>
            <button class="dialogue-option" data-dialogue="Check status">Check status</button>
            <button class="dialogue-option" data-dialogue="Discuss training">Discuss training</button>
            <button class="dialogue-option" data-dialogue="Address morale">Address morale</button>
        `;
        meetingModal.style.display = 'flex';
    }
}

// Handle dialogue options
function handleDialogueOption(event) {
    if (event.target.classList.contains('dialogue-option')) {
        const dialogue = event.target.dataset.dialogue;
        captainDialogue.innerHTML = `<p>${dialogue}</p>`;
    }
}

// Event Listeners
deployBtn.addEventListener('click', () => deployModal.style.display = 'flex');
meetingBtn.addEventListener('click', startMeeting);

closeSquadDetail.addEventListener('click', () => closeModal(squadDetailModal));
closeDeploy.addEventListener('click', () => closeModal(deployModal));
closeMeeting.addEventListener('click', () => closeModal(meetingModal));

confirmDeployBtn.addEventListener('click', handleDeploy);
meetingContent.addEventListener('click', handleDialogueOption);

// Initialize
populateSquadList();