import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';


const MovieCast = ({credit}) => {
    if (!credit?.cast?.length) return null;

    const castList = credit.cast.slice(0, 6);

  return (
    <div className="movie-cast-section">
      <h4 className="credit-cast">&#8226; Actor</h4>
      <Row className="g-3 justify-content-center">
        {castList.map((member) => (
          <Col
            key={member.cast_id || member.id}
            xs={6} sm={4} md={3} lg={2}
            className="d-flex justify-content-center"
          >
            <Card style={{ width: '13rem', height: '23rem' }}>
              <Card.Img
                variant="top"
                src={
                  member.profile_path
                    ? `https://media.themoviedb.org/t/p/w276_and_h350_face/${member.profile_path}`
                    : '/placeholder-profile.png'
                }
                alt={member.name}
              />
              <Card.Body>
                <Card.Title className="cast-character" style={{ fontWeight: 'bold' }}>
                  {member.character}
                </Card.Title>
                <Card.Text className="cast-name">
                  {member.name}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieCast;