import { DataReader } from './dataReader';

export async function getCurrentStock(sku: string, dataReader: DataReader): Promise<{ sku: string; qty: number }> {
  try {
    const stock = await dataReader.readStockData('./data/stock.json');

    // Find the initial stock level for the SKU
    const initialStock = stock.find(item => item.sku === sku);

    if (!initialStock) {
      throw new Error(`SKU ${sku} not found in stock data.`);
    }

    // Read transaction data
    const transactions = await dataReader.readTransactionData('./data/transactions.json');

    // Filter transactions for the SKU
    const skuTransactions = transactions.filter(transaction => transaction.sku === sku);

    // Calculate current stock
    const currentStock = skuTransactions.reduce((acc, transaction) => {
      if (transaction.type === 'order') {
        return acc - transaction.qty; 
      } else if (transaction.type === 'refund') {
        return acc + transaction.qty; 
      }
      return acc;
    }, initialStock.stock);

    return { sku, qty: currentStock };
    } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An unknown error occurred in getCurrentStock: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred in getCurrentStock.');
    }
  }
}
