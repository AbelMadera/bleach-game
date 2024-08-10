// Sample data for squads
const squads = [
    { name: 'Squad 1', captain: 'Shunsui Kyoraku', lieutenant: 'Nanao Ise', skills: ['Combat', 'Tactics'], currentAction: 'Defend', eta: '3 hours' },
    { name: 'Squad 2', captain: 'Byakuya Kuchiki', lieutenant: 'Renji Abarai', skills: ['Speed', 'Stealth'], currentAction: 'Recon', eta: '1 hour' },
    { name: 'Squad 3', captain: 'Retsu Unohana', lieutenant: 'Isane Kotetsu', skills: ['Healing', 'Support'], currentAction: 'Patrol', eta: '6 hours' },
    { name: 'Squad 4', captain: 'Retsu Unohana', lieutenant: 'Isane Kotetsu', skills: ['Healing', 'Support'], currentAction: 'Training', eta: '12 hours' },
    { name: 'Squad 5', captain: 'Shinji Hirako', lieutenant: 'Hiyori Sarugaki', skills: ['Illusion', 'Defense'], currentAction: 'Attack', eta: '6 hours' },
    { name: 'Squad 6', captain: 'Byakuya Kuchiki', lieutenant: 'Renji Abarai', skills: ['Speed', 'Kido'], currentAction: 'Recon', eta: '1 hour' },
    { name: 'Squad 7', captain: 'Sajin Komamura', lieutenant: 'Tetsuzaemon Iba', skills: ['Strength', 'Tactical'], currentAction: 'Defend', eta: '3 hours' },
    { name: 'Squad 8', captain: 'Shunsui Kyoraku', lieutenant: 'Nanao Ise', skills: ['Combat', 'Strategy'], currentAction: 'Patrol', eta: '6 hours' },
    { name: 'Squad 9', captain: 'Kensei Muguruma', lieutenant: 'Mashiro Kuna', skills: ['Strength', 'Close Combat'], currentAction: 'Attack', eta: '3 hours' },
    { name: 'Squad 10', captain: 'Toshiro Hitsugaya', lieutenant: 'Matsumoto Rangiku', skills: ['Ice Abilities', 'Strategic'], currentAction: 'Recon', eta: '1 hour' },
    { name: 'Squad 11', captain: 'Kenpachi Zaraki', lieutenant: 'Yachiru Kusajishi', skills: ['Combat', 'Brute Strength'], currentAction: 'Attack', eta: '6 hours' },
    { name: 'Squad 12', captain: 'Mayuri Kurotsuchi', lieutenant: 'Nemu Kurotsuchi', skills: ['Science', 'Experimentation'], currentAction: 'Research', eta: '12 hours' },
    { name: 'Squad 13', captain: 'Jushiro Ukitake', lieutenant: 'Rukia Kuchiki', skills: ['Support', 'Kido'], currentAction: 'Patrol', eta: '6 hours' }
];

document.addEventListener('DOMContentLoaded', () => {
    const squadList = document.getElementById('squad-list');
    const squadSelect = document.getElementById('squad-select');
    const squadDetailModal = document.getElementById('squad-detail-modal');
    const squadDetailsDiv = document.getElementById('squad-details');
    
    // Populate squad list
    squads.forEach((squad, index) => {
        const squadItem = document.createElement('div');
        squadItem.classList.add('squad-item');
        squadItem.innerHTML = `
            <h3>${squad.name}</h3>
            <p><strong>Current Action:</strong> ${squad.currentAction}</p>
            <p><strong>ETA:</strong> ${squad.eta}</p>
        `;
        squadItem.addEventListener('click', () => showSquadDetails(index));
        squadList.appendChild(squadItem);

        // Populate squad select dropdown
        const option = document.createElement('option');
        option.value = index;
        option.textContent = squad.name;
        squadSelect.appendChild(option);
    });

    const deployModal = document.getElementById('deploy-modal');
    const deployBtn = document.getElementById('deploy-btn');
    const closeDeployModal = deployModal.querySelector('.close');
    const confirmDeployBtn = document.getElementById('confirm-deploy');
    
    // Show deploy modal
    deployBtn.addEventListener('click', () => {
        deployModal.style.display = 'flex';
    });
    
    // Close deploy modal
    closeDeployModal.addEventListener('click', () => {
        deployModal.style.display = 'none';
    });

    // Confirm deployment
    confirmDeployBtn.addEventListener('click', () => {
        const selectedSquadIndex = parseInt(squadSelect.value);
        const action = document.getElementById('action-select').value;
        const eta = document.getElementById('time-select').value;
        if (selectedSquadIndex >= 0 && selectedSquadIndex < squads.length) {
            squads[selectedSquadIndex].currentAction = action;
            squads[selectedSquadIndex].eta = `${eta} hours`;
            updateSquadList();
            deployModal.style.display = 'none';
        }
    });

    // Function to show squad details
    function showSquadDetails(index) {
        const squad = squads[index];
        squadDetailsDiv.innerHTML = `
            <h3>${squad.name}</h3>
            <p><strong>Captain:</strong> ${squad.captain}</p>
            <p><strong>Lieutenant:</strong> ${squad.lieutenant}</p>
            <p><strong>Skills:</strong> ${squad.skills.join(', ')}</p>
            <p><strong>Current Action:</strong> ${squad.currentAction}</p>
            <p><strong>ETA:</strong> ${squad.eta}</p>
        `;
        squadDetailModal.style.display = 'flex';
    }

    // Close squad detail modal
    squadDetailModal.querySelector('.close').addEventListener('click', () => {
        squadDetailModal.style.display = 'none';
    });

    // Function to update squad list
    function updateSquadList() {
        squadList.innerHTML = '';
        squads.forEach((squad, index) => {
            const squadItem = document.createElement('div');
            squadItem.classList.add('squad-item');
            squadItem.innerHTML = `
                <h3>${squad.name}</h3>
                <p><strong>Current Action:</strong> ${squad.currentAction}</p>
                <p><strong>ETA:</strong> ${squad.eta}</p>
            `;
            squadItem.addEventListener('click', () => showSquadDetails(index));
            squadList.appendChild(squadItem);
        });
    }
    
    // Handle resolve issue button
    const resolveIssueBtn = document.getElementById('resolve-issue-btn');
    resolveIssueBtn.addEventListener('click', () => {
        // Placeholder for issue resolution feature
        alert('Issue resolution feature is not yet implemented.');
    });
});