import { Col, Row } from 'react-bootstrap';
import StatCard from './StatCard';

const COLUMN_SIZES = { 3: { xs: 12, md: 4 }, 4: { xs: 6, xl: 3 } };

/**
 * A row of KPI tiles. cards: [{ label, value, icon, tone, hint? }] (3 or 4 per row).
 * `columnSizes` overrides the Bootstrap column props, e.g. inside a narrower panel.
 */
export default function StatCardRow({ cards, className = 'mb-3', columnSizes }) {
  const sizes = columnSizes ?? COLUMN_SIZES[cards.length] ?? COLUMN_SIZES[4];
  return (
    <Row className={`g-3 ${className}`}>
      {cards.map((card, index) => (
        <Col key={card.label} {...sizes}>
          <StatCard {...card} index={index} />
        </Col>
      ))}
    </Row>
  );
}
