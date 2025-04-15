import { Link } from "react-router-dom";

// Тип для пропсов компонента FooterLink
interface FooterLinkProps {
  link: {
    src: string;
    to: string;
  };
}

function FooterLink({ link }: FooterLinkProps) {
  return (
    <Link to={link.to} className="link" target="_blank">
      <img src={link.src} alt="icon" className="icon" />
    </Link>
  );
}

export default FooterLink;
