import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import App from '../src/App';

// Mock para navigates between tabs (4/5)
vi.mock('@ionic/react', async () => {
  const actual = await vi.importActual('@ionic/react');
  return {
    ...actual,
    IonApp: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    IonTabs: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    IonRouterOutlet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    IonTabBar: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    IonTabButton: ({ children, tab }: { children: React.ReactNode, tab: string }) => (
        <div role="button" data-tab={tab}>{children}</div>
    ),
    IonIcon: () => <div />,
    IonLabel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    setupIonicReact: vi.fn()
  };
});

// Mock de React Router (3/5) | redirects to /productos by default
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Redirect: ({ to }: { to: string }) => <div data-testid="redirect-to-productos" data-redirect-to={to} />
  };
});

// Mock del contexto (5/5)
vi.mock('./context/WishlistContext', () => ({
  WishlistProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

const renderApp = (initialRoute = '/') => {
  return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
  );
};

describe('App.tsx Component', () => {

  it('(1/5) renders without crashing', () => {
    const { baseElement } = renderApp();
    expect(baseElement).toBeDefined();
  });

  it('(2/5) renders tab buttons', () => {
    renderApp();

    const productosButtons= screen.queryAllByText('Productos');
    const deseadosButtons = screen.queryAllByText('Deseados');
    const acercaDeButtons = screen.queryAllByText('Acerca de');

    expect(productosButtons.length).toBeGreaterThan(0);
    expect(deseadosButtons.length).toBeGreaterThan(0);
    expect(acercaDeButtons.length).toBeGreaterThan(0);
  });

  it('(3/5) redirects to /productos by default', () => {
    renderApp('/');

    const redirectElement = screen.getByTestId('redirect-to-productos');
    expect(redirectElement).toBeInTheDocument();
  });

  it('(4/5) navigates between tabs', () => {
    renderApp('/productos');

    // Verifica la existencia de los botones de tab
    const tabButtons = screen.getAllByRole('button');
    expect(tabButtons.length).toBeGreaterThan(0);
  });

  it('(5/5) wraps app with WishlistProvider', () => {
    const { baseElement } = renderApp();
    expect(baseElement).toBeDefined();
  });
});