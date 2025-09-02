document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA NAVEGAÇÃO DE DESKTOP (GAVETA) ---
    const desktopDropdownTrigger = document.querySelector('.dropdown-trigger');
    const desktopDropdownMenu = document.querySelector('.dropdown-menu');
    // ... (resto da lógica do dropdown de desktop que já funciona)

    // --- LÓGICA REFEITA PARA NAVEGAÇÃO MOBILE (HAMBURGER) ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu-container');
    const closeMenuBtn = document.querySelector('.close-menu-btn');

    if (mobileNavToggle && mobileMenu && closeMenuBtn) {
        // Abre o menu
        mobileNavToggle.addEventListener('click', () => {
            mobileMenu.classList.add('is-open');
            document.body.style.overflow = 'hidden'; // Trava o scroll
        });

        // Fecha o menu
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('is-open');
            document.body.style.overflow = 'auto'; // Libera o scroll
        });

        // Fecha o menu se um link for clicado
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-open');
                document.body.style.overflow = 'auto';
            });
        });
    }
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
