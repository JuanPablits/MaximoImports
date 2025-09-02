document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA PARA NAVEGAÇÃO DE DESKTOP (GAVETA) ---
    const desktopDropdownTrigger = document.querySelector('.dropdown-trigger');
    const desktopDropdownMenu = document.querySelector('.dropdown-menu');
    const submenuTriggerLink = document.querySelector('.submenu-trigger > a');
    const submenu = document.querySelector('.submenu');

    function closeAllDropdowns() {
        if (desktopDropdownMenu) desktopDropdownMenu.classList.remove('is-open');
        if (submenu) submenu.classList.remove('is-open');
        if (submenuTriggerLink) submenuTriggerLink.parentElement.classList.remove('open');
    }

    // Apenas o link "Produtos" abre/fecha a gaveta principal
    if (desktopDropdownTrigger) {
        desktopDropdownTrigger.addEventListener('click', (event) => {
            event.preventDefault(); // Impede a navegação
            event.stopPropagation();
            desktopDropdownMenu.classList.toggle('is-open');
        });
    }

    // Apenas o link "iPhone" abre/fecha o submenu
    if (submenuTriggerLink) {
        submenuTriggerLink.addEventListener('click', (event) => {
            event.preventDefault(); // Impede a navegação
            event.stopPropagation();
            submenu.classList.toggle('is-open');
            submenuTriggerLink.parentElement.classList.toggle('open');
        });
    }

    // Fecha a gaveta ao clicar em qualquer link que tenha um destino real
    if (desktopDropdownMenu) {
        desktopDropdownMenu.querySelectorAll('a').forEach(link => {
            // Se o link NÃO for o que abre o submenu, ele deve fechar o menu ao ser clicado
            if (link !== submenuTriggerLink) {
                link.addEventListener('click', () => {
                    setTimeout(() => {
                        closeAllDropdowns();
                    }, 150); // Delay para permitir a navegação/rolagem
                });
            }
        });
    }

    // Fecha tudo se clicar fora do cabeçalho
    document.addEventListener('click', (event) => {
        const header = document.querySelector('.main-header');
        if (header && !header.contains(event.target)) {
            closeAllDropdowns();
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
            if(nextButton && prevButton){
                nextButton.disabled = true;
                prevButton.disabled = true;
            }
        }
    }
});