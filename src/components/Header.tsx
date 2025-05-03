import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
