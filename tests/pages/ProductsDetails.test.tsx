import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ProductDetails from '../../src/pages/ProductDetails';

const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg'
    ],
    category: {
        name: 'Test Category'
    }
};

const MockProductDetailsWrapper: React.FC = () => {
    return (
        <MemoryRouter initialEntries={[{ pathname: '/producto/1', state: { product: mockProduct } }]}>
            <Route path="/producto/:id">
                <ProductDetails />
            </Route>
        </MemoryRouter>
    );
};

describe('ProductDetails.tsx Component', () => {
    it('(1/2) renders product details correctly', () => {
        render(<MockProductDetailsWrapper />);

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('\$ 99.99')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
        expect(screen.getByText('Test Category')).toBeInTheDocument();
    });

    it('(2/2) handles missing product', () => {
        const MockMissingProductWrapper: React.FC = () => {
            return (
                <MemoryRouter initialEntries={[{ pathname: '/producto/1', state: {} }]}>
                    <Route path="/producto/:id">
                        <ProductDetails />
                    </Route>
                </MemoryRouter>
            );
        };

        render(<MockMissingProductWrapper />);
        expect(screen.getByText('Producto no encontrado.')).toBeInTheDocument();
    });
});