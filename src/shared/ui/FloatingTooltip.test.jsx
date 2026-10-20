import { render, screen } from '@testing-library/react';
import FloatingTooltip, { computeTooltipPosition } from './FloatingTooltip';

const rect = (left, top, size = 30) => ({ left, top, width: size, height: size, right: left + size, bottom: top + size });
const viewport = { width: 1200, height: 800 };
const size = { width: 300, height: 280 };

describe('computeTooltipPosition', () => {
  it('places the tooltip above the anchor when there is room', () => {
    expect(computeTooltipPosition(rect(585, 500), size, viewport)).toEqual({
      placement: 'top',
      left: 600,
      top: 490,
      arrowOffset: 0,
    });
  });

  it('flips below when the anchor is near the top of the screen', () => {
    const position = computeTooltipPosition(rect(585, 100), size, viewport);
    expect(position.placement).toBe('bottom');
    expect(position.top).toBe(140);
  });

  it('keeps the box inside the viewport and shifts the arrow to the anchor', () => {
    const position = computeTooltipPosition(rect(0, 500), size, viewport);
    expect(position.left).toBe(162); // margin 12 + half width 150
    expect(position.arrowOffset).toBe(15 - 162);
  });

  it('stays above when it fits neither above nor below', () => {
    expect(computeTooltipPosition(rect(585, 200), size, { width: 1200, height: 400 }).placement).toBe('top');
  });
});

describe('FloatingTooltip', () => {
  it('renders into document.body', () => {
    render(
      <div data-testid="host">
        <FloatingTooltip anchorRect={rect(100, 400)}>Hello</FloatingTooltip>
      </div>,
    );
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent('Hello');
    expect(screen.getByTestId('host')).not.toContainElement(tooltip);
  });

  it('renders nothing without an anchor', () => {
    render(<FloatingTooltip anchorRect={null}>Hello</FloatingTooltip>);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
