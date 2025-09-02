// --- CONFIGURAÇÕES ---
const numeroWhatsapp = '5513974200082'; // Padrão definido

document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-configurator-card');

    productCards.forEach(card => {
        const modelName = card.dataset.modelName;
        const buyButton = card.querySelector('.buy-button');
        const imageFront = card.querySelector('.product-image-front');
        
        // Lógica para todos os seletores de opção (genérico)
        const optionGroups = card.querySelectorAll('.option-group');
        optionGroups.forEach(group => {
            const selectors = group.querySelectorAll('.selector, .color-swatch');
            selectors.forEach(selector => {
                selector.addEventListener('click', () => {
                    // Remove a seleção de outros itens no MESMO grupo
                    group.querySelector('.selected').classList.remove('selected');
                    selector.classList.add('selected');

                    // Lógica especial para atualizar imagem se for um seletor de cor
                    const newFrontImage = selector.dataset.frontImage;
                    const imageBack = card.querySelector('.product-image-back'); // Busca a imagem traseira se existir
                    const newBackImage = selector.dataset.backImage;
                    
                    if (newFrontImage && imageFront) {
                        imageFront.src = newFrontImage;
                    }
                    if (newBackImage && imageBack) {
                        imageBack.src = newBackImage;
                    }
                });
            });
        });

        // Lógica para o BOTÃO DE COMPRA (agora 100% dinâmico)
        buyButton.addEventListener('click', (event) => {
            event.preventDefault();
            
            let mensagem = `Olá, Maximo Imports! Tenho interesse no seguinte modelo:\n\n- Produto: ${modelName}\n`;

            // Itera sobre cada grupo de opções para montar a mensagem
            optionGroups.forEach(group => {
                const label = group.querySelector('.option-label').innerText.replace(':', '');
                const selectedOption = group.querySelector('.selected').dataset.value;
                if (label && selectedOption) {
                    mensagem += `- ${label}: ${selectedOption}\n`;
                }
            });

            mensagem += `\nAguardo o contato!`;

            const mensagemCodificada = encodeURIComponent(mensagem);
            const whatsappUrl = `https://wa.me/${numeroWhatsapp}?text=${mensagemCodificada}`;
            window.open(whatsappUrl, '_blank');
        });
    });
});