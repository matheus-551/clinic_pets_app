import PropTypes from 'prop-types';
import clsx from 'clsx';

const TYPE_STYLES = {
  active: 'bg-success',
  inactive: 'bg-danger',
  pedding: 'bg-warning',
  default: 'bg-gray-400',
};

const TEXT_SIZES = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
};

const SIZES = {
  auto: 'w-auto',
  sm: 'w-16',
  md: 'w-20',
  lg: 'w-32',
};

function Badge({ text, type = 'default', textSize = 'sm', size = 'auto' }) {
  return (
    <span
      className={clsx(
        'px-1 py-1 rounded text-white font-medium inline-flex justify-center items-center',
        TYPE_STYLES[type] || TYPE_STYLES.default,
        TEXT_SIZES[textSize],
        SIZES[size]
      )}
    >
      {text}
    </span>
  );
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['active', 'inactive', 'pedding', 'default']),
  textSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  size: PropTypes.oneOf(['auto', 'sm', 'md', 'lg']),
};

export default Badge;
