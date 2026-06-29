import { useState, forwardRef } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Input from './Input';

  label;
  error?;
}

const PasswordField = forwardRef(
  ({ label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          label={label}
          error={error}
          icon={<Lock size={18} />}
          className="pr-10"
          {...props}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> ={18} />}
        </button>
      </div>
    );
  }
);

PasswordField.displayName = 'PasswordField';

export default PasswordField;
