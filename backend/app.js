const express = require('express');
const cors = require('cors');
const batchRoutes = require('./routes/batchRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Batch Operations API is running' });
});
app.use('/api/batches', batchRoutes);

module.exports = app;