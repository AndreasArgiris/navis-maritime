import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

const VIEWPORT_MARGIN = 12;

/**
 * Where to draw a tooltip of `size` next to `anchor` (a DOMRect) so it stays inside
 * the viewport. Prefers above the anchor and flips below when there is no room.
 * `left`/`top` are the arrow tip; `arrowOffset` shifts the arrow when the box is clamped.
 */
export function computeTooltipPosition(anchor, size, viewport, gap = 10) {
  const anchorX = anchor.left + anchor.width / 2;
  const half = size.width / 2;
  const minX = VIEWPORT_MARGIN + half;
  const maxX = viewport.width - VIEWPORT_MARGIN - half;
  const left = maxX < minX ? viewport.width / 2 : Math.min(Math.max(anchorX, minX), maxX);

  const fitsAbove = anchor.top - gap - size.height >= VIEWPORT_MARGIN;
  const fitsBelow = anchor.bottom + gap + size.height <= viewport.height - VIEWPORT_MARGIN;
  const placement = fitsAbove || !fitsBelow ? 'top' : 'bottom';

  return {
    placement,
    left,
    top: placement === 'top' ? anchor.top - gap : anchor.bottom + gap,
    arrowOffset: anchorX - left,
  };
}

/**
 * A tooltip portalled to <body> with fixed positioning, so it is never clipped by
 * the map, cards or sticky header. `estimatedHeight` is used for the flip decision.
 */
export default function FloatingTooltip({ anchorRect, width = 300, estimatedHeight = 300, children }) {
  if (!anchorRect) return null;

  const position = computeTooltipPosition(
    anchorRect,
    { width, height: estimatedHeight },
    { width: window.innerWidth, height: window.innerHeight },
  );

  return createPortal(
    <div
      role="tooltip"
      className={`floating-tooltip floating-tooltip--${position.placement}`}
      style={{ left: position.left, top: position.top, width }}
    >
      <motion.div
        className="floating-tooltip__box"
        initial={{ opacity: 0, scale: 0.96, y: position.placement === 'top' ? 6 : -6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      >
        {children}
        <span
          className="floating-tooltip__arrow"
          style={{ left: `calc(50% + ${position.arrowOffset}px)` }}
          aria-hidden="true"
        />
      </motion.div>
    </div>,
    document.body,
  );
}
