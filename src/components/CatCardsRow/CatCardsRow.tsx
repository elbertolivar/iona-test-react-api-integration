import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Cat } from '../../models';
import { CatCard } from '../CatCard';

interface Props {
  cats?: Cat[];
  onViewDetails?: (cat: Cat) => void;
}

// A component to iterate cats to display cat cards
export const CatCardsRow: React.FC<Props> = ({ cats = [], onViewDetails }) => {
  return (
    <Row>
      { 
        cats.length > 0 ? cats.map((cat) => (
          <Col key={cat.id} xs sm="6" md="3">
            <CatCard cat={cat} onViewDetails={onViewDetails} />
          </Col>
        )) : (
          <Col xs sm="6" md="3">
            <p className="mb-20">No cats available</p>
          </Col>
        )
      }
    </Row>
  );
}