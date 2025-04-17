// Тип для пропсов компонента FooterContacts
interface FooterContactsProps {
  contacts: {
    email: JSX.Element;
    address: JSX.Element;
    phone: JSX.Element;
  };
}

function FooterContacts({ contacts }: FooterContactsProps) {
  return (
    <div className="contacts">
      <p>{contacts.email}</p>
      <p>{contacts.address}</p>
      <p>{contacts.phone}</p>
    </div>
  );
}

export default FooterContacts;
