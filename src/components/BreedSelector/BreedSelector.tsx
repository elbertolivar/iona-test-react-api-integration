import React from 'react';
import { Form } from 'react-bootstrap';
import { CatBreed } from '../../models';

interface Props {
  value?: string;
  disabled?: boolean;
  breeds?: CatBreed[];
  onChange?: (value: string) => void
}

// A component to select breeds from
export const BreedSelector: React.FC<Props> = ({ value, disabled, breeds = [], onChange }) => {
  return (
    <Form.Group>
        <Form.Label>Breed</Form.Label>
        <Form.Control as="select" value={value} disabled={disabled} onChange={(e) => onChange && onChange(e.target.value)}>
            <option key={0} value={''}>Select breed</option>
          { breeds.map((breed) => (
            <option key={breed.id} value={breed.id}>{breed.name}</option>
          ))}
        </Form.Control>
    </Form.Group>
  );
}