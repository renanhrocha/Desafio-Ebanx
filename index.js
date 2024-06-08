import express from 'express';
import balanceRoutes from './routes/balance.js';
import eventRoutes from './routes/event.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rota principal para exibir "hello ebanx"
app.get('/', (req, res) => {
    res.send('hello ebanx');
});

// Usando rotas
app.use(balanceRoutes);
app.use(eventRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
