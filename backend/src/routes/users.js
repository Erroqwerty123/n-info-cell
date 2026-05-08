const express = require('express');
const router = express.Router();
const db = require('../database');

// Obter perfil do usuário
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'SELECT id, name, email, phone, type, created_at FROM users WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar perfil
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, bio } = req.body;
    
    const result = await db.query(
      'UPDATE users SET name = $1, phone = $2, bio = $3, updated_at = NOW() WHERE id = $4 RETURNING id, name, email, phone',
      [name, phone, bio, id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;