import express from 'express';
import receiptRoutes from './routes/receiptRoutes';
import { errorHandler } from './utils/errorHandler';
import logger from './utils/logger';

const app = express();

app.use(express.json());
app.use('/receipts', receiptRoutes);
app.use(errorHandler);

export default app;

// Only start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}