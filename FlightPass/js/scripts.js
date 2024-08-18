document.addEventListener("DOMContentLoaded", function() {
    // Função para exibir o modal
    function openModal(imgSrc, description) {
        const modal = document.querySelector(".modal");
        const modalContent = document.querySelector(".modal-content");
        const modalDescription = document.querySelector(".modal-description");

        modalContent.innerHTML = `<img src="${imgSrc}" alt="${description}">`;
        modalDescription.textContent = description;

        modal.style.display = "flex";
    }

    // Função para fechar o modal
    function closeModal() {
        const modal = document.querySelector(".modal");
        modal.style.display = "none";
    }

    // Adiciona eventos de clique às imagens da grid
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(item => {
        item.addEventListener("click", function() {
            const imgSrc = this.querySelector("img").src;
            const description = this.querySelector(".description").textContent;

            openModal(imgSrc, description);
        });
    });

    // Adiciona evento de clique ao botão de fechar do modal
    const modalClose = document.querySelector(".modal-close");
    modalClose.addEventListener("click", closeModal);

    // Adiciona evento de clique fora da área do modal para fechar
    window.addEventListener("click", function(event) {
        const modal = document.querySelector(".modal");
        if (event.target === modal) {
            closeModal();
        }
    });

    // Código existente para o carrossel
    const carousel = document.querySelector(".carousel");
    const carouselItems = document.querySelectorAll(".carousel-item");
    let currentIndex = 0;

    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            item.classList.toggle("active", i === index);
        });

        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    showSlide(currentIndex);

    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    prevButton.addEventListener("click", function() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentIndex);
    });

    nextButton.addEventListener("click", function() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
    });

    // Código existente para o formulário de reserva
    const pagamentoRadios = document.querySelectorAll('input[name="pagamento"]');
    const parcelamentoFieldset = document.getElementById("parcelamento");
    const parcelasSelect = document.getElementById("parcelas");

    pagamentoRadios.forEach(radio => {
        radio.addEventListener("change", function() {
            if (this.value === "cartao") {
                parcelamentoFieldset.style.display = "block";
                updateParcelas();
            } else {
                parcelamentoFieldset.style.display = "none";
            }
        });
    });

    function updateParcelas() {
        const produtoSelect = document.getElementById("produto");
        const valor = parseFloat(produtoSelect.options[produtoSelect.selectedIndex].text.split(' - R$ ')[1]);

        parcelasSelect.innerHTML = "";
        for (let i = 1; i <= 12; i++) {
            let option = document.createElement("option");
            let valorParcelado;

            if (i <= 5) {
                valorParcelado = (valor / i).toFixed(2);
            } else {
                valorParcelado = ((valor * 1.05) / i).toFixed(2);
            }

            option.value = i;
            option.textContent = `${i}x de R$ ${valorParcelado}`;
            parcelasSelect.appendChild(option);
        }
    }
});
