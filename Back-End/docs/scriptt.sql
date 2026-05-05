CREATE DATABASE IF NOT EXISTS loja_informatica;
USE loja_informatica;

CREATE TABLE categorias(
    id_categoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(45) NOT NULL,
    ativo TINYINT NOT NULL,
    datacad TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0,
    id_categoria INT,
    datacad TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_produtos_categorias FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

CREATE TABLE imagens_produto (
    id_imagem INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    id_produto INT NOT NULL,
    CONSTRAINT fk_imagens_produtos FOREIGN KEY (id_produto) REFERENCES produtos(id_produto) ON DELETE CASCADE
);

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    telefone VARCHAR(20) UNIQUE,
    endereco VARCHAR(255),
    datacad TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vendedores (
    id_vendedor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
	telefone VARCHAR(20) UNIQUE
);

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_cliente INT NOT NULL,
    id_vendedor INT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_pedidos_clientes FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    CONSTRAINT fk_pedidos_vendedores FOREIGN KEY (id_vendedor) REFERENCES vendedores(id_vendedor)
);

CREATE TABLE itens_pedido (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_itens_pedidos FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    CONSTRAINT fk_itens_produtos FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);
