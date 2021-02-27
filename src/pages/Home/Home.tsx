import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import './styles.scss';

import { useQueryParams } from '../../hooks';
import { BreedSelector } from '../../components/BreedSelector';
import { CatCardsRow } from '../../components/CatCardsRow';
import { LoadMoreBtn } from '../../components/LoadMoreBtn';
import { CatContext, CatContextType } from '../../contexts/CatContext';

interface QueryParams {
  breed: string;
}

export const Home: React.FC = () => {
  const history = useHistory();
  // Get breed query param value
  const { breed } = useQueryParams<QueryParams>();
  // Use cat context
  const { breeds, cats, changeBreed, getBreeds, loadMoreCats } = useContext(CatContext) as CatContextType;

  // Navigate to the cat details page by passing cat id as parameter
  const viewCatDetails = (catId: string) => {
    history.push(`/${catId}`);
  }

  useEffect(() => {
    getBreeds();

    return () => {
      // Clean up breed id & cats state when exiting the page
      changeBreed(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Change breed id when breed query param value changes
    changeBreed(breed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breed])

  return (
    <Container className="ptb-20">
      <h2>Cat Browser</h2>
      <Row className="ptb-10">
        <Col xs sm="6" md="3">
          <BreedSelector value={cats.breedId ?? undefined} disabled={breeds.loading} breeds={breeds.data} onChange={(value) => changeBreed(value)} />
        </Col>
      </Row>
      <CatCardsRow cats={cats.data} onViewDetails={(cat) => viewCatDetails(cat.id)} />
      {/* Display only load more button when there's still cats to query */}
      {cats.data.length < cats.totalCount && (
        <Row>
          <Col xs sm="6" md="3">
            <LoadMoreBtn loading={cats.loading} onLoadMore={() => loadMoreCats()} />
          </Col>
        </Row>
      )}
    </Container>
  );
}