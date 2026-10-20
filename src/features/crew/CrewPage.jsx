import { Col, Row } from 'react-bootstrap';
import { FiCalendar, FiUserCheck, FiUsers } from 'react-icons/fi';
import { useCurrentVessel } from '../vessel/useCurrentVessel';
import Panel from '../../shared/ui/Panel';
import DataTable from '../../shared/ui/DataTable';
import FilterPills from '../../shared/ui/FilterPills';
import SearchInput from '../../shared/ui/SearchInput';
import StatCardRow from '../../shared/ui/StatCardRow';
import HorizontalBarChart from '../../shared/charts/HorizontalBarChart';
import { CONTRACT_WARNING_DAYS } from './crewSlice';
import { useCrewList } from './useCrewList';

export default function CrewPage() {
  const vessel = useCurrentVessel();
  const { crew, stats, byDepartment, departmentOptions, columns, openMember, filters, setFilter } = useCrewList(vessel.id);

  return (
    <>
      <StatCardRow
        cards={[
          { icon: FiUsers, tone: 'navy', label: 'Crew assigned', value: stats.total },
          {
            icon: FiUserCheck,
            tone: 'teal',
            label: 'On board',
            value: stats.onboard,
            hint: `${stats.joining} joining · ${stats.onLeave} on leave`,
          },
          {
            icon: FiCalendar,
            tone: 'orange',
            label: 'Contracts ending',
            value: stats.contractsEndingSoon,
            hint: `within ${CONTRACT_WARNING_DAYS} days`,
          },
        ]}
      />

      <Row className="g-3">
        <Col xl={9}>
          <Panel
            title="Crew list"
            subtitle="Select a crew member to open their profile"
            actions={
              <div className="toolbar">
                <FilterPills
                  label="Filter crew by department"
                  options={departmentOptions}
                  value={filters.department}
                  onChange={(value) => setFilter('department', value)}
                  layoutId="crew-department-filter"
                />
                <SearchInput
                  value={filters.query}
                  onChange={(value) => setFilter('query', value)}
                  label="Search crew"
                  placeholder="Name or rank…"
                />
              </div>
            }
          >
            <DataTable columns={columns} rows={crew} caption="Crew members" pageSize={12} onRowClick={openMember} />
          </Panel>
        </Col>
        <Col xl={3}>
          <Panel title="By department">
            <HorizontalBarChart data={byDepartment} categoryKey="department" valueKey="count" valueLabel="Crew" />
          </Panel>
        </Col>
      </Row>
    </>
  );
}
