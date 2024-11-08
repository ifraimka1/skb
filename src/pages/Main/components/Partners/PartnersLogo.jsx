function PartnersLogo({ partner }) {
    return (
        <div className="partner">
            <img src={ partner.src } alt="" className="logo" />
        </div>
    );
}

export default PartnersLogo;