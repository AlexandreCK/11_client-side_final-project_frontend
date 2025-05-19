import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { BookForm } from '../BookForm';

describe('BookForm', () => {
    afterEach(() => {
        cleanup();
    });

    test('If isSaving is true, show text in button indicating "Saving..."', () => {
        render(
            <BookForm isUpdate={false} isSaving={true} onSubmit={() => {}} />,
        );

        const button = screen.getByRole('button', { name: 'Saving...' });

        expect(button.disabled).to.be.true;
        expect(button.textContent).to.equal('Saving...');
    });

    test('If isSaving is false, show text in button "Add Book"', () => {});
});
