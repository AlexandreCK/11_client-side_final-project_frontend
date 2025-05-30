import { describe, test, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUIState } from '../useUIState';

describe('useUIState', () => {
    test('initializes with default values', () => {
        const { result } = renderHook(() => useUIState());

        expect(result.current.isFormVisible).toBe(false);
        expect(result.current.isUpdate).toBe(false);
        expect(result.current.book).toBe(null);
    });

    test('toggleFormVisibility toggles form visibility state', () => {
        const { result } = renderHook(() => useUIState());

        act(() => {
            result.current.toggleFormVisibility();
        });

        expect(result.current.isFormVisible).toBe(true);

        act(() => {
            result.current.toggleFormVisibility();
        });

        expect(result.current.isFormVisible).toBe(false);
    });

    test('toggleFormVisibility resets update state when closing form', () => {
        const { result } = renderHook(() => useUIState());

        act(() => {
            result.current.toggleFormVisibility();
            result.current.setBookToUpdate({ id: 1, title: 'Test Book' });
        });

        expect(result.current.isFormVisible).toBe(true);
        expect(result.current.isUpdate).toBe(true);
        expect(result.current.book).toEqual({ id: 1, title: 'Test Book' });

        act(() => {
            result.current.toggleFormVisibility();
        });

        expect(result.current.isFormVisible).toBe(false);
        expect(result.current.isUpdate).toBe(false);
        expect(result.current.book).toBe(null);
    });

    test('setBookToUpdate sets book data and update mode', () => {
        const { result } = renderHook(() => useUIState());
        const bookData = { id: 1, title: 'Test Book', author: 'Test Author' };

        act(() => {
            result.current.setBookToUpdate(bookData);
        });

        expect(result.current.isFormVisible).toBe(true);
        expect(result.current.isUpdate).toBe(true);
        expect(result.current.book).toEqual(bookData);
    });

    test('closeForm resets all state values', () => {
        const { result } = renderHook(() => useUIState());

        act(() => {
            result.current.setBookToUpdate({ id: 1, title: 'Test Book' });
        });

        expect(result.current.isFormVisible).toBe(true);
        expect(result.current.isUpdate).toBe(true);
        expect(result.current.book).not.toBe(null);

        act(() => {
            result.current.closeForm();
        });

        expect(result.current.isFormVisible).toBe(false);
        expect(result.current.isUpdate).toBe(false);
        expect(result.current.book).toBe(null);
    });
});
