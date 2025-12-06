import PropTypes from 'prop-types';
import clsx from 'clsx';

const COLOR_VARIANTS = {
  primary: 'bg-primary hover:bg-primaryDark text-white',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
  success: 'bg-success hover:bg-green-700 text-white',
  danger: 'bg-danger hover:bg-red-700 text-white',
  none: 'bg-none',
};

const SIZE_VARIANTS = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
};

function Button({
  children,
  color = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  className,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'rounded-md font-medium transition disabled:opacity-50 disabled:cursor-not-allowed',
        COLOR_VARIANTS[color],
        SIZE_VARIANTS[size],
        className
      )}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  color: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Button;
