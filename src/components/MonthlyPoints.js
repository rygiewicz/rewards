import { Spinner, Table } from 'react-bootstrap';
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Month</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {data.transactions.map((item) => (
            <tr key={item.month}>
              <td>{item.month}</td>
              <td>{item.points}</td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td>{data.totalPoints}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default MonthlyPoints;
