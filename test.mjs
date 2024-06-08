import axios from 'axios';
import { expect } from 'chai';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

describe('Banking API Tests', () => {
    it('Reset state before starting tests', async () => {
        const response = await api.post('/reset');
        expect(response.status).to.equal(200);
    });

    it('Get balance for non-existing account', async () => {
        try {
            await api.get('/balance?account_id=1234');
        } catch (error) {
            expect(error.response.status).to.equal(404);
            expect(error.response.data).to.equal(0);
        }
    });

    it('Create account with initial balance', async () => {
        const response = await api.post('/event', {
            type: 'deposit',
            destination: '100',
            amount: 10
        });
        expect(response.status).to.equal(201);
        expect(response.data).to.deep.equal({
            destination: { id: '100', balance: 10 }
        });
    });

    it('Deposit into existing account', async () => {
        const response = await api.post('/event', {
            type: 'deposit',
            destination: '100',
            amount: 10
        });
        expect(response.status).to.equal(201);
        expect(response.data).to.deep.equal({
            destination: { id: '100', balance: 20 }
        });
    });

    it('Get balance for existing account', async () => {
        const response = await api.get('/balance?account_id=100');
        expect(response.status).to.equal(200);
        expect(response.data).to.equal(20);
    });

    it('Withdraw from non-existing account', async () => {
        try {
            await api.post('/event', {
                type: 'withdraw',
                origin: '200',
                amount: 10
            });
        } catch (error) {
            expect(error.response.status).to.equal(404);
            expect(error.response.data).to.equal(0);
        }
    });

    it('Withdraw from existing account', async () => {
        const response = await api.post('/event', {
            type: 'withdraw',
            origin: '100',
            amount: 5
        });
        expect(response.status).to.equal(201);
        expect(response.data).to.deep.equal({
            origin: { id: '100', balance: 15 }
        });
    });

    it('Transfer from existing account', async () => {
        const response = await api.post('/event', {
            type: 'transfer',
            origin: '100',
            amount: 15,
            destination: '300'
        });
        expect(response.status).to.equal(201);
        expect(response.data).to.deep.equal({
            origin: { id: '100', balance: 0 },
            destination: { id: '300', balance: 15 }
        });
    });

    it('Transfer from non-existing account', async () => {
        try {
            await api.post('/event', {
                type: 'transfer',
                origin: '200',
                amount: 15,
                destination: '300'
            });
        } catch (error) {
            expect(error.response.status).to.equal(404);
            expect(error.response.data).to.equal(0);
        }
    });
});
