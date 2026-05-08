const express = require('express');
const router = express.Router();
const db = require('../database');

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const offset = (page - 1) * limit;
    
    let query = 'SELECT * FROM products WHERE active = true';
    const params = [];
    
    if (search) {
      query += ' AND (name ILIKE $1 OR description ILIKE $1)';
      params.push(`%${search}%`);
    }
    
    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);
    
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter detalhes de um produto
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar novo produto
router.post('/', async (req, res) => {
  try {
    const { name, description, price, brand, model, storage, ram, condition, image_url, seller_id } = req.body;
    
    const result = await db.query(
      'INSERT INTO products (name, description, price, brand, model, storage, ram, condition, image_url, seller_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [name, description, price, brand, model, storage, ram, condition, image_url, seller_id]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;