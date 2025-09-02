document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA PARA NAVEGAÇÃO DE DESKTOP (GAVETA) ---
    const desktopDropdownTrigger = document.querySelector('.dropdown-trigger');
    const desktopDropdownMenu = document.querySelector('.dropdown-menu');
    const submenuTrigger = document.querySelector('.submenu-trigger');
    const submenu = document.querySelector('.submenu');

    if (desktopDropdownTrigger && desktopDropdownMenu) {
        desktopDropdownTrigger.parentElement.addEventListener('click', (event) => {
            event.preventDefault();
            desktopDropdownMenu.classList.toggle('is-open');
        });
    }
    
    if (submenuTrigger && submenu) {
        submenuTrigger.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            submenu.classList.toggle('is-open');
            submenuTrigger.classList.toggle('open');
        });
    }

    // Fecha a gaveta se clicar fora
    document.addEventListener('click', (event) => {
        const dropdownContainer = document.querySelector('.dropdown-container');
        if (dropdownContainer && !dropdownContainer.contains(event.target)) {
            if (desktopDropdownMenu) {
                desktopDropdownMenu.classList.remove('is-open');
            }
            if (submenu) {
                submenu.classList.remove('is-open');
                submenuTrigger.classList.remove('open');
            }
        }
    });

    // --- LÓGICA DO CARROSSEL DE FEEDBACKS ---
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const track = carouselContainer.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-btn.next');
        const prevButton = document.querySelector('.carousel-btn.prev');

        if (slides.length > 3) {
            let currentIndex = 0;
            const slidesPerPage = 3;
            const totalPages = Math.ceil(slides.length / slidesPerPage);

            const moveToPage = () => {
                const gap = 30;
                const amountToMove = currentIndex * (carouselContainer.offsetWidth + gap);
                track.style.transform = `translateX(-${amountToMove}px)`;
                prevButton.disabled = currentIndex === 0;
                nextButton.disabled = currentIndex >= totalPages - 1;
            };

            nextButton.addEventListener('click', () => {
                if (currentIndex < totalPages - 1) {
                    currentIndex++;
                    moveToPage();
                }
            });

            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    moveToPage();
                }
            });
            
            window.addEventListener('resize', moveToPage);
            moveToPage();
        } else {
            nextButton.disabled = true;
            prevButton.disabled = true;
        }
    }

    // --- LÓGICA DO CONFIGURADOR DE PRODUTOS ---
    const productCards = document.querySelectorAll('.product-configurator-card');
    const whatsappNumber = '5513974200082';

    productCards.forEach(card => {
        const modelName = card.dataset.modelName;
        const buyButton = card.querySelector('.buy-button');
        
        const optionGroups = card.querySelectorAll('.option-group');
        optionGroups.forEach(group => {
            const selectors = group.querySelectorAll('.selector, .color-swatch');
            selectors.forEach(selector => {
                selector.addEventListener('click', () => {
                    group.querySelector('.selected').classList.remove('selected');
                    selector.classList.add('selected');

                    const newFrontImage = selector.dataset.frontImage;
                    const imageFront = card.querySelector('.product-image-front');
                    if (newFrontImage && imageFront) {
                        imageFront.src = newFrontImage;
                    }
                });
            });
        });

        if (buyButton) {
            buyButton.addEventListener('click', (event) => {
                event.preventDefault();
                let message = `Olá, Maximo Imports! Tenho interesse no seguinte modelo:\n\n- Produto: ${modelName}\n`;
                optionGroups.forEach(group => {
                    const label = group.querySelector('.option-label').innerText.replace(':', '');
                    const selectedOption = group.querySelector('.selected').dataset.value;
                    if (label && selectedOption) {
                        message += `- ${label}: ${selectedOption}\n`;
                    }
                });
                message += `\nAguardo o contato!`;
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank');
            });
        }
    });
});