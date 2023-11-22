import { Alert, Button } from 'react-bootstrap';

function FetchError({ error, onRetryClick }) {
  return (
    <Alert variant="danger">
      <div>{error.message}</div>
      <br />
      <Button variant="outline-danger" onClick={onRetryClick}>
        Retry
      </Button>
    </Alert>
  );
}

export default FetchError;
