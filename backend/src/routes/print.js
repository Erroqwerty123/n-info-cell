const express = require('express');
const router = express.Router();

// Gerar recibo para impressão A4
router.post('/receipt-a4', async (req, res) => {
  try {
    const { order, seller, buyer, product } = req.body;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
          .content { margin: 20px 0; }
          .row { display: flex; justify-content: space-between; margin: 10px 0; }
          .total { border-top: 2px solid #333; margin-top: 20px; padding-top: 10px; font-weight: bold; font-size: 18px; }
          .terms { font-size: 10px; margin-top: 30px; border-top: 1px solid #ccc; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>N - INFO CELL</h2>
          <p>Recibo de Compra e Venda</p>
        </div>
        <div class="content">
          <div class="row"><strong>Número do Pedido:</strong> <span>${order.id}</span></div>
          <div class="row"><strong>Data:</strong> <span>${new Date().toLocaleDateString('pt-BR')}</span></div>
          <div class="row"><strong>Vendedor:</strong> <span>${seller.name}</span></div>
          <div class="row"><strong>Comprador:</strong> <span>${buyer.name}</span></div>
          <div class="row"><strong>Telefone do Comprador:</strong> <span>${buyer.phone}</span></div>
          
          <hr>
          
          <h3>Detalhes do Produto</h3>
          <div class="row"><strong>Marca:</strong> <span>${product.brand}</span></div>
          <div class="row"><strong>Modelo:</strong> <span>${product.model}</span></div>
          <div class="row"><strong>Memória RAM:</strong> <span>${product.ram} GB</span></div>
          <div class="row"><strong>Armazenamento:</strong> <span>${product.storage} GB</span></div>
          <div class="row"><strong>Condição:</strong> <span>${product.condition}</span></div>
          <div class="row"><strong>Quantidade:</strong> <span>${order.quantity}</span></div>
          
          <div class="total">
            <div class="row">
              <span>VALOR TOTAL:</span>
              <span>R$ ${order.total_price.toFixed(2)}</span>
            </div>
          </div>
          
          <div class="terms">
            <p><strong>Termo de Responsabilidade:</strong></p>
            <p>O comprador declara ter recebido o produto em perfeito estado e isenta o vendedor de responsabilidade por danos subsequentes.</p>
            <p><strong>Termo de Garantia:</strong></p>
            <p>Produto com garantia conforme especificado no ato da compra.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    res.json({ html: htmlContent, format: 'A4' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gerar recibo para impressão térmica 80mm
router.post('/receipt-80mm', async (req, res) => {
  try {
    const { order, seller, buyer, product } = req.body;
    
    const textContent = `
╔══════════════════════════════════╗
║      N - INFO CELL              ║
║   Recibo de Compra e Venda      ║
╚══════════════════════════════════╝

Pedido: ${order.id}
Data: ${new Date().toLocaleDateString('pt-BR')}
Hora: ${new Date().toLocaleTimeString('pt-BR')}

Vendedor: ${seller.name}
Comprador: ${buyer.name}
Telefone: ${buyer.phone}

──────────────────────────────────
DETALHES DO PRODUTO
──────────────────────────────────
Marca: ${product.brand}
Modelo: ${product.model}
RAM: ${product.ram}GB
Armazenamento: ${product.storage}GB
Condição: ${product.condition}
Quantidade: ${order.quantity}

──────────────────────────────────
VALOR TOTAL: R$ ${order.total_price.toFixed(2)}
──────────────────────────────────

TERMO DE RESPONSABILIDADE:
O comprador declara ter recebido o
produto em perfeito estado.

TERMO DE GARANTIA:
Produto com garantia conforme
especificado no ato da compra.

──────────────────────────────────
Obrigado pela compra!
    `;
    
    res.json({ text: textContent, format: '80mm' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;