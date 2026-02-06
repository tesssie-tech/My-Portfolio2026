document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.dev-text');
    
    if (textElement) {
        const texts = ["<Frontend Dev />", "UI Designer", "Creative Coder"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        textElement.textContent = '';
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                textElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = 150;
            
            if (isDeleting) {
                typeSpeed = 75;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typing after a short delay
        setTimeout(type, 500);
    }
});