$(document).ready(function () {
    // Navegação suave: Quando clicar nos links, a rolagem será suave
    $('.navigation a').on('click', function (e) {
        e.preventDefault(); // Evita a ação padrão do link

        const target = $(this).attr('href'); // Obtém o ID da seção alvo
        const targetOffset = $(target).offset().top; // Calcula a posição da seção alvo

        $('html, body').stop(true).animate(
            { scrollTop: targetOffset }, // Anima a rolagem até a seção
            {
                duration: 600, // Duração da animação
                easing: 'easeInOutExpo' // Tipo de transição
            }
        );
    });

    // Efeito de movimento na imagem do camaleão
    const img = document.getElementById("img");
    img.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = img.getBoundingClientRect(); // Posição da imagem
        const x = ((e.clientX - left) / width - 0.5) * 60; // Cálculo para rotação no eixo X
        const y = ((e.clientY - top) / height - 0.5) * 60; // Cálculo para rotação no eixo Y

        img.style.transform = `rotateX(${-y}deg) rotateY(${x}deg) scale(1.1)`; // Aplica a rotação
    });

    img.addEventListener("mouseleave", () => {
        img.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)"; // Restaura a imagem ao sair com o mouse
    });

    // Efeito de movimento do fundo do header
    const header = document.getElementById("header");
    let isPaused = false; // Controla se o fundo está pausado ao interagir com a imagem

    header.addEventListener("mousemove", (e) => {
        if (isPaused) return; // Pausa o movimento se necessário

        const { left, top, width, height } = header.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 20; // Movimento horizontal
        const y = ((e.clientY - top) / height - 0.5) * 20; // Movimento vertical

        header.style.backgroundPosition = `${50 + x}% ${50 + y}%`; // Move o fundo
    });

    header.addEventListener("mouseleave", () => {
        if (!isPaused) {
            header.style.transition = "background-position 1s ease"; // Suaviza a transição do fundo
            header.style.backgroundPosition = "center"; // Restaura a posição inicial
            setTimeout(() => {
                header.style.transition = ""; // Remove a transição para novos movimentos
            }, 1000);
        }
    });

    // Pausa o movimento do fundo ao interagir com o camaleão
    img.addEventListener("mouseenter", () => {
        isPaused = true; // Pausa o movimento
    });

    img.addEventListener("mouseleave", () => {
        isPaused = false; // Retoma o movimento
    });

    // Simulação de horários
    const horariosSimulados = {
        "2025-01-25": ["09:00", "10:30", "13:00", "15:30","16:30","17:30","18:30","19:30","20:00","20:30","21:30","22:00","23:00"], // Data com horários
        "2025-01-28": [] // Data sem horários
    };

    let horarioSelecionado = null;






    
    // Inicializa o calendário
    flatpickr("#calendario", {
        inline: true,
        dateFormat: "Y-m-d",
        defaultDate: "today",
        locale: "pt",
        onChange: function (selectedDates, dateStr) {
            atualizarHorarios(dateStr);
        }
    });

    // Atualiza os horários disponíveis
    function atualizarHorarios(dataEscolhida) {
        const listaHorarios = $("#lista-horarios");
        const agendamentoContainer = document.querySelector(".agendamento-container"); // Seleciona o contêiner principal

        listaHorarios.empty(); // Limpa os horários anteriores

        if (horariosSimulados[dataEscolhida] && horariosSimulados[dataEscolhida].length > 0) {
            horariosSimulados[dataEscolhida].forEach((horario) => {
                const item = $("<div>")
                    .addClass("horario-item")
                    .text(horario)
                    .on("click", function () {
                        selecionarHorario($(this), horario);
                    });
                listaHorarios.append(item);
            });

            // Define o padding padrão (60px) quando há horários
            agendamentoContainer.style.padding = "60px";
        } else {
            // Adiciona a mensagem de indisponibilidade ocupando a área
            listaHorarios.append(
                $("<div>").addClass("horario-indisponivel").text("Nenhum horário disponível.")
            );

            // Define o padding para 60px quando não há horários
            agendamentoContainer.style.padding = "60px";
        }
    }

    // Seleciona um horário
    function selecionarHorario(elemento, horario) {
        $(".horario-item").removeClass("selecionado");
        elemento.addClass("selecionado");
        horarioSelecionado = horario;
        validarFormulario();
    }

    // Valida o formulário
    function validarFormulario() {
        const nome = $("#nome").val().trim();
        const telefone = $("#telefone").val().trim();
        const email = $("#email").val().trim();
        const especialidade = $("#especialidade").val();
        const botao = $("#confirmar");

        if (nome && telefone && email && especialidade && horarioSelecionado) {
            botao.prop("disabled", false);
        } else {
            botao.prop("disabled", true);
        }
    }

    // Validação em tempo real
    $("#nome, #telefone, #email, #especialidade").on("input change", validarFormulario);

    // Atualiza os horários ao carregar a página
    atualizarHorarios("2025-01-25"); // Data inicial para exibição
});

