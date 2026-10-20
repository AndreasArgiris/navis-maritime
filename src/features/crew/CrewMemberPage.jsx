import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { vesselPath } from '../../app/navigation';
import TabNav, { TabPanel } from '../../shared/ui/TabNav';
import { useCurrentVessel } from '../vessel/useCurrentVessel';
import CrewMemberNotFound from './member/CrewMemberNotFound';
import CrewProfileHeader from './member/CrewProfileHeader';
import { useCrewMember } from './member/useCrewMember';

export default function CrewMemberPage() {
  const { crewId } = useParams();
  const vessel = useCurrentVessel();
  const { member, activeTab, setActiveTab, tabNav, ActiveTabContent } = useCrewMember(vessel.id, crewId);
  const crewListPath = vesselPath(vessel.id, 'crew');

  if (!member) return <CrewMemberNotFound vesselName={vessel.name} crewListPath={crewListPath} />;

  return (
    <>
      <Link to={crewListPath} className="back-link">
        <FiArrowLeft aria-hidden="true" /> Crew list
      </Link>
      <CrewProfileHeader member={member} />
      <TabNav
        label="Crew member sections"
        idPrefix="crew-member"
        layoutId="crew-member-tab-underline"
        tabs={tabNav}
        value={activeTab}
        onChange={setActiveTab}
      />
      <TabPanel value={activeTab} idPrefix="crew-member">
        <ActiveTabContent member={member} />
      </TabPanel>
    </>
  );
}
