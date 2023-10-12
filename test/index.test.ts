import { DataReader } from '../src/dataReader';
import { getCurrentStock } from '../src/stockManager';

const mockDataReader: DataReader = {
  readStockData: jest.fn(async () => []),  
  readTransactionData: jest.fn(async () => []), 
};

describe('getCurrentStock', () => {
  it('should return current stock for a valid SKU', async () => {
    (mockDataReader.readStockData as jest.Mock).mockResolvedValue([
      { sku: 'SKU1', stock: 100 }, // Ensure SKU1 exists in the mock data
      { sku: 'SKU2', stock: 200 },
    ]);

    (mockDataReader.readTransactionData as jest.Mock).mockResolvedValue([
      { sku: 'SKU1', type: 'order', qty: 10 },
      { sku: 'SKU1', type: 'refund', qty: 5 },
    ]);

    const result = await getCurrentStock('SKU1', mockDataReader);

    expect(result).toEqual({ sku: 'SKU1', qty: 95 }); // Ensure the expected qty is correct
  });

  it('should throw an error for an invalid SKU', async () => {
    (mockDataReader.readStockData as jest.Mock).mockResolvedValue([
      { sku: 'SKU2', stock: 200 },
    ]);

    await expect(getCurrentStock('SKU1', mockDataReader)).rejects.toThrow('SKU SKU1 not found in stock data.');
  });

  it('should handle unknown errors', async () => {
    (mockDataReader.readStockData as jest.Mock).mockRejectedValue(new Error('Unknown error'));

    await expect(getCurrentStock('SKU1', mockDataReader)).rejects.toThrow(
      'An unknown error occurred in getCurrentStock: Unknown error'
    );
  });
});
