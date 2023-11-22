import { Spinner, Table } from 'react-bootstrap';
import { useRequest } from '../hooks/request';
import { pointsService } from '../singletons';
import FetchError from './FetchError';

function PointList() {
  const { data, error, loading, retry } = useRequest(pointsService.getPointsLatest3Months);

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <FetchError error={error} onRetryClick={retry} />;
  }

  return (
    <>
      <h1>Points</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Day</th>
            <th>Amount</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {data.transactions.map((item) => (
            <tr key={item.day}>
              <td>{item.day}</td>
              <td>{item.amount}</td>
              <td>{item.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default PointList;
