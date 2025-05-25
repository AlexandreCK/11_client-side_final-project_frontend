import { describe, test, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBookForm } from '../useBookForm';

describe('useBookForm', () => {
    test('initializes with empty form data', () => {
        const { result } = renderHook(() => useBookForm({
            initialData: null,
            onAddBook: vi.fn(),
            onUpdateBook: vi.fn(),
            isUpdate: false
        }));

        expect(result.current.formData).toEqual({
            title: '',
            author: '',
            year: '',
            status: 'Pending'
        });
    });

    test('initializes with book data when in update mode', () => {
        const bookData = {
            id: 1,
            title: 'Test Book',
            author: 'Test Author',
            year: '2023',
            status: 'In Progress'
        };

        const { result } = renderHook(() => useBookForm({
            initialData: bookData,
            onAddBook: vi.fn(),
            onUpdateBook: vi.fn(),
            isUpdate: true
        }));

        expect(result.current.formData).toEqual({
            title: 'Test Book',
            author: 'Test Author',
            year: '2023',
            status: 'In Progress'
        });
    });

    test('updates form data when handleChange is called', () => {
        const { result } = renderHook(() => useBookForm({
            initialData: null,
            onAddBook: vi.fn(),
            onUpdateBook: vi.fn(),
            isUpdate: false
        }));

        act(() => {
            result.current.handleChange({
                target: { name: 'title', value: 'New Title' }
            });
        });

        expect(result.current.formData.title).toBe('New Title');
    });

    test('calls onAddBook with form data when submitted in add mode', () => {
        const mockAddBook = vi.fn();
        const { result } = renderHook(() => useBookForm({
            initialData: null,
            onAddBook: mockAddBook,
            onUpdateBook: vi.fn(),
            isUpdate: false
        }));

        act(() => {
            result.current.handleChange({
                target: { name: 'title', value: 'New Book' }
            });
            result.current.handleChange({
                target: { name: 'author', value: 'New Author' }
            });
            result.current.handleChange({
                target: { name: 'year', value: '2025' }
            });
            result.current.handleChange({
                target: { name: 'status', value: 'Read' }
            });
        });

        act(() => {
            result.current.handleSubmit({
                preventDefault: vi.fn()
            });
        });

        expect(mockAddBook).toHaveBeenCalledWith({
            title: 'New Book',
            author: 'New Author',
            year: '2025',
            status: 'Read'
        });
    });

    test('calls onUpdateBook with form data when submitted in update mode', () => {
        const mockUpdateBook = vi.fn();
        const initialBook = {
            id: 1,
            title: 'Original Title',
            author: 'Original Author',
            year: '2020',
            status: 'Pending'
        };
        
        const { result } = renderHook(() => useBookForm({
            initialData: initialBook,
            onAddBook: vi.fn(),
            onUpdateBook: mockUpdateBook,
            isUpdate: true
        }));

        act(() => {
            result.current.handleChange({
                target: { name: 'title', value: 'Updated Title' }
            });
            result.current.handleChange({
                target: { name: 'status', value: 'Read' }
            });
        });

        act(() => {
            result.current.handleSubmit({
                preventDefault: vi.fn()
            });
        });

        expect(mockUpdateBook).toHaveBeenCalledWith({
            id: 1,
            title: 'Updated Title',
            author: 'Original Author',
            year: '2020',
            status: 'Read'
        });
    });

    test('does not submit form if title is empty', () => {
        const mockAddBook = vi.fn();
        const { result } = renderHook(() => useBookForm({
            initialData: null,
            onAddBook: mockAddBook,
            onUpdateBook: vi.fn(),
            isUpdate: false
        }));

        act(() => {
            result.current.handleChange({
                target: { name: 'title', value: '' }
            });
            result.current.handleChange({
                target: { name: 'author', value: 'Author' }
            });
        });

        act(() => {
            result.current.handleSubmit({
                preventDefault: vi.fn()
            });
        });

        expect(mockAddBook).not.toHaveBeenCalled();
    });

    test('does not submit form if author is empty', () => {
        const mockAddBook = vi.fn();
        const { result } = renderHook(() => useBookForm({
            initialData: null,
            onAddBook: mockAddBook,
            onUpdateBook: vi.fn(),
            isUpdate: false
        }));
        
        act(() => {
            result.current.handleChange({
                target: { name: 'title', value: 'Title' }
            });
            result.current.handleChange({
                target: { name: 'author', value: '' }
            });
        });
        
        act(() => {
            result.current.handleSubmit({
                preventDefault: vi.fn()
            });
        });
        
        expect(mockAddBook).not.toHaveBeenCalled();
    });

    test('resets form after successful submission', () => {
        const mockAddBook = vi.fn();
        const { result } = renderHook(() => useBookForm({
            initialData: null,
            onAddBook: mockAddBook,
            onUpdateBook: vi.fn(),
            isUpdate: false
        }));

        act(() => {
            result.current.handleChange({
                target: { name: 'title', value: 'New Book' }
            });
            result.current.handleChange({
                target: { name: 'author', value: 'New Author' }
            });
        });

        act(() => {
            result.current.handleSubmit({
                preventDefault: vi.fn()
            });
        });

        expect(result.current.formData).toEqual({
            title: '',
            author: '',
            year: '',
            status: 'Pending'
        });
    });
});
