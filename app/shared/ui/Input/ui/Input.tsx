import {
  InputHTMLAttributes,
  cloneElement,
  FC,
  HTMLAttributes,
  ReactElement,
} from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactElement<HTMLAttributes<HTMLElement>>;
  variant?: 'primary' | 'secondary';
  inputSize?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Input: FC<IInputProps> = ({
  icon,
  label,
  variant = 'primary',
  inputSize = 'medium',
  className,
  ...props
}) => {
  const clonedIcon = icon
    ? cloneElement(icon, {
        className: `icon-size-${inputSize}`,
      })
    : null;

  return (
    <div className={`input-container ${variant} ${inputSize} ${className}`}>
      {icon && (
        <div>
          <span className="icon">{clonedIcon}</span>
        </div>
      )}
      <div>
        <input className="input-field" placeholder={label} {...props} />
      </div>
    </div>
  );
};
