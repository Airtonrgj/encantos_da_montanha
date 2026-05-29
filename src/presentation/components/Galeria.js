/**
 * Galeria.js
 * Componente responsável pela interatividade da galeria de imagens
 * Fornece funcionalidades de lightbox e navegação
 */

class Galeria {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.initEventListeners();
    }

    /**
     * Inicializa os event listeners para os itens da galeria
     */
    initEventListeners() {
        if (this.galleryItems.length === 0) return;

        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', (e) => this.openLightbox(e, index));
        });

        // Suporte para navegação por teclado
        document.addEventListener('keydown', (e) => this.handleKeyNavigation(e));
    }

    /**
     * Abre a galeria em modo lightbox
     * @param {Event} event - Evento do clique
     * @param {number} index - Índice do item clicado
     */
    openLightbox(event, index) {
        const img = event.target.querySelector('img');
        if (!img) return;

        // Cria o modal lightbox
        const modal = this.createLightboxModal(img.src, img.alt, index);
        document.body.appendChild(modal);

        // Trata click fora da imagem para fechar
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Botão de fechar
        const closeBtn = modal.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => modal.remove());
    }

    /**
     * Cria o elemento do modal lightbox
     * @param {string} src - URL da imagem
     * @param {string} alt - Texto alternativo da imagem
     * @param {number} index - Índice do item
     * @returns {HTMLElement} Modal lightbox
     */
    createLightboxModal(src, alt, index) {
        const modal = document.createElement('div');
        modal.className = 'lightbox-modal';
        modal.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Fechar galeria">&times;</button>
                <div class="lightbox-image-container">
                    <img src="${src}" alt="${alt}" class="lightbox-image">
                </div>
                <div class="lightbox-caption">${alt}</div>
                <div class="lightbox-counter">
                    <span>${index + 1}</span> de <span>${this.galleryItems.length}</span>
                </div>
            </div>
        `;

        // Adiciona CSS para o lightbox se não existir
        this.injectLightboxStyles();

        return modal;
    }

    /**
     * Injeta estilos CSS para o lightbox
     */
    injectLightboxStyles() {
        const styleId = 'lightbox-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .lightbox-modal {
                display: flex;
                align-items: center;
                justify-content: center;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.85);
                z-index: 1000;
                animation: fadeIn 0.3s ease-in-out;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 16px;
            }

            .lightbox-image-container {
                max-width: 100%;
                max-height: 75vh;
                overflow: auto;
            }

            .lightbox-image {
                max-width: 100%;
                max-height: 75vh;
                object-fit: contain;
            }

            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 36px;
                cursor: pointer;
                transition: opacity 0.2s;
                z-index: 1001;
            }

            .lightbox-close:hover {
                opacity: 0.7;
            }

            .lightbox-caption {
                color: white;
                font-size: 16px;
                text-align: center;
                max-width: 100%;
            }

            .lightbox-counter {
                color: rgba(255, 255, 255, 0.6);
                font-size: 14px;
                text-align: center;
            }

            @media (max-width: 768px) {
                .lightbox-content {
                    max-width: 95%;
                }

                .lightbox-close {
                    top: 10px;
                    right: 10px;
                    font-size: 28px;
                }

                .lightbox-image {
                    max-height: 60vh;
                }
            }
        `;

        document.head.appendChild(style);
    }

    /**
     * Trata navegação por teclado no lightbox
     * @param {KeyboardEvent} event - Evento de teclado
     */
    handleKeyNavigation(event) {
        const modal = document.querySelector('.lightbox-modal');
        if (!modal) return;

        if (event.key === 'Escape') {
            modal.remove();
        }
    }

    /**
     * Inicializa lazy loading para imagens da galeria
     */
    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target.querySelector('img');
                        if (img && img.dataset.src) {
                            img.src = img.dataset.src;
                            observer.unobserve(entry.target);
                        }
                    }
                });
            });

            this.galleryItems.forEach((item) => {
                observer.observe(item);
            });
        }
    }
}

// Inicializa a galeria quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new Galeria();
});
