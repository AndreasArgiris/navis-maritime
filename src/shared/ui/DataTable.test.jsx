import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataTable from './DataTable';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'qty', header: 'Qty', sortable: true },
  { key: 'note', header: 'Note', render: (row) => <em>{row.name.toLowerCase()}</em> },
];

const rows = Array.from({ length: 12 }, (_, i) => ({
  id: `r${i}`,
  name: `Item ${String.fromCharCode(65 + i)}`,
  qty: (i * 7) % 12,
}));

const bodyRows = () => within(screen.getAllByRole('rowgroup')[1]).getAllByRole('row');
const firstCell = () => within(bodyRows()[0]).getAllByRole('cell')[0].textContent;

describe('DataTable', () => {
  it('renders headers, custom cells and the first page', () => {
    render(<DataTable columns={columns} rows={rows} pageSize={5} />);
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(bodyRows()).toHaveLength(5);
    expect(screen.getByText('item a')).toBeInTheDocument();
    expect(screen.getByText('Showing 1–5 of 12')).toBeInTheDocument();
  });

  it('sorts ascending then descending', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} rows={rows} pageSize={20} />);

    await user.click(screen.getByRole('button', { name: 'Qty' }));
    expect(screen.getByRole('columnheader', { name: 'Qty' })).toHaveAttribute('aria-sort', 'ascending');
    expect(within(bodyRows()[0]).getAllByRole('cell')[1]).toHaveTextContent('0');

    await user.click(screen.getByRole('button', { name: 'Qty' }));
    expect(screen.getByRole('columnheader', { name: 'Qty' })).toHaveAttribute('aria-sort', 'descending');
    expect(within(bodyRows()[0]).getAllByRole('cell')[1]).toHaveTextContent('11');
  });

  it('paginates', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} rows={rows} pageSize={5} />);

    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Next page' }));
    expect(firstCell()).toBe('Item F');
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
  });

  it('shows an empty state when there are no rows', () => {
    render(<DataTable columns={columns} rows={[]} emptyMessage="Nothing matches." />);
    expect(screen.getByText('Nothing matches.')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
