const carros = [
    { id: 1, modelo: 'Carro A', status: 'disponível', contato: '555-1234', imagem: 'carroA.jpg', preco: 'R$ 50.000', opcoes: 'Troca, Compra, Financia' },
    { id: 2, modelo: 'Carro B', status: 'vendido', contato: '555-5678', imagem: 'carroB.jpg', preco: 'R$ 60.000', opcoes: 'Troca, Compra, Financia' },
    { id: 3, modelo: 'Carro C', status: 'disponível', contato: '555-8765', imagem: 'carroC.jpg', preco: 'R$ 70.000', opcoes: 'Troca, Compra, Financia' },
];

function exibirCarros() {
    const listaDisponiveis = document.getElementById('lista-disponiveis');
    const listaVendidos = document.getElementById('lista-vendidos');

    carros.forEach(carro => {
        const divCarro = document.createElement('div');
        divCarro.className = 'carro';
        divCarro.innerHTML = `
            <h3>${carro.modelo}</h3>
            <img src="${carro.imagem}" alt="${carro.modelo}">
            <p>Preço: ${carro.preco}</p>
            <p>Opções: ${carro.opcoes}</p>
            <p>Status: ${carro.status}</p>
            <button onclick="contato('${carro.contato}')">Comprar</button>
divCarro.innerHTML = `
    <h3>${carro.modelo} (${carro.ano})</h3>
    <div id="carrossel-${carro.id}" class="carrossel">
        <button class="prev" onclick="mudarImagem(${carro.id}, -1)">&#10094;</button>
        <div class="imagens">
            ${carro.imagens.map(imagem => `<img src="${imagem}" alt="${carro.modelo}">`).join('')}
        </div>
        <button class="next" onclick="mudarImagem(${carro.id}, 1)">&#10095;</button>
    </div>
    <p>Preço: ${carro.preco}</p>
    <p>Status: ${carro.status}</p>
    <button onclick="contato('${carro.contato}')">Comprar</button>
    <button onclick="editarCarro(${carro.id})">Editar</button>
    <button onclick="removerCarro(${carro.id})">Remover</button>
`;
        `;

        if (carro.status === 'disponível') {
            listaDisponiveis.appendChild(divCarro);
        } else {
            listaVendidos.appendChild(divCarro);
        }
    });
}

function contato(numero) {
    const mensagem = `Olá, estou interessado no carro. Por favor, entre em contato pelo número ${numero}.`;
    window.open(`https://api.whatsapp.com/send?phone=${numero}&text=${mensagem}`, '_blank');
}

window.onload = exibirCarros;

function mudarImagem(carroId, direcao) {
    const carrossel = document.querySelector(`#carrossel-${carroId} .imagens`);
    const imagens = carrossel.children;
    let indexAtual = Array.from(imagens).findIndex(imagem => imagem.style.display !== 'none');
    
    if (indexAtual === -1) {
        indexAtual = 0;
    }
    
    imagens[indexAtual].style.display = 'none'; // Esconde a imagem atual
    let novoIndex = (indexAtual + direcao + imagens.length) % imagens.length;
    imagens[novoIndex].style.display = 'block'; // Mostra a nova imagem
}

// Inicialize as imagens (mostra apenas a primeira ao carregar)
function inicializarCarrossel() {
    document.querySelectorAll('.carrossel .imagens').forEach(carrossel => {
        Array.from(carrossel.children).forEach((imagem, index) => {
            imagem.style.display = index === 0 ? 'block' : 'none';
        });
    });
}

window.onload = () => {
    exibirCarros();
    inicializarCarrossel();
};

function salvarCarro() {
    const id = document.getElementById('carro-id').value;
    const modelo = document.getElementById('modelo').value;
    const ano = document.getElementById('ano').value;
    const preco = document.getElementById('preco').value;
    const status = document.getElementById('status').value;
    const imagens = document.getElementById('imagens').value.split(',');

    const novoCarro = { id: id || Date.now(), modelo, ano, preco, status, imagens, modeloDetalhado: modelo };

    if (id) {
        // Editar carro existente
        const index = carros.findIndex(carro => carro.id == id);
        if (index !== -1) carros[index] = novoCarro;
    } else {
        // Adicionar novo carro
        carros.push(novoCarro);
    }

    // Atualizar exibição
    atualizarCarros();
    document.getElementById('form-carro').reset(); // Limpar formulário
}

function editarCarro(id) {
    const carro = carros.find(carro => carro.id == id);
    if (carro) {
        document.getElementById('carro-id').value = carro.id;
        document.getElementById('modelo').value = carro.modelo;
        document.getElementById('ano').value = carro.ano;
        document.getElementById('preco').value = carro.preco;
        document.getElementById('status').value = carro.status;
        document.getElementById('imagens').value = carro.imagens.join(',');
    }
}

function atualizarCarros() {
    document.getElementById('lista-disponiveis').innerHTML = '';
    document.getElementById('lista-vendidos').innerHTML = '';
    exibirCarros();
}

function removerCarro(id) {
    const index = carros.findIndex(carro => carro.id == id);
    if (index !== -1) {
        carros.splice(index, 1); // Remover do array
    }
    atualizarCarros();
}
const senhaADM = "1234"; // Você pode mudar para uma senha mais segura

function verificarSenha() {
    const senha = document.getElementById('senha').value;
    if (senha === senhaADM) {
        document.getElementById('admin-login').style.display = 'none'; // Esconde a tela de login
        document.getElementById('admin-form').style.display = 'block'; // Mostra o formulário de administração
    } else {
        alert("Senha incorreta! Tente novamente.");
    }
}