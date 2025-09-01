// --- CONFIGURAÇÕES ---
const numeroWhatsapp = '5511912345678'; // <-- COLOQUE O NÚMERO DA SUA LOJA AQUI

document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-configurator-card');

    productCards.forEach(card => {
        const modelName = card.dataset.modelName;

        // Elementos DENTRO do card atual
        const colorSwatches = card.querySelectorAll('.color-swatch');
        const capacitySelectors = card.querySelectorAll('.selector[data-capacity]');
        const conditionSelectors = card.querySelectorAll('.selector[data-condition]');
        const buyButton = card.querySelector('.buy-button');
        const imageFront = card.querySelector('.product-image-front');
        const imageBack = card.querySelector('.product-image-back');
        const availabilityNotice = card.querySelector('.availability-notice');
        
        // --- NOVO: Referência para o botão 'Entendido' ---
        const closeNoticeBtn = card.querySelector('.close-notice-btn');

        // Lógica para a seleção de COR (sem alterações)
        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                card.querySelector('.color-swatch.selected').classList.remove('selected');
                swatch.classList.add('selected');
                const newFrontImage = swatch.dataset.frontImage;
                const newBackImage = swatch.dataset.backImage;
                if (newFrontImage && newBackImage) {
                    imageFront.src = newFrontImage;
                    imageBack.src = newBackImage;
                }
            });
        });

        // Lógica para a seleção de CONDIÇÃO (sem alterações)
        conditionSelectors.forEach(selector => {
            selector.addEventListener('click', () => {
                card.querySelector('.selector[data-condition].selected').classList.remove('selected');
                selector.classList.add('selected');

                const selectedCondition = selector.dataset.condition;
                if (selectedCondition === 'Usado' && availabilityNotice) {
                    availabilityNotice.classList.add('visible');
                } else if (availabilityNotice) {
                    availabilityNotice.classList.remove('visible');
                }
            });
        });
        
        // --- NOVO: Lógica para o botão 'Entendido' ---
        if (closeNoticeBtn && availabilityNotice) {
            closeNoticeBtn.addEventListener('click', () => {
                availabilityNotice.classList.remove('visible');
            });
        }

        // Lógica para a seleção de ARMAZENAMENTO (sem alterações)
        capacitySelectors.forEach(selector => {
            selector.addEventListener('click', () => {
                card.querySelector('.selector[data-capacity].selected').classList.remove('selected');
                selector.classList.add('selected');
            });
        });

        // Lógica para o BOTÃO DE COMPRA (sem alterações)
        buyButton.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedColor = card.querySelector('.color-swatch.selected').dataset.color;
            const selectedCapacity = card.querySelector('.selector[data-capacity].selected').dataset.capacity;
            const selectedCondition = card.querySelector('.selector[data-condition].selected').dataset.condition;
            
            const mensagem = `Olá, Maximo Imports! Tenho interesse no seguinte modelo:\n\n- Produto: ${modelName}\n- Condição: ${selectedCondition}\n- Cor: ${selectedColor}\n- Capacidade: ${selectedCapacity}\n\nAguardo o contato!`;
            const mensagemCodificada = encodeURIComponent(mensagem);
            const whatsappUrl = `https://wa.me/${numeroWhatsapp}?text=${mensagemCodificada}`;
            window.open(whatsappUrl, '_blank');
        });
    });
});