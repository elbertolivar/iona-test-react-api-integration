import React from 'react';
import { Button } from 'react-bootstrap';

interface Props {
  loading?: boolean;
  onLoadMore?: () => void;
}

// A component for loading more functionality
export const LoadMoreBtn: React.FC<Props> = ({ loading = false, onLoadMore }) => {
  return (
    <Button variant="success" disabled={loading} onClick={onLoadMore}>{loading ? 'Loading cats...' : 'Load more'}</Button>
  );
}