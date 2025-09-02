document.addEventListener('DOMContentLoaded', () => {
    // Lógica para o menu principal
    const productsTrigger = document.querySelector('.dropdown-trigger');
    const productsMenu = document.querySelector('.dropdown-menu');
    const submenuTrigger = document.querySelector('.submenu-trigger');
    const submenu = document.querySelector('.submenu');

    function closeAllMenus() {
        if (productsMenu) productsMenu.classList.remove('is-open');
        if (submenu) submenu.classList.remove('is-open');
        if (submenuTrigger) submenuTrigger.classList.remove('open');
    }

    if (productsTrigger && productsMenu) {
        // Abre e fecha o menu principal
        productsTrigger.addEventListener('click', (event) => {
            event.preventDefault();
            productsMenu.classList.toggle('is-open');
        });

        // Abre e fecha o submenu
        if (submenuTrigger && submenu) {
            submenuTrigger.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                submenu.classList.toggle('is-open');
                submenuTrigger.classList.toggle('open');
            });
        }
    }

    // Fecha tudo se clicar fora do cabeçalho
    document.addEventListener('click', (event) => {
        const header = document.querySelector('.main-header');
        if (header && !header.contains(event.target)) {
            closeAllMenus();
        }
    });
    
    // Fecha o menu ao clicar em um link que NÂO seja o gatilho do submenu
    if (productsMenu) {
        const menuLinks = productsMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                if (!event.currentTarget.parentElement.classList.contains('submenu-trigger')) {
                    setTimeout(() => {
                        closeAllMenus();
                    }, 150);
                }
            });
        });
    }

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
});