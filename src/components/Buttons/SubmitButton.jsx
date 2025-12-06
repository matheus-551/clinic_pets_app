import Button from './Button';

function SubmitButton({ children, ...props }) {
  return (
    <Button type="submit" {...props}>
      {children}
    </Button>
  );
}

export default SubmitButton;
