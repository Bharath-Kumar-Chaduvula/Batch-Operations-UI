const app = require('./app');

const port = Number.parseInt(process.env.PORT || '5000', 10);

app.listen(port, () => {
  console.log(`Batch Operations API listening on http://localhost:${port}`);
});