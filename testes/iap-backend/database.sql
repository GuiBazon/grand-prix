-- Banco de dados IAP (Inteligência de Acessibilidade Petrobras)
CREATE DATABASE IF NOT EXISTS iap_db;
USE iap_db;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil ENUM('funcionario', 'gestor', 'rh', 'admin') DEFAULT 'funcionario',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Demandas (Tickets de Acessibilidade)
CREATE TABLE IF NOT EXISTS demandas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    tipo ENUM('Física', 'Digital', 'Comportamental', 'Outros') NOT NULL,
    prioridade ENUM('Baixa', 'Média', 'Alta', 'Urgente') DEFAULT 'Média',
    status ENUM('Aberto', 'Em análise', 'Em andamento', 'Aguardando', 'Resolvido', 'Cancelado') DEFAULT 'Aberto',
    localizacao VARCHAR(150),
    anexo_url VARCHAR(255),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de Comentários / Histórico nas Demandas
CREATE TABLE IF NOT EXISTS comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    demanda_id INT NOT NULL,
    usuario_id INT NOT NULL,
    comentario TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (demanda_id) REFERENCES demandas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Inserindo usuários de teste 
-- NOTA: Senhas em hash bcrypt (123456)
INSERT INTO usuarios (nome, email, senha, perfil) VALUES 
('Maria Ferreira', 'funcionario@petrobras.com.br', '$2b$10$T0w1E5pZ8.n4lV7yK1R6.OiX1r6d.L.O91b.g4wK3pQ0z0a6lM1qS', 'funcionario'),
('Carlos Lima', 'gestor@petrobras.com.br', '$2b$10$T0w1E5pZ8.n4lV7yK1R6.OiX1r6d.L.O91b.g4wK3pQ0z0a6lM1qS', 'gestor'),
('Ana Paula', 'rh@petrobras.com.br', '$2b$10$T0w1E5pZ8.n4lV7yK1R6.OiX1r6d.L.O91b.g4wK3pQ0z0a6lM1qS', 'rh'),
('Admin do Sistema', 'admin@petrobras.com.br', '$2b$10$T0w1E5pZ8.n4lV7yK1R6.OiX1r6d.L.O91b.g4wK3pQ0z0a6lM1qS', 'admin');
