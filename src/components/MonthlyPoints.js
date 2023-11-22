import { Spinner } from 'react-bootstrap';
import { useRequest } from '../hooks/request';
import { pointsService } from '../singletons';
import FetchError from './FetchError';

function MonthlyPoints() {
  const { data, error, loading, retry } = useRequest(pointsService.getMonthlyPointsLatest3Months);

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <FetchError error={error} onRetryClick={retry} />;
  }

  return (
    <>
      <h1>Monthly points</h1>
    </>
  );
}

export default MonthlyPoints;
