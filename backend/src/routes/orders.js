const express = require('express');
const router = express.Router();
const db = require('../database');

// Criar pedido
router.post('/', async (req, res) => {
  try {
    const { buyer_id, seller_id, product_id, quantity, total_price, warranty_term_id, responsibility_term_id } = req.body;
    
    const result = await db.query(
      'INSERT INTO orders (buyer_id, seller_id, product_id, quantity, total_price, warranty_term_id, responsibility_term_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [buyer_id, seller_id, product_id, quantity, total_price, warranty_term_id, responsibility_term_id, 'pending']
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar pedidos do usuário
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await db.query(
      'SELECT * FROM orders WHERE buyer_id = $1 OR seller_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar status do pedido
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const result = await db.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;