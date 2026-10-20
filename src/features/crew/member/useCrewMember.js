import { useSelector } from 'react-redux';
import { useTabParam } from '../../../shared/hooks/useTabParam';
import { selectCrewMember } from '../crewSlice';
import { CREW_MEMBER_TAB_VALUES, CREW_MEMBER_TABS } from './crewMemberTabs';

/** Tab strip entries, with the review count shown on the Reviews tab. */
export function buildCrewMemberTabNav(member) {
  return CREW_MEMBER_TABS.map(({ value, label, icon }) => ({
    value,
    label,
    icon,
    count: value === 'reviews' ? member.reviews.length : undefined,
  }));
}

/** A crew member, the active profile tab (kept in ?tab=) and the component that renders it. */
export function useCrewMember(vesselId, crewId) {
  const member = useSelector((state) => selectCrewMember(state, vesselId, crewId));
  const [activeTab, setActiveTab] = useTabParam(CREW_MEMBER_TAB_VALUES);
  if (!member) return { member: null };
  return {
    member,
    activeTab,
    setActiveTab,
    tabNav: buildCrewMemberTabNav(member),
    ActiveTabContent: CREW_MEMBER_TABS.find((tab) => tab.value === activeTab).component,
  };
}
