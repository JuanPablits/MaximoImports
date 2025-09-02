document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA NAVEGAÇÃO DE DESKTOP (GAVETA) ---
    const desktopDropdownTrigger = document.querySelector('.dropdown-trigger');
    const desktopDropdownMenu = document.querySelector('.dropdown-menu');
    const desktopSubmenuTrigger = document.querySelector('.submenu-trigger');
    const desktopSubmenu = document.querySelector('.submenu');

    if (desktopDropdownTrigger && desktopDropdownMenu) {
        desktopDropdownTrigger.addEventListener('click', (event) => {
            event.preventDefault();
            desktopDropdownMenu.classList.toggle('is-open');
        });

        if (desktopSubmenuTrigger && desktopSubmenu) {
            desktopSubmenuTrigger.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                desktopSubmenu.classList.toggle('is-open');
                desktopSubmenuTrigger.classList.toggle('open');
            });
        }
    }

    // --- LÓGICA PARA NAVEGAÇÃO MOBILE (HAMBURGER) ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu-container');

    if (mobileNavToggle && mobileMenu) {
        mobileNavToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('is-open');
            mobileNavToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-open');
                mobileNavToggle.setAttribute('aria-expanded', false);
                document.body.style.overflow = 'auto';
            });
        });
    }

    // --- LÓGICA GERAL ---
    // Fecha a gaveta de DESKTOP se clicar fora do cabeçalho
    document.addEventListener('click', (event) => {
        const header = document.querySelector('.main-header');
        if (header && !header.contains(event.target)) {
            if (desktopDropdownMenu) desktopDropdownMenu.classList.remove('is-open');
            if (desktopSubmenu) desktopSubmenu.classList.remove('is-open');
            if (desktopSubmenuTrigger) desktopSubmenuTrigger.classList.remove('open');
        }
    });

    // --- LÓGICA DO CARROSSEL DE FEEDBACKS (SEM ALTERAÇÕES) ---
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        // ... (código do carrossel que já funciona)
    }
});
    // --- LÓGICA DO CARROSSEL DE FEEDBACKS (VERSÃO CORRIGIDA) ---
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const track = carouselContainer.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-btn.next');
        const prevButton = document.querySelector('.carousel-btn.prev');

        if (slides.length > 3) { // Só ativa o carrossel se houver mais de 3 slides
            let currentIndex = 0;
            const slidesPerPage = 3;
            // Corrigido para apenas 2 páginas de 3 slides
            const totalPages = Math.ceil(slides.length / slidesPerPage);

            const moveToPage = () => {
                // O cálculo correto usa a largura do container + o gap entre as "páginas"
                const gap = 30; // O mesmo valor do gap no CSS
                const amountToMove = currentIndex * (carouselContainer.offsetWidth + gap);
                track.style.transform = `translateX(-${amountToMove}px)`;

                // Atualiza os botões
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
            moveToPage(); // Inicia na posição correta
        } else {
            // Se houver 3 slides ou menos, desativa os botões
            nextButton.disabled = true;
            prevButton.disabled = true;
        }
    }
