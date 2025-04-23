import React from 'react'
import { useState } from 'react';
import { Card , Button } from 'react-bootstrap';


const Review = ({reviews}) => {
    const [expandedIds, setExpandedIds] = useState(new Set());
    if (!reviews || !reviews.results?.length) {
        return <p className="text-center">등록된 리뷰가 없습니다.</p>;
      }

    const reviewExpand = (id) => {
        setExpandedIds((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(id)) {
            newSet.delete(id);
          } else {
            newSet.add(id);
          }
          return newSet;
        });
      };  
      
      return (
        <div className="review-list">
          {reviews.results.map((rev) => {
            const isExpanded = expandedIds.has(rev.id);
            const content = rev.content || '';
            const displayText =
              isExpanded || content.length <= 300
                ? content
                : `${content.slice(0, 300)}...`;
 
    return (
        <Card key={rev.id} className="mb-3 border border-danger bg-black text-white" >
            <Card.Body>
            <Card.Title style={{ fontWeight: 'bold' }}>
                {rev.author}
            </Card.Title>
            <Card.Text className='text-white'>{displayText} {content.length > 300 && (
                <Button variant="link" className='text-white' onClick={() => reviewExpand(rev.id)}>
                {isExpanded ? '접기' : '더보기'}
                </Button>
            )}</Card.Text>
            
            </Card.Body>
        </Card>
        );
    })}
    </div>
);
};

export default Review;