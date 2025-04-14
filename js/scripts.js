document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    // Verifica se há uma preferência de tema salva no localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateIcon(savedTheme);
    }

    // Evento de clique para alternar o tema
    themeToggle.addEventListener("click", function () {
        if (body.classList.contains("dark-theme")) {
            body.classList.remove("dark-theme");
            localStorage.setItem("theme", "");
            updateIcon("");
        } else {
            body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark-theme");
            updateIcon("dark-theme");
        }
    });

    // Função para atualizar o ícone do botão
    function updateIcon(theme) {
        const icon = themeToggle.querySelector("i");
        if (theme === "dark-theme") {
            icon.classList.remove("bi-moon");
            icon.classList.add("bi-sun"); // Sol para indicar tema claro
        } else {
            icon.classList.remove("bi-sun");
            icon.classList.add("bi-moon"); // Lua para indicar tema escuro
        }
    }

    // Lógica da cartela e aposta
    const cartela = document.querySelector(".cartela");
    const apostaBtn = document.getElementById("apostaBtn");
    let numerosSelecionados = [];

    // Gerar a cartela com números de 1 a 60
    for (let i = 1; i <= 60; i++) {
        const numeroElem = document.createElement("div");
        numeroElem.classList.add("numero");
        numeroElem.textContent = i;
        numeroElem.addEventListener("click", function () {
            toggleSelecao(i, numeroElem);
        });
        cartela.appendChild(numeroElem);
    }

    // Função para selecionar ou desmarcar números
    function toggleSelecao(numero, elem) {
        if (numerosSelecionados.includes(numero)) {
            // Desmarcar o número
            numerosSelecionados = numerosSelecionados.filter(
                (n) => n !== numero
            );
            elem.classList.remove("selecionado");
        } else if (numerosSelecionados.length < 6) {
            // Selecionar o número (se menos de 6 já foram escolhidos)
            numerosSelecionados.push(numero);
            elem.classList.add("selecionado");
        } else {
            alert(
                "Você já selecionou 6 números. Desmarque um para selecionar outro."
            );
        }
        atualizarBotaoAposta();
    }

    // Atualizar o estado do botão de aposta
    function atualizarBotaoAposta() {
        if (numerosSelecionados.length === 6) {
            apostaBtn.disabled = false;
            apostaBtn.classList.add("enabled");
        } else {
            apostaBtn.disabled = true;
            apostaBtn.classList.remove("enabled");
        }
    }

    // Evento de clique no botão de aposta
    apostaBtn.addEventListener("click", function () {
        if (numerosSelecionados.length === 6) {
            const sorteio = sorteaSena();
            const acertos = contaAcertos(sorteio, numerosSelecionados);
            exibirResultado(sorteio, numerosSelecionados, acertos);
        }
    });

    // Função para sortear 6 números da Mega Sena
    function sorteaSena() {
        const resultado = [];
        while (resultado.length < 6) {
            const sorteado = Math.floor(Math.random() * 60) + 1;
            if (!resultado.includes(sorteado)) {
                resultado.push(sorteado);
            }
        }
        return resultado.sort((a, b) => a - b);
    }

    // Função para contar acertos
    function contaAcertos(sorteio, aposta) {
        return aposta.filter((num) => sorteio.includes(num)).length;
    }

    // Função para exibir o resultado
    function exibirResultado(sorteio, aposta, acertos) {
        document.getElementById("sorteio").textContent = sorteio.join(", ");
        document.getElementById("aposta").textContent = aposta
            .sort((a, b) => a - b)
            .join(", ");
        document.getElementById("acertos").textContent = acertos;

        const mensagemElem = document.getElementById("mensagem");
        switch (acertos) {
            case 4:
                mensagemElem.textContent =
                    "Parabéns! Você acertou a quadra! Sua premiação é R$ 250 mil";
                break;
            case 5:
                mensagemElem.textContent =
                    "Parabéns! Você acertou a quina! Sua premiação é R$ 750 mil";
                break;
            case 6:
                mensagemElem.textContent =
                    "Parabéns! Você é campeão da Mega Sena! Seu prêmio é R$ 55 milhões!";
                break;
            default:
                mensagemElem.textContent =
                    "Não foi dessa vez. Tente novamente!";
                break;
        }

        document.getElementById("resultado").classList.remove("hidden");
    }
});