$(document).ready(function () {
    // Atualiza os detalhes do cliente com base na especialidade selecionada
    $("#especialidade").on("change", function () {
        const selecionado = $(this).find(":selected"); // Obtém o item selecionado
        const nome = selecionado.data("nome"); // Nome do profissional
        const especialidade = selecionado.data("especialidade"); // Especialidade
        const imagem = selecionado.data("imagem"); // Caminho da imagem

        // Atualiza os campos do cabeçalho
        $("#cliente-nome").text(nome);
        $("#cliente-especialidade").text(especialidade);
        $("#cliente-imagem").attr("src", imagem);
    });
});




$(document).ready(function () {
    $("#slider-container").load("slider.html .slideshow", function () {
        console.log("Slider carregado com sucesso!");

        // Reexecuta o script do slider após o carregamento dinâmico
        $.getScript("slider.js", function () {
            console.log("Script do slider carregado novamente!");

            // Aguarda um pequeno tempo para garantir que tudo seja carregado corretamente
            setTimeout(() => {
                if ($(".slideshow").length > 0) {
                    const slideShow = new Slideshow({ showPagination: true });
                    console.log("Slider inicializado dentro da index.html com sucesso!");

                    // Delegação de eventos para garantir que os botões funcionem
                    $(document).on('click', '.js-slider-home-next', function () {
                        slideShow.nextSlide();
                    });

                    $(document).on('click', '.js-slider-home-prev', function () {
                        slideShow.prevSlide();
                    });
                } else {
                    console.log("Erro: Slider não encontrado dentro da index.html.");
                }
            }, 500); // Tempo de espera para garantir que o HTML foi carregado corretamente
        });

        // Garante que o scroll funcione
        $('body').css('overflow', 'auto');
    });
});



$(document).ready(function () {
    // Efeito parallax para a imagem de fundo do vídeo
    function addParallaxEffectToSliderBackground(sliderBackground) {
        if (sliderBackground) {
            sliderBackground.addEventListener("mousemove", (e) => {
                const { left, top, width, height } = sliderBackground.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5; // Movimento horizontal
                const y = (e.clientY - top) / height - 0.5; // Movimento vertical

                // Aplica o movimento parallax na imagem de fundo
                sliderBackground.style.transform = `translateX(${x * 30}px) translateY(${y * 30}px)`;
            });

            sliderBackground.addEventListener("mouseleave", () => {
                // Restaura a posição da imagem quando o mouse sai
                sliderBackground.style.transform = "translateX(0px) translateY(0px)";
            });
        }
    }

    // Quando o slide estiver ativo, aplica o efeito parallax à imagem de fundo
    function checkActiveSlide() {
        $(".js-slider-home-slide").each(function () {
            if ($(this).hasClass("is-current")) {
                const sliderBackground = $(this).find("#slider-background")[0]; // A imagem de fundo do slide
                addParallaxEffectToSliderBackground(sliderBackground);
            } else {
                // Remove o parallax se o slide não for o ativo
                $(this).find("#slider-background").css("transform", "translateX(0px) translateY(0px)");
            }
        });
    }

    // Inicializa o efeito no carregamento da página
    checkActiveSlide();

    // Sempre que um novo slide for ativado, reexecuta os efeitos e pausa o vídeo
    $(document).on("click", ".js-slider-home-next, .js-slider-home-prev", function () {
        setTimeout(() => {
            checkActiveSlide();
            pauseVideoOnSlideChange();
        }, 500);
    });

    // Função para pausar o vídeo ao trocar de slide
    function pauseVideoOnSlideChange() {
        $(".js-slider-home-slide").each(function () {
            if (!$(this).hasClass("is-current")) {
                const iframe = $(this).find("iframe");
                if (iframe.length) {
                    const videoSrc = iframe.attr("src");
                    iframe.attr("src", ""); // Remove o src para pausar o vídeo
                    iframe.attr("src", videoSrc); // Restaura o src original
                }
            }
        });
    }
});

