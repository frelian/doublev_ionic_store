import { render, screen } from '@testing-library/react';
import ExploreContainer from "../../src/components/ExploreContainer";

describe('ExploreContainer.tsx component', () => {

    it('(1/3) renders name prop correctly', () => {
        render(<ExploreContainer name="Test Name" />);
        expect(screen.getByText('Test Name')).toBeInTheDocument();
    });

    it('(2/3) renders link with correct attributes', () => {
        render(<ExploreContainer name="Test" />);

        const link = screen.getByText('Docs');
        expect(link).toHaveAttribute('href', 'https://fakeapi.platzi.com/en/about/introduction/');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('(3/3) renders "Fuente:" text', () => {
        render(<ExploreContainer name="Test" />);

        expect(screen.getByText('Fuente:')).toBeInTheDocument();
    });
});
