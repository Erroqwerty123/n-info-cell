const express = require('express');
const router = express.Router();
const db = require('../database');

// Obter termos de responsabilidade
router.get('/responsibility', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM responsibility_terms WHERE active = true LIMIT 1'
    );
    res.json(result.rows[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter termos de garantia
router.get('/warranty', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM warranty_terms WHERE active = true'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar termo de responsabilidade
router.post('/responsibility', async (req, res) => {
  try {
    const { title, content } = req.body;
    const result = await db.query(
      'INSERT INTO responsibility_terms (title, content, active) VALUES ($1, $2, true) RETURNING *',
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar termo de garantia
router.post('/warranty', async (req, res) => {
  try {
    const { title, duration_months, coverage, conditions } = req.body;
    const result = await db.query(
      'INSERT INTO warranty_terms (title, duration_months, coverage, conditions, active) VALUES ($1, $2, $3, $4, true) RETURNING *',
      [title, duration_months, coverage, conditions]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;