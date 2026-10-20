import { motion } from 'framer-motion';
import { FiMail, FiPhone } from 'react-icons/fi';
import { ageFrom } from '../../../shared/utils/dates';
import { daysUntil, formatDate, getInitials } from '../../../shared/utils/format';
import StatusBadge from '../../../shared/ui/StatusBadge';

export default function CrewProfileHeader({ member }) {
  const contractDays = daysUntil(member.signOff);
  const facts = [
    { label: 'Age', value: `${ageFrom(member.dateOfBirth)} yrs` },
    { label: 'Nationality', value: member.nationality },
    { label: 'Experience', value: `${member.yearsAtSea} yrs at sea` },
    {
      label: 'Contract end',
      value: `${formatDate(member.signOff)}${contractDays >= 0 ? ` · ${contractDays}d` : ''}`,
    },
  ];

  return (
    <motion.section
      className="panel crew-profile-header"
      aria-label="Crew member summary"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="crew-profile-header__identity">
        <span className="crew-profile-header__avatar" aria-hidden="true">
          {getInitials(member.name)}
        </span>
        <div>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <h2 className="crew-profile-header__name">{member.name}</h2>
            <StatusBadge status={member.status} />
          </div>
          <p className="crew-profile-header__rank">
            {member.rank} · {member.department} department
          </p>
          <div className="crew-profile-header__contact">
            <a href={`mailto:${member.email}`}>
              <FiMail aria-hidden="true" /> {member.email}
            </a>
            <a href={`tel:${member.phone.replace(/\s/g, '')}`}>
              <FiPhone aria-hidden="true" /> {member.phone}
            </a>
          </div>
        </div>
      </div>
      <dl className="crew-profile-header__facts">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </motion.section>
  );
}
