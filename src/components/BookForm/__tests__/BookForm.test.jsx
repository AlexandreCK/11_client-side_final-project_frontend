import { describe, test, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { BookForm } from '../BookForm';
import styles from '../BookForm.module.css';

describe('BookForm', () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    test('If isSaving is true, show text in button indicating "Saving..."', () => {
        render(
            <BookForm isUpdate={false} isSaving={true} />,
        );

        const button = screen.getByRole('button', { name: 'Saving...' });
        expect(button.disabled).toBe(true);
        expect(button.textContent).toBe('Saving...');
    });

    test('If isSaving is false, show text in button "Add Book"', () => {
        render(
            <BookForm isUpdate={false} isSaving={false} />,
        );

        const button = screen.getByRole('button', { name: 'Add Book' });
        expect(button.disabled).toBe(false);
        expect(button.textContent).toBe('Add Book');
    });
    
    test('If isUpdate is true, show text in button "Update Book"', () => {
        render(
            <BookForm isUpdate={true} isSaving={false} />,
        );

        const button = screen.getByRole('button', { name: 'Update Book' });
        expect(button.textContent).toBe('Update Book');
    });
    
    test('Form title shows "Add New Book" when isUpdate is false', () => {
        render(
            <BookForm isUpdate={false} isSaving={false} />,
        );

        const title = screen.getByText('Add New Book');
        expect(title).toBeDefined();
        expect(title.className).toBe(styles['book-form__title']);
    });
    
    test('Form title shows "Update Book" when isUpdate is true', () => {

        render(
            <BookForm isUpdate={true} isSaving={false} />,
        );

        const title = screen.getByRole('heading', { level: 2, name: 'Update Book' });
        expect(title).toBeDefined();
        expect(title.className).toBe(styles['book-form__title']);
    });
    
    test('Form fields are populated with book data when in update mode', () => {
        const book = {
            title: 'Test Book',
            author: 'Test Author',
            year: '2023',
            status: 'In Progress',
        };

        render(
            <BookForm isUpdate={true} book={book} isSaving={false} />,
        );

        const titleInput = screen.getByLabelText('Title');
        const authorInput = screen.getByLabelText('Author');
        const yearInput = screen.getByLabelText('Publication Year');
        const statusSelect = screen.getByLabelText('Reading Status');
        
        expect(titleInput.value).toBe(book.title);
        expect(authorInput.value).toBe(book.author);
        expect(yearInput.value).toBe(book.year);
        expect(statusSelect.value).toBe(book.status);
    });
    
    test('Form fields are empty when in add mode', () => {
        render(
            <BookForm isUpdate={false} isSaving={false} />,
        );

        const titleInput = screen.getByLabelText('Title');
        const authorInput = screen.getByLabelText('Author');
        const yearInput = screen.getByLabelText('Publication Year');
        
        expect(titleInput.value).toBe('');
        expect(authorInput.value).toBe('');
        expect(yearInput.value).toBe('');
    });
    
    test('Status defaults to "Pending" in add mode', () => {
        render(
            <BookForm isUpdate={false} isSaving={false} />,
        );

        const statusSelect = screen.getByLabelText('Reading Status');
        expect(statusSelect.value).toBe('Pending');
    });
    
    test('Calls onAddBook with form data when submitted in add mode', () => {
        const mockOnAddBook = vi.fn();
        render(
            <BookForm isUpdate={false} isSaving={false} onAddBook={mockOnAddBook} />,
        );
        
        const titleInput = screen.getByLabelText('Title');
        const authorInput = screen.getByLabelText('Author');
        const yearInput = screen.getByLabelText('Publication Year');
        const statusSelect = screen.getByLabelText('Reading Status');
        const submitButton = screen.getByRole('button', { name: 'Add Book' });

        fireEvent.change(titleInput, { target: { value: 'New Book' } });
        fireEvent.change(authorInput, { target: { value: 'New Author' } });
        fireEvent.change(yearInput, { target: { value: '2025' } });
        fireEvent.change(statusSelect, { target: { value: 'Read' } });
        fireEvent.click(submitButton);

        expect(mockOnAddBook).toHaveBeenCalledTimes(1);
        expect(mockOnAddBook).toHaveBeenCalledWith({
            title: 'New Book',
            author: 'New Author',
            year: '2025',
            status: 'Read',
        });
    });
    
    test('Calls onUpdateBook with form data when submitted in update mode', () => {
        const book = {
            id: 1,
            title: 'Original Title',
            author: 'Original Author',
            year: '2020',
            status: 'Pending',
        };
        const mockOnUpdateBook = vi.fn();
        
        render(
            <BookForm 
                isUpdate={true} 
                isSaving={false} 
                book={book} 
                onUpdateBook={mockOnUpdateBook} 
            />,
        );
        
        const titleInput = screen.getByLabelText('Title');
        const authorInput = screen.getByLabelText('Author');
        const yearInput = screen.getByLabelText('Publication Year');
        const statusSelect = screen.getByLabelText('Reading Status');
        const submitButton = screen.getByRole('button', { name: 'Update Book' });

        fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
        fireEvent.change(authorInput, { target: { value: 'Updated Author' } });
        fireEvent.change(yearInput, { target: { value: '2025' } });
        fireEvent.change(statusSelect, { target: { value: 'Read' } });
        fireEvent.click(submitButton);

        expect(mockOnUpdateBook).toHaveBeenCalledTimes(1);
        expect(mockOnUpdateBook).toHaveBeenCalledWith({
            id: 1,
            title: 'Updated Title',
            author: 'Updated Author',
            year: '2025',
            status: 'Read',
        });
    });
    
    test('Does not submit form if title is empty', () => {
        const mockOnAddBook = vi.fn();
        render(
            <BookForm isUpdate={false} isSaving={false} onAddBook={mockOnAddBook} />,
        );
        
        const titleInput = screen.getByLabelText('Title');
        const authorInput = screen.getByLabelText('Author');
        const submitButton = screen.getByRole('button', { name: 'Add Book' });

        fireEvent.change(titleInput, { target: { value: '' } });
        fireEvent.change(authorInput, { target: { value: 'New Author' } });
        fireEvent.click(submitButton);

        expect(mockOnAddBook).not.toHaveBeenCalled();
    });
    
    test('Does not submit form if author is empty', () => {
        const mockOnAddBook = vi.fn();
        render(
            <BookForm isUpdate={false} isSaving={false} onAddBook={mockOnAddBook} />,
        );
        
        const titleInput = screen.getByLabelText('Title');
        const authorInput = screen.getByLabelText('Author');
        const submitButton = screen.getByRole('button', { name: 'Add Book' });

        fireEvent.change(titleInput, { target: { value: 'New Book' } });
        fireEvent.change(authorInput, { target: { value: '' } });
        fireEvent.click(submitButton);
        
        expect(mockOnAddBook).not.toHaveBeenCalled();
    });
    
    test('Form has the correct CSS classes', () => {
        const { container } = render(
            <BookForm isUpdate={false} isSaving={false} />,
        );
        
        const form = container.querySelector('form');
        expect(form.className).toBe(styles['book-form']);
        
        const formGroups = container.querySelectorAll(`.${styles['form-group']}`);
        expect(formGroups.length).toBe(4);
        
        const submitButton = screen.getByRole('button', { name: 'Add Book' });
        expect(submitButton.className).toBe(styles['submit-btn']);
    });
    
    test('Form resets after successful submission', () => {
        const mockOnAddBook = vi.fn();
        render(
            <BookForm isUpdate={false} isSaving={false} onAddBook={mockOnAddBook} />,
        );
        
        const titleInput = screen.getByLabelText('Title');
        const authorInput = screen.getByLabelText('Author');
        const yearInput = screen.getByLabelText('Publication Year');
        const submitButton = screen.getByRole('button', { name: 'Add Book' });

        fireEvent.change(titleInput, { target: { value: 'New Book' } });
        fireEvent.change(authorInput, { target: { value: 'New Author' } });
        fireEvent.change(yearInput, { target: { value: '2025' } });
        fireEvent.click(submitButton);

        expect(titleInput.value).toBe('');
        expect(authorInput.value).toBe('');
        expect(yearInput.value).toBe('');
    });
});
