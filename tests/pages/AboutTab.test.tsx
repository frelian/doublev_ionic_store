import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutTab from '../../src/pages/AboutTab';

describe('AboutTab', () => {
    it('renders the about tab content', () => {
        render(<AboutTab />);
        expect(screen.getByText('Acerca de')).toBeInTheDocument();
        expect(screen.getByText('Julian Niño')).toBeInTheDocument();
        expect(screen.getByText('Aplicación Ionic V8 con React.')).toBeInTheDocument();
        expect(screen.getByText('Funcionalidades')).toBeInTheDocument();
        expect(screen.getByText('Consumo de APIs')).toBeInTheDocument();
        expect(screen.getByText('Listado de productos')).toBeInTheDocument();
        expect(screen.getByText('Productos deseados')).toBeInTheDocument();
        expect(screen.getByText('Lazy loading')).toBeInTheDocument();
        expect(screen.getByText('Test unitarios')).toBeInTheDocument();
    });
});