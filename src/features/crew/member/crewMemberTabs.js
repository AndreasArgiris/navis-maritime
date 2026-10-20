import { FiAward, FiCalendar, FiHeart, FiStar, FiUser } from 'react-icons/fi';
import CrewCertificatesTab from './CrewCertificatesTab';
import CrewMedicalTab from './CrewMedicalTab';
import CrewOverviewTab from './CrewOverviewTab';
import CrewReviewsTab from './CrewReviewsTab';
import CrewScheduleTab from './CrewScheduleTab';

/** Tabs on the crew member page, in display order. `value` is also the ?tab= query value. */
export const CREW_MEMBER_TABS = [
  { value: 'overview', label: 'Overview', icon: FiUser, component: CrewOverviewTab },
  { value: 'schedule', label: 'Schedule & tickets', icon: FiCalendar, component: CrewScheduleTab },
  { value: 'medical', label: 'Medical', icon: FiHeart, component: CrewMedicalTab },
  { value: 'certificates', label: 'Certificates', icon: FiAward, component: CrewCertificatesTab },
  { value: 'reviews', label: 'Reviews', icon: FiStar, component: CrewReviewsTab },
];

export const CREW_MEMBER_TAB_VALUES = CREW_MEMBER_TABS.map((tab) => tab.value);
