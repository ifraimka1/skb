function FooterContacts({ contacts }) {
    return (
        <div className="contacts">
            <p style={{ fontSize: '24px', fontWeight: '500', textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '2px' }}>{ contacts.email }</p>
            <p style={{ fontSize: '24px' }}>{ contacts.phone }</p>
            <p style={{ fontSize: '16px', lineHeight: '25px', fontWeight: '300' }}>{ contacts.address }</p>
        </div>
    );
}

export default FooterContacts;