import { useRouteError, isRouteErrorResponse, NavLink } from 'react-router-dom';
import styles from './ErrorPage.module.css';
import Button from '../components/Button';

export default function ErrorPage() {
  const error = useRouteError();

  let code = '500';
  let title = 'Something went wrong';
  let message = 'An unexpected error occurred. Please try again later.';

  if (isRouteErrorResponse(error)) {
    code = String(error.status);
    if (error.status === 404) {
      title = 'Page not found';
      message = "The page you're looking for doesn't exist or has been moved.";
    } else if (error.status === 500) {
      title = 'Server error';
      message = 'Something went wrong on our end. Please try again later.';
    } else {
      title = error.statusText || title;
      message = error.data?.message || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span className={styles.code}>{code}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>
        <Button to="/">Go home</Button>
      </div>
    </div>
  );
}
