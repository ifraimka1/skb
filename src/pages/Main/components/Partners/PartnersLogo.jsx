function PartnersLogo({ partner }) {
    return (
        <div className="partner">
            <img src={ partner.image } alt="" className="logo" />
        </div>
    );
}

export default PartnersLogo;