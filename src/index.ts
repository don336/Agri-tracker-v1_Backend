import app from './app';

const { PORT } = process.env || 3000;

app.listen(PORT, () => {
  console.log(`Connected to Port ${PORT}`);
});
