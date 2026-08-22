require('dotenv').config();

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const Database = require('better-sqlite3');

const dbPath = process.env.DB_PATH
    ? path.resolve(process.cwd(), process.env.DB_PATH)
    : path.join(__dirname, 'database.sqlite');
const schemaPath = path.join(__dirname, 'schema.sql');

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');
db.exec(fs.readFileSync(schemaPath, 'utf8'));

function tabelaVazia(nomeTabela) {
    const { total } = db.prepare(`SELECT COUNT(*) AS total FROM ${nomeTabela}`).get();
    return total === 0;
}

const CATEGORIAS = [
    { nome: 'Saúde Sexual', slug: 'saude-sexual', descricao: 'Informações sobre saúde sexual, ISTs e prevenção.' },
    { nome: 'Saúde Reprodutiva', slug: 'saude-reprodutiva', descricao: 'Ciclo reprodutivo, gestação e cuidados.' },
    { nome: 'Planejamento Familiar', slug: 'planejamento-familiar', descricao: 'Métodos contraceptivos e planejamento familiar.' },
    { nome: 'Puberdade e Adolescência', slug: 'puberdade-adolescencia', descricao: 'Mudanças do corpo e da mente na adolescência.' },
    { nome: 'Consentimento e Relacionamentos', slug: 'consentimento-relacionamentos', descricao: 'Relacionamentos saudáveis, consentimento e respeito.' },
    { nome: 'Prevenção e ISTs', slug: 'prevencao-ists', descricao: 'Prevenção, testagem e tratamento de ISTs.' },
];

function seedCategorias() {
    if (!tabelaVazia('categoria')) return;
    const inserir = db.prepare('INSERT INTO categoria (nome, slug, descricao) VALUES (?, ?, ?)');
    const transacao = db.transaction((categorias) => {
        categorias.forEach((c) => inserir.run(c.nome, c.slug, c.descricao));
    });
    transacao(CATEGORIAS);
    console.log(`Categorias inseridas: ${CATEGORIAS.length}`);
}

function seedConteudos() {
    if (!tabelaVazia('conteudo')) return;

    const categoriaIdPorSlug = Object.fromEntries(
        db.prepare('SELECT id, slug FROM categoria').all().map((c) => [c.slug, c.id])
    );

    const CONTEUDOS = [
        {
            categoriaSlug: 'prevencao-ists',
            titulo: 'O que são ISTs',
            slug: 'o-que-sao-ists',
            resumo: 'Entenda o que são as infecções sexualmente transmissíveis.',
            corpoHtml: '<p>Conteúdo educativo sobre infecções sexualmente transmissíveis (ISTs), formas de transmissão e prevenção.</p>',
            fontes: 'Ministério da Saúde',
            faixaEtaria: 'todas',
        },
        {
            categoriaSlug: 'prevencao-ists',
            titulo: 'Uso correto do preservativo',
            slug: 'uso-correto-do-preservativo',
            resumo: 'Passo a passo para o uso correto do preservativo masculino e feminino.',
            corpoHtml: '<p>O preservativo, quando usado corretamente, é um dos métodos mais eficazes de prevenção de ISTs e gravidez não planejada.</p>',
            fontes: 'Ministério da Saúde; OMS/OPAS',
            faixaEtaria: 'adolescente',
        },
        {
            categoriaSlug: 'planejamento-familiar',
            titulo: 'Métodos contraceptivos',
            slug: 'metodos-contraceptivos',
            resumo: 'Conheça os principais métodos contraceptivos disponíveis no SUS.',
            corpoHtml: '<p>Conteúdo educativo sobre os métodos contraceptivos ofertados pelo Sistema Único de Saúde (SUS), indicações e cuidados.</p>',
            fontes: 'Ministério da Saúde; FEBRASGO',
            faixaEtaria: 'adulto',
        },
        {
            categoriaSlug: 'saude-reprodutiva',
            titulo: 'Pré-natal: por que é importante',
            slug: 'pre-natal-por-que-e-importante',
            resumo: 'Entenda a importância do acompanhamento pré-natal.',
            corpoHtml: '<p>O acompanhamento pré-natal é essencial para a saúde da gestante e do bebê.</p>',
            fontes: 'Ministério da Saúde; FEBRASGO',
            faixaEtaria: 'adulto',
        },
        {
            categoriaSlug: 'puberdade-adolescencia',
            titulo: 'Mudanças do corpo na puberdade',
            slug: 'mudancas-do-corpo-na-puberdade',
            resumo: 'As principais transformações físicas e emocionais da puberdade.',
            corpoHtml: '<p>A puberdade traz mudanças físicas e emocionais que fazem parte do desenvolvimento normal.</p>',
            fontes: 'Ministério da Saúde',
            faixaEtaria: 'adolescente',
        },
        {
            categoriaSlug: 'consentimento-relacionamentos',
            titulo: 'O que é consentimento',
            slug: 'o-que-e-consentimento',
            resumo: 'Entenda o conceito de consentimento em relacionamentos.',
            corpoHtml: '<p>Consentimento é um acordo claro, livre e contínuo entre as pessoas envolvidas.</p>',
            fontes: 'Ministério da Saúde; OMS/OPAS',
            faixaEtaria: 'todas',
        },
        {
            categoriaSlug: 'consentimento-relacionamentos',
            titulo: 'Sinais de um relacionamento saudável',
            slug: 'sinais-de-um-relacionamento-saudavel',
            resumo: 'Características de relacionamentos baseados em respeito.',
            corpoHtml: '<p>Relacionamentos saudáveis são baseados em respeito, confiança e comunicação.</p>',
            fontes: 'Ministério da Saúde',
            faixaEtaria: 'adolescente',
        },
        {
            categoriaSlug: 'saude-sexual',
            titulo: 'Testagem para ISTs: quando e como fazer',
            slug: 'testagem-para-ists-quando-e-como-fazer',
            resumo: 'Informações sobre testagem gratuita para ISTs pelo SUS.',
            corpoHtml: '<p>A testagem regular é uma ferramenta importante de prevenção e cuidado com a saúde sexual.</p>',
            fontes: 'Ministério da Saúde',
            faixaEtaria: 'adulto',
        },
    ];

    const inserir = db.prepare(
        `INSERT INTO conteudo (categoria_id, titulo, slug, resumo, corpo_html, fontes, faixa_etaria, publicado)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1)`
    );
    const transacao = db.transaction((conteudos) => {
        conteudos.forEach((c) =>
            inserir.run(
                categoriaIdPorSlug[c.categoriaSlug],
                c.titulo,
                c.slug,
                c.resumo,
                c.corpoHtml,
                c.fontes,
                c.faixaEtaria
            )
        );
    });
    transacao(CONTEUDOS);
    console.log(`Conteudos inseridos: ${CONTEUDOS.length}`);
}

