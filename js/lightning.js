document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.neon-ring-container');
    const primaryRing = document.querySelector('.neon-ring.primary');
    const secondaryRing = document.querySelector('.neon-ring.secondary');

    function createBranch(parent, color, startX, startY, angle, length, width, generation) {
        if (generation > 3) return; // Limite la récursivité

        const branch = document.createElement('div');
        branch.className = `lightning ${color}`;
        
        // Style de base de la branche
        branch.style.height = `${length}px`;
        branch.style.width = `${width}px`;
        branch.style.left = `${startX}px`;
        branch.style.top = `${startY}px`;
        branch.style.transform = `rotate(${angle}deg)`;
        
        container.appendChild(branch);

        // Crée des branches secondaires
        if (Math.random() < 0.6 && generation < 3) {
            const numBranches = Math.floor(Math.random() * 2) + 1;
            for (let i = 0; i < numBranches; i++) {
                const newAngle = angle + (Math.random() * 40 - 20);
                const newLength = length * (0.5 + Math.random() * 0.3);
                const branchStart = Math.random() * length * 0.8;
                const newX = startX + Math.cos(angle * Math.PI / 180) * branchStart;
                const newY = startY + Math.sin(angle * Math.PI / 180) * branchStart;
                
                createBranch(
                    branch,
                    color,
                    newX,
                    newY,
                    newAngle,
                    newLength,
                    width * 0.7,
                    generation + 1
                );
            }
        }

        // Animation de l'éclair
        branch.style.animation = `lightningFlash ${0.2 + Math.random() * 0.1}s ease-out forwards`;
        
        setTimeout(() => {
            branch.remove();
        }, 300);
    }

    function createLightning(ring, color) {
        const containerRect = container.getBoundingClientRect();
        const ringRect = ring.getBoundingClientRect();
        
        // Calculer le centre du conteneur et de l'anneau
        const containerCenterX = containerRect.width / 2;
        const containerCenterY = containerRect.height / 2;
        
        // Angle aléatoire autour du cercle
        const angle = Math.random() * Math.PI * 2;
        const radius = 150;
        
        // Calculer la position relative au centre du conteneur
        const startX = containerCenterX + Math.cos(angle) * radius;
        const startY = containerCenterY + Math.sin(angle) * radius;
        
        // Angle de départ aléatoire pour l'éclair
        const startAngle = Math.random() * 360;
        
        // Crée l'éclair principal
        createBranch(
            null,
            color,
            startX,
            startY,
            startAngle,
            30 + Math.random() * 20,
            2,
            0
        );
    }

    function generateLightnings() {
        if (Math.random() < 0.2) {
            createLightning(primaryRing, 'pink');
        }
        if (Math.random() < 0.2) {
            createLightning(secondaryRing, 'purple');
        }
    }

    // Génération continue d'éclairs
    setInterval(generateLightnings, 100);
}); 