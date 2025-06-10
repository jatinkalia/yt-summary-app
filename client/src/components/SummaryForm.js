import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSummary } from '../redux/actions/summaryActions';
import Loader from './Loader';
import Message from './Message';
import { Button, Form } from 'react-bootstrap';

const SummaryForm = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const dispatch = useDispatch();

  const summaryCreate = useSelector(state => state.summaryCreate);
  const { loading, error, summary } = summaryCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSummary(videoUrl));
  };

  return (
    <Form onSubmit={submitHandler}>
      {error && <Message variant="danger">{error}</Message>}
      {summary && (
        <Message variant="success">Summary created successfully!</Message>
      )}
      
      <Form.Group controlId="videoUrl" className="my-3">
        <Form.Label>YouTube Video URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter YouTube URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </Form.Group>

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? <Loader /> : 'Generate Summary'}
      </Button>

      {userInfo && !userInfo.isPremium && (
        <p className="mt-3">
          You have used {userInfo.summaryCount || 0}/3 free summaries today.
        </p>
      )}
    </Form>
  );
};

export default SummaryForm;