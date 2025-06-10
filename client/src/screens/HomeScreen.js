import { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createSummary } from '../features/summary/summarySlice';
import { resetSummaryState } from '../features/summary/summarySlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { loading, error, success } = useSelector((state) => state.summary);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    if (success) {
      dispatch(resetSummaryState());
      navigate('/dashboard');
    }
  }, [success, navigate, userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSummary(videoUrl));
  };

  return (
    <div className="my-4">
      <h1 className="text-center mb-4">YouTube Video Summarizer</h1>
      <Card className="mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Body>
          {error && <Message variant="danger">{error}</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="videoUrl" className="mb-3">
              <Form.Label>YouTube Video URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter YouTube URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <Loader /> : 'Generate Summary'}
            </Button>

            {userInfo && !userInfo.isPremium && (
              <p className="mt-3 text-muted">
                You have used {userInfo.summaryCount || 0}/3 free summaries today.
              </p>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HomeScreen;