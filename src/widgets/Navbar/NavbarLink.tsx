import { NavLink } from "react-router-dom";
import { Children, ReactNode } from "react";

// Тип для пропсов компонента NavbarLink
interface NavbarLinkProps {
  link: {
    text?: string; // Опциональное поле для текста ссылки
    to: string;
    newTab?: boolean;
    onClick?: () => void;
  };
  children?: ReactNode; // Дочерние элементы
  className?: string; // Опциональное поле для класса
}

function NavbarLink({ link, children, className }: NavbarLinkProps) {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        `nav-link ${className || ""} ${
          isActive ? "active" : isPending ? "disabled" : ""
        }`
      }
      to={link.to}
      target={link.newTab ? "_blank" : undefined}
      onClick={link.onClick}
    >
      {link.text}
      {Children.map(children, (child) => (
        <>{child}</>
      ))}
    </NavLink>
  );
}

export default NavbarLink;
