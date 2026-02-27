const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco
const db = mysql.createConnection({
  host: 'benserverplex.ddns.net',
  user: 'alunos',       // seu usuário do MySQL
  password: 'senhaAlunos',       // sua senha (ou vazio se não tiver)
  database: 'web_03tb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao banco de dados!');
});

// Rota GET para listar músicas
app.get('/musicas', (req, res) => {
  db.query('SELECT * FROM leticia_musicas', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Rota POST para cadastrar música
app.post('/musicas', (req, res) => {
  const { titulo, artista, album, ano, genero } = req.body;
  const sql = 'INSERT INTO leticia_musicas (titulo, artista, album, ano, genero) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [titulo, artista, album, ano, genero], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Música cadastrada com sucesso!', id: result.insertId });
  });
});

// Inicia servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
