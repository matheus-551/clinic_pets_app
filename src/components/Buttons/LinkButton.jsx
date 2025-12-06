import { Link } from 'react-router-dom';
import Button from './Button';

function LinkButton({ to, children, ...props }) {
  return (
    <Link to={to}>
      <Button {...props}>{children}</Button>
    </Link>
  );
}

export default LinkButton;
