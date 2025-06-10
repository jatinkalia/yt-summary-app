import { useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listSummaries } from '../features/summary/summarySlice';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { summaries, loading, error } = useSelector((state) => state.summary);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(listSummaries());
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className="my-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Your Summaries</h1>
        </Col>
        <Col className="text-end">
          {!userInfo?.isPremium && (
            <Button variant="success" onClick={() => navigate('/upgrade')}>
              Upgrade to Premium
            </Button>
          )}
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {summaries.length === 0 ? (
            <Col>
              <Message>You haven't created any summaries yet.</Message>
            </Col>
          ) : (
            summaries.map((summary) => (
              <Col key={summary._id} sm={12} md={6} lg={4} className="mb-3">
                <Card>
                  <Card.Img variant="top" src={summary.thumbnail} />
                  <Card.Body>
                    <Card.Title>{summary.title}</Card.Title>
                    <Card.Text>
                      <small className="text-muted">
                        Created at: {new Date(summary.createdAt).toLocaleString()}
                      </small>
                    </Card.Text>
                    <Card.Text>{summary.summary}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}
    </div>
  );
};

export default DashboardScreen;