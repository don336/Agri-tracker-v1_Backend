import mongoose from 'mongoose';

const { DB_CONNECT, PORT } = process.env;

const connection = () => {
  mongoose
    .connect(`${DB_CONNECT}`, {})
    .then(() => {
      console.log(`Successfully Connected to Database on port ${PORT}`);
    })
    .catch((error) => {
      console.log(`Database connection failed. Existing now...`);
      console.error(error);
      process.exit(1);
    });
};

export default connection;
