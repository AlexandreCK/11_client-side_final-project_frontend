import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { AddButton } from '../AddButton';

describe('AddButton', () => {
    it('renders "Add New Book" when form is not visible', () => {
        const view = render(
            <AddButton isFormVisible={false} onClick={() => {}} />,
        );

        const buttonText = view.getByText('Add New Book');
        expect(buttonText).not.toBeNull();
    });

    it('renders "Cancel" when form is visible', () => {
        const view = render(
            <AddButton isFormVisible={true} onClick={() => {}} />,
        );

        const buttonText = view.getByText('Cancel');
        expect(buttonText).not.toBeNull();
    });

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn();
        const view = render(
            <AddButton isFormVisible={false} onClick={handleClick} />,
        );

        const button = view.getByRole('button');
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalled();
    });
});
