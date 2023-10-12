import { getCurrentStock } from './stockManager';
import { FileReader } from './fileReader';

const dataReader = new FileReader(); 

getCurrentStock("LTV719449/39/39", dataReader)
  .then(result => {
    console.log(`Current stock for SKU ${result.sku}: ${result.qty}`);
  })
  .catch(error => {
    console.error(error);
  });
