import React, { useState } from 'react';
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators} from 'reactstrap';
import '../style/Itineraries.css';


const ActivitiesCarousel = (props) => {

    const {itinerary} = props

    const items = itinerary.activities;

    const [activeIndex, setActiveIndex] = useState(0);

    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const activitiesList = itinerary.activities.map((activity) => {
        return (
            
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={activity._id}>
                <div className="activityTandem">
                    <img className='responsive'src={activity.img} alt='activity_img'/>
                    <h5 className='activityTitle' >{activity.title}</h5>
                </div>
        </CarouselItem>
        
        );
    });

    return (
        <div className="carouselContainer">
            <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {activitiesList}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </div>
    );
}

export default ActivitiesCarousel;