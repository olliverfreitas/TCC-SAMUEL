-- Dados iniciais de exemplo

INSERT OR IGNORE INTO categorias (nome, slug, descricao) VALUES
    ('Saude Sexual', 'saude-sexual', 'Informacoes sobre saude sexual, ISTs e prevencao.'),
    ('Saude Reprodutiva', 'saude-reprodutiva', 'Ciclo reprodutivo, gestacao e cuidados.'),
    ('Planejamento Familiar', 'planejamento-familiar', 'Metodos contraceptivos e planejamento familiar.');

INSERT OR IGNORE INTO artigos (categoria_id, titulo, slug, resumo, conteudo, fonte) VALUES
    (1, 'O que sao ISTs', 'o-que-sao-ists',
     'Entenda o que sao as infeccoes sexualmente transmissiveis.',
     'Conteudo educativo baseado em fontes oficiais do Ministerio da Saude sobre infeccoes sexualmente transmissiveis (ISTs), formas de transmissao e prevencao.',
     'Ministerio da Saude'),
    (3, 'Metodos contraceptivos', 'metodos-contraceptivos',
     'Conheca os principais metodos contraceptivos disponiveis no SUS.',
     'Conteudo educativo sobre os metodos contraceptivos ofertados pelo Sistema Unico de Saude (SUS), incluindo indicacoes e cuidados.',
     'Ministerio da Saude');

INSERT OR IGNORE INTO quiz_perguntas (categoria_id, enunciado, explicacao, ordem) VALUES
    (1, 'O uso de preservativo previne ISTs?', 'O preservativo, quando usado corretamente, e um dos metodos mais eficazes de prevencao de ISTs.', 1);

INSERT OR IGNORE INTO quiz_opcoes (pergunta_id, texto, correta) VALUES
    (1, 'Sim', 1),
    (1, 'Nao', 0);
