import { StockItem } from "./stock";
import { Transaction } from "./transactions";
export interface DataReader {
    readStockData(filePath: string): Promise<StockItem[]>;
    readTransactionData(filePath: string): Promise<Transaction[]>;
  }
  