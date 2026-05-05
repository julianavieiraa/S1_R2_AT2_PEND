const url = "http://localhost:8000/produtos";

const lista = document.getElementById("listaProdutos");
const form = document.getElementById("formProduto");

const nomeInput = document.getElementById("nome");
const precoInput = document.getElementById("preco");
const imagemInput = document.getElementById("imagem");

const telaCadastro = document.getElementById("telaCadastro");
const telaLista = document.getElementById("telaLista");

async function fetchProducts() {
    try {
        const res = await fetch(url);
        const data = await res.json();

        const listaProdutos = Array.isArray(data)
            ? data
            : data.produtos || data.dados || [];

        lista.innerHTML = "";

        listaProdutos.forEach(produto => {
            const id = produto.id_produto ?? produto.id ?? produto.idProduto;

            const imagem = produto.imagem?.startsWith("http")
                ? produto.imagem
                : `http://localhost:8000/uploads/${produto.imagem}`;

            const div = document.createElement("div");
            div.classList.add("produto");

            const img = document.createElement("img");
            img.classList.add("imgProduto");
            img.src = imagem;

            const nome = document.createElement("p");
            nome.classList.add("nomeProduto");
            nome.textContent = produto.nome;

            const preco = document.createElement("p");
            preco.classList.add("precoProduto");
            preco.textContent = `Preço: R$ ${Number(produto.preco).toFixed(2)}`;

            const botoes = document.createElement("div");
            botoes.classList.add("botoes-card");

            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.classList.add("btnEditar");
            btnEditar.onclick = () => editarProduto(id);

            const btnExcluir = document.createElement("button");
            btnExcluir.textContent = "Excluir";
            btnExcluir.classList.add("btnExcluir");
            btnExcluir.onclick = () => deletarProduto(id);

            botoes.appendChild(btnEditar);
            botoes.appendChild(btnExcluir);

            div.appendChild(img);
            div.appendChild(nome);
            div.appendChild(preco);
            div.appendChild(botoes);

            lista.appendChild(div);
        });

    } catch (error) {
        console.log(error);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {
        nome: nomeInput.value,
        preco: Number(precoInput.value),
        id_categoria: 1,
        estoque: 10,
        imagem: imagemInput.value
    };

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            console.log("Erro ao cadastrar:", await res.text());
            return;
        }

        form.reset();
        fetchProducts();
        mostrarLista();

    } catch (error) {
        console.log(error);
    }
});

let idParaExcluir = null;

function deletarProduto(id) {
    if (!id) {
        console.log("ID inválido para exclusão");
        return;
    }

    idParaExcluir = id;
    document.getElementById("modalConfirmacao").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalConfirmacao").style.display = "none";
    idParaExcluir = null;
}

document.getElementById("btnConfirmar").onclick = async () => {
    if (!idParaExcluir) return;

    try {
        const res = await fetch(`${url}/${idParaExcluir}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            console.log("Erro ao excluir:", await res.text());
            return;
        }

        fecharModal();
        fetchProducts();

    } catch (error) {
        console.log(error);
    }
};

async function editarProduto(id) {
    try {
        const res = await fetch(`${url}/${id}`);
        const data = await res.json();

        const produto = data.produto?.[0] || data.produto || data;

        if (!produto) {
            console.log("Produto não encontrado");
            return;
        }

        document.getElementById("editId").value = id;
        document.getElementById("editNome").value = produto.nome;
        document.getElementById("editPreco").value = produto.preco;
        document.getElementById("editImagem").value = produto.imagem || "";

        telaLista.style.display = "none";
        telaCadastro.style.display = "none";
        document.getElementById("telaEdicao").style.display = "block";

    } catch (error) {
        console.log(error);
    }
}

async function salvarEdicao() {
    try {
        const id = document.getElementById("editId").value;

        const body = {
            nome: document.getElementById("editNome").value,
            preco: Number(document.getElementById("editPreco").value),
            id_categoria: 1,
            estoque: 10
        };

        const imagem = document.getElementById("editImagem").value;

        if (imagem.trim() !== "") {
            body.imagem = imagem;
        }

        const res = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            console.log("Erro ao editar:", await res.text());
            return;
        }

        cancelarEdicao();
        fetchProducts();

    } catch (error) {
        console.log(error);
    }
}

function cancelarEdicao() {
    document.getElementById("telaEdicao").style.display = "none";
    telaLista.style.display = "block";
}

function mostrarCadastro() {
    const telaCadastro = document.getElementById("telaCadastro");

    if (telaCadastro.style.display === "none") {
        telaCadastro.style.display = "block";
    } else {
        telaCadastro.style.display = "none";
    }
}

function mostrarLista() {
    document.getElementById("telaHome").style.display = "none";
    telaCadastro.style.display = "none";
    telaLista.style.display = "block";
    document.getElementById("telaEdicao").style.display = "none";
    fetchProducts();
}

function voltarHome() {
    document.getElementById("telaHome").style.display = "block";
    telaCadastro.style.display = "none";
    telaLista.style.display = "none";
    document.getElementById("telaEdicao").style.display = "none";
}

fetchProducts();