export interface Item {
  shortDescription: string;
  price: string;
}

export interface Receipt {
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  items: Item[];
  total: string;
}

export interface ProcessedReceipt {
  id: string;
  points: number;
}