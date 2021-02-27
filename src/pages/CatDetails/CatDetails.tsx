import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import './styles.scss';

import { CatInfoCard } from '../../components/CatInfoCard';
import { CatContext, CatContextType } from '../../contexts/CatContext';

interface Params {
  id: string;
}

export const CatDetails: React.FC = () => {
  const history = useHistory();
  // Get cat id from the current location parameter
  const { id } = useParams<Params>();
  // Use cat context
  const { cat, getCat } = useContext(CatContext) as CatContextType;

  // Use history to go back to home page
  const goBackToHome = () => {
    history.push(`/?breed=${cat.data?.breedId}`);
  }

  useEffect(() => {
    // Query cat details when on page load
    getCat(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Container className="ptb-20">
      {
        cat.loading ? (
          <strong>Loading ...</strong>
        ): (
          !!cat.data && <CatInfoCard cat={cat.data} onBackClicked={() => goBackToHome()} />
        ) 
      }
    </Container>
  );
}