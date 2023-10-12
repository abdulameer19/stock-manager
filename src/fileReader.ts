import * as fs from 'fs/promises';
import { StockItem } from './stock';
import { Transaction } from './transactions';
import { DataReader } from './dataReader';


export class FileReader implements DataReader {
  async readStockData(filePath: string): Promise<StockItem[]> {
    const stockData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(stockData) as StockItem[];
  }

  async readTransactionData(filePath: string): Promise<Transaction[]> {
    const transactionData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(transactionData) as Transaction[];
  }
}
