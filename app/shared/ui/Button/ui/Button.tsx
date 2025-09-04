import {
  ButtonHTMLAttributes,
  cloneElement,
  FC,
  HTMLAttributes,
  ReactElement,
} from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: ReactElement<HTMLAttributes<HTMLElement>>;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Button: FC<IButtonProps> = ({
  icon,
  label,
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}) => {
  const clonedIcon = cloneElement(icon, {
    className: `icon-size-${size}`,
  });

  return (
    <button className={`btn ${variant} ${size} ${className}`} {...props}>
      <div>
        <span className="icon">{clonedIcon}</span>
      </div>
      <div>
        <span className="label">{label}</span>
      </div>
    </button>
  );
};
