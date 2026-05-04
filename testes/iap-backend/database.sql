-- Banco de dados IAP (Inteligência de Acessibilidade Petrobras)
CREATE DATABASE IF NOT EXISTS iap_db;
USE iap_db;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL, -- em produção usaremos hash
    perfil ENUM('funcionario', 'gestor', 'rh', 'admin') DEFAULT 'funcionario',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Demandas (Tickets de Acessibilidade)
CREATE TABLE IF NOT EXISTS demandas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50) NOT NULL,
    prioridade ENUM('Baixa', 'Média', 'Alta', 'Urgente') DEFAULT 'Média',
    status ENUM('Aberto', 'Em análise', 'Em andamento', 'Aguardando', 'Resolvido') DEFAULT 'Aberto',
    localizacao VARCHAR(150),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Inserindo alguns usuários de teste (A senha de todos é '123456')
INSERT INTO usuarios (nome, email, senha, perfil) VALUES 
('Maria Ferreira', 'funcionario@petrobras.com.br', '123456', 'funcionario'),
('Carlos Lima', 'gestor@petrobras.com.br', '123456', 'gestor'),
('Ana Paula', 'rh@petrobras.com.br', '123456', 'rh'),
('Admin do Sistema', 'admin@petrobras.com.br', '123456', 'admin');
