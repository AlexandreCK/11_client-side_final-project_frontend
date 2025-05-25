import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ListContainer } from '../ListContainer';
import styles from '../ListContainer.module.css';

describe('ListContainer', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders with correct CSS class', () => {
        const { container } = render(<ListContainer />);
        
        const sectionElement = container.querySelector('section');
        expect(sectionElement.className).toBe(styles['list-container']);
    });

    test('renders children correctly', () => {
        const testContent = 'Test Child Content';
        
        render(
            <ListContainer>
                <div data-testid="test-child">{testContent}</div>
            </ListContainer>
        );

        const childElement = screen.getByTestId('test-child');
        expect(childElement).toBeDefined();
        expect(childElement.textContent).toBe(testContent);
    });

    test('renders multiple children correctly', () => {
        const testItems = ['Item 1', 'Item 2', 'Item 3'];

        render(
            <ListContainer>
                {testItems.map((item, index) => (
                    <div key={index} data-testid={`test-item-${index}`}>
                        {item}
                    </div>
                ))}
            </ListContainer>
        );

        testItems.forEach((item, index) => {
            const itemElement = screen.getByTestId(`test-item-${index}`);
            expect(itemElement).toBeDefined();
            expect(itemElement.textContent).toBe(item);
        });
    });
});
