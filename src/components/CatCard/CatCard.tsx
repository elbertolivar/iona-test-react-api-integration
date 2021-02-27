import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Cat } from '../../models';

import './styles.scss';

interface Props {
 cat: Cat;
 onViewDetails?: (cat: Cat) => void;
}

// A component for cat card
export const CatCard: React.FC<Props> = ({ cat, onViewDetails }) => {
  return (
    <Card className="cat-card">
      <Card.Img variant="top" src={cat.imgUrl} />
      <Card.Body>
        <Button variant="primary" block onClick={() => onViewDetails && onViewDetails(cat) }>View Details</Button>
      </Card.Body>
    </Card>
  );
}