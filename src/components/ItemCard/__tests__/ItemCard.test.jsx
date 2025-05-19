import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ItemCard } from '../ItemCard';
import styles from '../ItemCard.module.css';

describe('ItemCard', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders with read styles correctly', () => {
        const item = {
            title: 'Modern Man in Search of a Soul',
            author: 'Carl Jung',
            year: '1933',
            status: 'Read',
            id: 7,
        };

        render(<ItemCard item={item} />);

        const statusElement = screen.getByText('Read');

        expect(statusElement.className).toContain(
            styles['itemcard__status--read'],
        );
    });

    test('renders with pending styles correctly', () => {
        const item = {
            title: 'Modern Man in Search of a Soul',
            author: 'Carl Jung',
            year: '1933',
            status: 'Pending',
            id: 7,
        };

        render(<ItemCard item={item} />);

        const statusElement = screen.getByText('Pending');

        expect(statusElement.className).toContain(
            styles['itemcard__status--pending'],
        );
    });

    test('renders with in-progress styles correctly', () => {
        const item = {
            title: 'Modern Man in Search of a Soul',
            author: 'Carl Jung',
            year: '1933',
            status: 'In Progress',
            id: 7,
        };

        render(<ItemCard item={item} />);

        const statusElement = screen.getByText('In Progress');

        expect(statusElement.className).toContain(
            styles['itemcard__status--in-progress'],
        );
    });
});
