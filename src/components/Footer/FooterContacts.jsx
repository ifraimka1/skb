function FooterContacts({ contacts }) {
    return (
        <div className="contacts">
            <p>{ contacts.email }</p>
            <p>{ contacts.address }</p>
            <p>{ contacts.phone }</p>
        </div>
    );
}

export default FooterContacts;