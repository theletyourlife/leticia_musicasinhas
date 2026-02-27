const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /musicas
router.get('/', (req, res) => {
  db.query('SELECT * FROM leticia_musicas', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// POST /musicas
router.post('/', (req, res) => {
  const { titulo, artista, album, ano, genero } = req.body;
  const sql = 'INSERT INTO leticia_musicas (titulo, artista, album, ano, genero) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [titulo, artista, album, ano, genero], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Música cadastrada com sucesso!', id: result.insertId });
  });
});

module.exports = router;
