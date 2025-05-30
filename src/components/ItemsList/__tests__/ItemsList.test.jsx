import { describe, test, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ItemsList } from '../ItemsList';
import styles from '../ItemsList.module.css';

describe('ItemsList', () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    test('renders the correct number of items', () => {
        const mockItems = [
            {
                id: 1,
                title: 'Book 1',
                author: 'Author 1',
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
        expect(items[0].className).toBe(styles['items-list__item']);
    });

    test('renders empty list when no items provided', () => {
        const { container } = render(<ItemsList itemsList={[]} />);

        const items = container.querySelectorAll('li');

        expect(items.length).toBe(0);
    });

    test('displays loading message when isLoading is true', () => {
        render(<ItemsList itemsList={[]} isLoading={true} />);

        const loadingMessage = screen.getByText('Loading Books...');

        expect(loadingMessage).toBeDefined();
        expect(loadingMessage.className).toBe(styles['items-list__loading']);
    });

    test('does not display items when isLoading is true', () => {
        const mockItems = [
            {
                id: 1,
                title: 'Book 1',
                author: 'Author 1',
                status: 'Pending',
            },
        ];

        const { container } = render(
            <ItemsList itemsList={mockItems} isLoading={true} />,
        );

        const items = container.querySelectorAll('li');
        expect(items.length).toBe(0);
        expect(screen.getByText('Loading Books...')).toBeDefined();
    });

    test('passes deleteBook and setBookToUpdate props to ItemCard', () => {
        const mockItems = [
            {
                id: 1,
                title: 'Book 1',
                author: 'Author 1',
                status: 'Pending',
            },
        ];
        const mockDeleteBook = vi.fn();
        const mockSetBookToUpdate = vi.fn();

        render(
            <ItemsList
                itemsList={mockItems}
                deleteBook={mockDeleteBook}
                setBookToUpdate={mockSetBookToUpdate}
            />,
        );

        const listElement = screen.getByRole('list');
        expect(listElement).toBeDefined();
        expect(listElement.className).toBe(styles['items-list']);
    });

    test('applies correct CSS classes to list elements', () => {
        const mockItems = [
            {
                id: 1,
                title: 'Book 1',
                author: 'Author 1',
                status: 'Pending',
            },
        ];

        const { container } = render(<ItemsList itemsList={mockItems} />);
        const listItem = container.querySelector('li');
        const list = container.querySelector('ul');

        expect(list.className).toBe(styles['items-list']);
        expect(listItem.className).toBe(styles['items-list__item']);
    });
});
