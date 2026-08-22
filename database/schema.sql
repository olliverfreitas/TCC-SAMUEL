-- Plataforma Web Educativa - Saude Sexual e Reprodutiva e Planejamento Familiar
-- Schema do banco de dados (SQLite)

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha_hash TEXT NOT NULL,
    criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    descricao TEXT
);

CREATE TABLE IF NOT EXISTS artigos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria_id INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    resumo TEXT,
    conteudo TEXT NOT NULL,
    fonte TEXT,
    publicado INTEGER NOT NULL DEFAULT 1,
    criado_em TEXT NOT NULL DEFAULT (datetime('now')),
    atualizado_em TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE IF NOT EXISTS quiz_perguntas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria_id INTEGER,
    enunciado TEXT NOT NULL,
    explicacao TEXT,
    ordem INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE IF NOT EXISTS quiz_opcoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pergunta_id INTEGER NOT NULL,
    texto TEXT NOT NULL,
    correta INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (pergunta_id) REFERENCES quiz_perguntas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS duvidas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pergunta TEXT NOT NULL,
    resposta TEXT,
    status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'respondida')),
    criado_em TEXT NOT NULL DEFAULT (datetime('now')),
    respondido_em TEXT
);

CREATE INDEX IF NOT EXISTS idx_artigos_categoria ON artigos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_quiz_opcoes_pergunta ON quiz_opcoes(pergunta_id);
CREATE INDEX IF NOT EXISTS idx_duvidas_status ON duvidas(status);
