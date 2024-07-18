import request from 'supertest';
import app from '../src/app';
import { Server } from 'http';

describe('Receipt Processor API', () => {
  let server: Server;
  let receiptId: string;

  beforeAll((done) => {
    server = app.listen(0, () => done()); // Use port 0 to let the OS assign a free port
  });

  afterAll((done) => {
    server.close(done);
  });
  // Test case for processing a valid receipt
  test('POST /receipts/process - valid receipt', async () => {
    const response = await request(app)
      .post('/receipts/process')
      .send({
        retailer: "Target",
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        items: [
          {
            shortDescription: "Mountain Dew 12PK",
            price: "6.49"
          },{
            shortDescription: "Emils Cheese Pizza",
            price: "12.25"
          },{
            shortDescription: "Knorr Creamy Chicken",
            price: "1.26"
          },{
            shortDescription: "Doritos Nacho Cheese",
            price: "3.35"
          },{
            shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ",
            price: "12.00"
          }
        ],
        total: "35.35"
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    receiptId = response.body.id;
  });

  // Test case for getting points for a processed receipt
  test('GET /receipts/:id/points - valid id', async () => {
    const response = await request(app).get(`/receipts/${receiptId}/points`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('points');
    expect(response.body.points).toBe(28);
  });

  // Test case for invalid receipt (missing fields)
  test('POST /receipts/process - invalid receipt (missing fields)', async () => {
    const response = await request(app)
      .post('/receipts/process')
      .send({
        retailer: "Target",
        // Missing purchaseDate and purchaseTime
        items: [
          {
            shortDescription: "Mountain Dew 12PK",
            price: "6.49"
          }
        ],
        total: "6.49"
      });
    
    expect(response.status).toBe(400);
  });

  // Test case for invalid receipt (incorrect data types)
  test('POST /receipts/process - invalid receipt (incorrect data types)', async () => {
    const response = await request(app)
      .post('/receipts/process')
      .send({
        retailer: "Target",
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        items: [
          {
            shortDescription: "Mountain Dew 12PK",
            price: 6.49
          }
        ],
        total: 6.49
      });
    
    expect(response.status).toBe(400);
  });

  // Test case for non-existent receipt ID
  test('GET /receipts/:id/points - non-existent id', async () => {
    const response = await request(app).get('/receipts/non-existent-id/points');
    
    expect(response.status).toBe(404);
  });

  // Test case for receipt with round dollar amount
  test('POST /receipts/process - round dollar amount', async () => {
    const response = await request(app)
      .post('/receipts/process')
      .send({
        retailer: "Target",
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        items: [
          {
            shortDescription: "Item 1",
            price: "10.00"
          }
        ],
        total: "10.00"
      });
    
    expect(response.status).toBe(200);
    const pointsResponse = await request(app).get(`/receipts/${response.body.id}/points`);
    expect(pointsResponse.body.points).toBeGreaterThanOrEqual(50); // At least 50 points for round dollar
  });

  // Test case for receipt with purchase time between 2:00pm and 4:00pm
  test('POST /receipts/process - purchase time between 2:00pm and 4:00pm', async () => {
    const response = await request(app)
      .post('/receipts/process')
      .send({
        retailer: "Target",
        purchaseDate: "2022-01-01",
        purchaseTime: "14:30",
        items: [
          {
            shortDescription: "Item 1",
            price: "5.00"
          }
        ],
        total: "5.00"
      });
    
    expect(response.status).toBe(200);
    const pointsResponse = await request(app).get(`/receipts/${response.body.id}/points`);
    expect(pointsResponse.body.points).toBeGreaterThanOrEqual(10); // At least 10 points for time between 2:00pm and 4:00pm
  });
});

export {}; 