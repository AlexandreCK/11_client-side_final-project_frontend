import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HeaderContainer } from '../HeaderContainer';

describe('HeaderContainer', () => {
    it('renders children inside a div with the correct class', () => {
        const view = render(
            <HeaderContainer>
                <span>Header Content</span>
            </HeaderContainer>,
        );

        const content = view.getByText('Header Content');
        const rootElement = view.container.firstChild;

        expect(content).not.toBeNull();
        expect(rootElement.className).toContain('header-container');
    });
});