const GLOSSARIO = [
    { termo: 'IST', definicao: 'Infecção Sexualmente Transmissível, transmitida principalmente por contato sexual.' },
    { termo: 'Preservativo', definicao: 'Método de barreira que previne ISTs e gravidez não planejada.' },
    { termo: 'Consentimento', definicao: 'Acordo claro, livre, informado e contínuo entre as pessoas envolvidas em uma relação.' },
    { termo: 'Puberdade', definicao: 'Período de transformações físicas e hormonais que marca a transição da infância para a vida adulta.' },
    { termo: 'Pré-natal', definicao: 'Acompanhamento médico realizado durante a gestação.' },
    { termo: 'Método contraceptivo', definicao: 'Recurso utilizado para evitar uma gravidez não planejada.' },
    { termo: 'HIV', definicao: 'Vírus da Imunodeficiência Humana, transmitido principalmente por via sexual e sanguínea.' },
    { termo: 'Planejamento familiar', definicao: 'Conjunto de ações que ajudam a pessoa ou casal a decidir sobre ter ou não filhos e quando.' },
    { termo: 'Ciclo menstrual', definicao: 'Conjunto de mudanças hormonais e físicas que ocorrem no corpo da mulher, em média a cada 28 dias.' },
    { termo: 'Testagem', definicao: 'Exame realizado para identificar a presença de uma IST no organismo.' },
];

function seedGlossario() {
    if (!tabelaVazia('glossario')) return;
    const inserir = db.prepare('INSERT INTO glossario (termo, definicao) VALUES (?, ?)');
    const transacao = db.transaction((termos) => {
        termos.forEach((g) => inserir.run(g.termo, g.definicao));
    });
    transacao(GLOSSARIO);
    console.log(`Termos de glossario inseridos: ${GLOSSARIO.length}`);
}

function seedAdmin() {
    if (!tabelaVazia('usuario')) return;

    const nome = 'Administrador';
    const email = process.env.ADMIN_EMAIL;
    const senha = process.env.ADMIN_PASSWORD;

    if (!email || !senha) {
        console.warn('ADMIN_EMAIL/ADMIN_PASSWORD não definidos no .env — usuário admin não foi criado.');
        return;
    }

    const senhaHash = bcrypt.hashSync(senha, 10);
    db.prepare('INSERT INTO usuario (nome, email, senha_hash, papel) VALUES (?, ?, ?, ?)').run(
        nome,
        email,
        senhaHash,
        'admin'
    );
    console.log(`Usuario admin criado: ${email}`);
}

seedCategorias();
seedConteudos();
seedGlossario();
seedAdmin();

db.close();
console.log('Seed concluido:', dbPath);
