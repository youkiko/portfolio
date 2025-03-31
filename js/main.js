// Gestion du menu burger
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle navigation
    nav.classList.toggle('active');

    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger animation
    burger.classList.toggle('toggle');
});

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollTop = 0;
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Fermer le menu mobile si ouvert
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
        }
    });
});

// Gestion du formulaire de contact
(function() {
    // Initialiser EmailJS
    emailjs.init("VOTRE_CLE_PUBLIQUE"); // Vous devrez remplacer par votre clé publique

    // Récupérer le formulaire
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Afficher un indicateur de chargement
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            // Préparer les paramètres
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Envoyer l'email
            emailjs.send('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    submitBtn.textContent = 'Message envoyé !';
                    form.reset();
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, function(error) {
                    submitBtn.textContent = 'Erreur, veuillez réessayer';
                    console.error('Erreur:', error);
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                });
        });
    }
})();

// Effet de particules pour le fond
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.opacity = Math.random() * 0.5;
        particlesContainer.appendChild(particle);
    }
}

// Effet de parallaxe
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    document.querySelectorAll('.hero-content, .project-card, .skill-category').forEach(element => {
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Animation de texte type machine à écrire
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animation des compétences
function animateSkills() {
    const skills = document.querySelectorAll('.skill-category li');
    skills.forEach((skill, index) => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            skill.style.transition = 'all 0.5s ease';
            skill.style.opacity = '1';
            skill.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Effet de hover 3D sur les cartes
document.querySelectorAll('.project-card, .skill-category').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = -(x - centerX) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Animation au scroll avec effets avancés
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.classList.contains('skills')) {
                animateSkills();
            }
            
            if (entry.target.classList.contains('hero')) {
                const title = entry.target.querySelector('h1');
                const subtitle = entry.target.querySelector('h2');
                typeWriter(subtitle, subtitle.textContent);
            }
        }
    });
}, observerOptions);

// Anneaux électriques interactifs
function initElectricRings() {
    const ringsContainer = document.querySelector('.electric-rings-container');
    const rings = document.querySelectorAll('.electric-ring');
    
    // Effet de suivi de la souris
    ringsContainer.addEventListener('mousemove', (e) => {
        const rect = ringsContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        rings.forEach((ring, index) => {
            const factor = (index + 1) * 0.1;
            const offsetX = (mouseX - rect.width / 2) * factor;
            const offsetY = (mouseY - rect.height / 2) * factor;
            
            ring.style.transform = `rotate(${offsetX * 0.05}deg) translateX(${offsetX * 0.1}px) translateY(${offsetY * 0.1}px)`;
        });
    });
    
    // Effet de retour à la position initiale
    ringsContainer.addEventListener('mouseleave', () => {
        rings.forEach(ring => {
            ring.style.transform = '';
        });
    });
    
    // Effet d'éclair au clic
    ringsContainer.addEventListener('click', (e) => {
        const lightning = document.createElement('div');
        lightning.className = 'lightning-click';
        lightning.style.left = (e.clientX - rect.left) + 'px';
        lightning.style.top = (e.clientY - rect.top) + 'px';
        ringsContainer.appendChild(lightning);
        
        setTimeout(() => {
            lightning.remove();
        }, 1000);
        
        // Effet de pulsation sur les anneaux
        rings.forEach(ring => {
            ring.style.filter = 'brightness(2) drop-shadow(0 0 20px #7c3aed)';
            setTimeout(() => {
                ring.style.filter = '';
            }, 500);
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initElectricRings();
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}); 