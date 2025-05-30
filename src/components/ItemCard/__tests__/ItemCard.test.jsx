import { describe, test, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { ItemCard } from '../ItemCard';
import styles from '../ItemCard.module.css';

describe('ItemCard', () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
        vi.restoreAllMocks();
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

    test('renders all item properties correctly', () => {
        const item = {
            title: 'Modern Man in Search of a Soul',
            author: 'Carl Jung',
            year: '1933',
            status: 'Read',
            id: 7,
        };

        render(<ItemCard item={item} />);

        const title = screen.getByText(item.title);
        const author = screen.getByText(item.author);
        const year = screen.getByText(item.year);
        const status = screen.getByText(item.status);

        expect(title).toBeDefined();
        expect(author).toBeDefined();
        expect(year).toBeDefined();
        expect(status).toBeDefined();
    });

    test('calls setBookToUpdate when edit button is clicked', () => {
        const item = {
            title: 'Modern Man in Search of a Soul',
            author: 'Carl Jung',
            year: '1933',
            status: 'Read',
            id: 7,
        };
        const mockSetBookToUpdate = vi.fn();

        render(<ItemCard item={item} setBookToUpdate={mockSetBookToUpdate} />);
        const editButton = screen.getByText('Edit');

        fireEvent.click(editButton);

        expect(mockSetBookToUpdate).toHaveBeenCalledTimes(1);
        expect(mockSetBookToUpdate).toHaveBeenCalledWith(item);
    });

    test('shows confirmation dialog when delete button is clicked', () => {
        const item = {
            title: 'Modern Man in Search of a Soul',
            author: 'Carl Jung',
            year: '1933',
            status: 'Read',
            id: 7,
        };
        const mockDeleteBook = vi.fn();
        const originalConfirm = window.confirm;
        window.confirm = vi.fn(() => true);

        render(<ItemCard item={item} deleteBook={mockDeleteBook} />);
        const deleteButton = screen.getByText('Delete');

        fireEvent.click(deleteButton);

        expect(window.confirm).toHaveBeenCalledWith(
            'Are you sure you want to delete this book?',
        );

        window.confirm = originalConfirm;
    });

    test('calls deleteBook when delete is confirmed', () => {
        const item = {
            title: 'Modern Man in Search of a Soul',
            author: 'Carl Jung',
            year: '1933',
            status: 'Read',
            id: 7,
        };
        const mockDeleteBook = vi.fn();
        const originalConfirm = window.confirm;
        window.confirm = vi.fn(() => true);

        render(<ItemCard item={item} deleteBook={mockDeleteBook} />);
        const deleteButton = screen.getByText('Delete');

        fireEvent.click(deleteButton);

        expect(mockDeleteBook).toHaveBeenCalledTimes(1);
        expect(mockDeleteBook).toHaveBeenCalledWith(item.id);

        window.confirm = originalConfirm;
    });

    test('does not call deleteBook when delete is canceled', () => {
        const item = {
            title: 'Modern Man in Search of a Soul',
            author: 'Carl Jung',
            year: '1933',
            status: 'Read',
            id: 7,
        };
        const mockDeleteBook = vi.fn();
        const originalConfirm = window.confirm;
        window.confirm = vi.fn(() => false);

        render(<ItemCard item={item} deleteBook={mockDeleteBook} />);
        const deleteButton = screen.getByText('Delete');

        fireEvent.click(deleteButton);

        expect(mockDeleteBook).not.toHaveBeenCalled();

        window.confirm = originalConfirm;
    });

    test('applies correct CSS classes to card elements', () => {
        const item = {
            title: 'Modern Man in Search of a Soul',
            author: 'Carl Jung',
            year: '1933',
            status: 'Read',
            id: 7,
        };

        const { container } = render(<ItemCard item={item} />);

        const articleElement = container.querySelector('article');
        const headerDiv = container.querySelector(
            `.${styles['itemcard__header']}`,
        );
        const titleElement = container.querySelector(
            `.${styles['itemcard__title']}`,
        );
        const authorElement = container.querySelector(
            `.${styles['itemcard__author']}`,
        );
        const yearElement = container.querySelector(
            `.${styles['itemcard__year']}`,
        );
        const editButton = screen.getByText('Edit');
        const deleteButton = screen.getByText('Delete');

        expect(articleElement.className).toBe(styles['itemcard']);
        expect(headerDiv).toBeDefined();
        expect(titleElement).toBeDefined();
        expect(titleElement.textContent).toBe(item.title);
        expect(authorElement).toBeDefined();
        expect(authorElement.textContent).toBe(item.author);
        expect(yearElement).toBeDefined();
        expect(yearElement.textContent).toBe(item.year);
        expect(editButton.className).toContain(
            styles['itemcard__button--edit'],
        );
        expect(deleteButton.className).toContain(
            styles['itemcard__button--delete'],
        );
    });
});
