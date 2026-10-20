import { Link } from 'react-router-dom';
import logoUrl from '../../assets/navis-logo.svg';

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Navis Fleet home">
      <img src={logoUrl} alt="" className="logo__image" width="164" height="50" />
    </Link>
  );
}
