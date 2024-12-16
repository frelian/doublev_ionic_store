import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { WishlistProvider } from "../../src/context/WishlistContext";
import ProductsTab from "../../src/pages/ProductsTab";

describe('ProductsTab.tsx Component', () => {
    const renderProductsTab = () => {
        let component;
        act(() => {
            component = render(
                <WishlistProvider>
                    <ProductsTab />
                </WishlistProvider>
            );
        });
        return component;
    };

    it('(1) renders "Products" title', async () => {
        await act(async () => {
            renderProductsTab();
        });
        expect(screen.getByText('Productos')).toBeInTheDocument();
    });

});