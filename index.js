const express = require('express');
const mercadopago = require('mercadopago');
const app = express();

app.use(express.json());

mercadopago.configure({
    access_token: 'APP_USR-1805350478906644-092510-72c157436174123a1d1e3c1a52f0bc0f-2708292305'
});

app.post('/api/create_preference', async (req, res) => {
    try {
        const preference = {
            items: req.body.items,
            payer: req.body.payer,
            back_urls: req.body.back_urls,
            auto_return: req.body.auto_return
        };
        const response = await mercadopago.preferences.create(preference);
        res.json(response.body);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar preferência' });
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
