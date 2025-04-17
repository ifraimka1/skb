import styles from "./Partners.module.scss"; // Пропсы для компонента PartnersLogo
interface PartnersLogoProps {
  partner: {
    src: string;
  };
}

function PartnersLogo({ partner }: PartnersLogoProps) {
  return (
    <div className={styles.partner}>
      <img src={partner.src} alt="" className={styles.logo} />
    </div>
  );
}

export default PartnersLogo;
