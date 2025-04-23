import React from 'react'
import { Card,Row,Col } from 'react-bootstrap';


const SimilarMovie = ({ similar }) => {
    
  if (!similar?.results?.length) {
    return (
        <>
        <div>&#8226; Recommand</div>
        <p className="text-center">There are No Recommand movies.</p>
        </>
    )
     } 
  
 

  return (
    <div className="similar-section mb-5">
      <h4 className="credit-cast">&#8226; Recommand영역 슬라이더로 교체</h4>
      <Row xs={2} sm={3} md={4} lg={5} className="g-3">
        {similar.results.slice(0, 5).map((m) => (
          <Col key={m.id}>
            <Card className="similar-card">
                {m.poster_path ? (
                <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                alt={m.title}
              /> ) : (
                <div className="recommand-placeholder-img" />
              )}
              
              <Card.Body>
                <Card.Title className="similar-title">{m.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    
  );
};


export default SimilarMovie