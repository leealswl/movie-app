import React from 'react'
import { Modal} from 'react-bootstrap'

const TrailerModal = ({show, onHide, trailerKey,title }) => {


    return(
    <Modal show={show} onHide={onHide} size='lg' centered>
        <Modal.Header closeButton
        closeVariant="white"
        className="bg-dark text-white">
      <Modal.Title>{title} Trailer</Modal.Title>
      </Modal.Header>
    <Modal.Body className="p-0 bg-black">
    <div className="ratio ratio-16x9">
      <iframe
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title="Movie Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          border: 0,
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
      </div>
    </Modal.Body>
  </Modal>
    
    )
}

export default TrailerModal