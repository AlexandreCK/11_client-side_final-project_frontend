import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { ItemsList } from '../ItemsList';

describe('ItemsList', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders the correct number of items', () => {
        const mockItems = [
            {
                id: 1,
                title: 'Book 1',
                description: 'Author 1',
                status: 'Pending',
            },
            {
                id: 2,
                title: 'Book 2',
                author: 'Author 2',
                status: 'Done',
            },
        ];

        const { container } = render(<ItemsList itemsList={mockItems} />);
        const items = container.querySelectorAll('li');

        expect(items.length).toBe(2);
    });

    test('renders empty list when no items provided', () => {
        const { container } = render(<ItemsList itemsList={[]} />);

        const items = container.querySelectorAll('li');

        expect(items.length).toBe(0);
    });
});
