import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  className?: string;
  onClick?: () => void; // Добавляем onClick как необязательный пропс
}

export const Button = ({ label, className, onClick }: ButtonProps) => {
  return (
    <button 
      className={className + ' ' + styles.button} 
      onClick={onClick}  // Используем onClick для кнопки
    >
      {label}
    </button>
  );
};
