import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Cat } from '../../models';

interface Props {
  cat: Cat;
  onBackClicked?: () => void;
}

// A component to display cat details into a card
export const CatInfoCard: React.FC<Props> = ({ cat, onBackClicked }) => {
  return (
    <Card>
      <Card.Header>
        <Button variant="primary" onClick={onBackClicked}>Back</Button>
      </Card.Header>
      <Card.Img variant="top" src={cat.imgUrl} />
      <Card.Body>
        <h4>{cat.name}</h4>
        <h5>Origin: {cat.origin}</h5>
        <h6>{cat.temperament}</h6>
        <p>{cat.description}</p>
      </Card.Body>
    </Card>
  );
}