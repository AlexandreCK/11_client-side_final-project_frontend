import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MainContainer } from '../MainContainer';

describe('MainContainer', () => {
    it('renders children inside a div with the correct class', () => {
        const view = render(
            <MainContainer>
                <span>Test Content</span>
            </MainContainer>,
        );

        const content = view.getByText('Test Content');
        const rootElement = view.container.firstChild;

        expect(content).not.toBeNull();
        expect(rootElement.className).toContain('main-container');
    });
});
