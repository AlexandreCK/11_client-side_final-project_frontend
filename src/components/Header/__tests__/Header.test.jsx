import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Header } from '../Header';
import styles from '../Header.module.css';

describe('Header', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders with correct text', () => {
        render(<Header />);
        
        const headerElement = screen.getByText('My Book Collection');
        expect(headerElement).toBeDefined();
    });

    test('applies correct CSS class', () => {
        render(<Header />);
        
        const headerElement = screen.getByText('My Book Collection');
        expect(headerElement.className).toBe(styles['header']);
    });

    test('renders as h1 element', () => {
        render(<Header />);

        const headerElement = screen.getByRole('heading', { level: 1 });
        expect(headerElement).toBeDefined();
        expect(headerElement.textContent).toBe('My Book Collection');
    });
});
