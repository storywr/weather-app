import ErrorIcon from '../icons/error';

type ErrorAlertProps = {
  message: string;
};

const ErrorAlert = ({ message }: ErrorAlertProps) => (
  <div role="alert" className="alert alert-error w-80 mt-4">
    <ErrorIcon />
    <span>{message}</span>
  </div>
);

export default ErrorAlert;
