import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGalleryIndex, setGalleryIndex } from "../../features/post/postSlice";

import { Carousel, CarouselIndicators, CarouselItem, CarouselControl } from "reactstrap";

import './ImageCarousel.css'

export default function ImageCarousel(props) {
    const { items } = props;
    const dispatch = useDispatch();
    const galleryIndex = useSelector(selectGalleryIndex);

    const handleNextSlide = () => {
        const next = galleryIndex + 1 >= items.length ? 0 : galleryIndex + 1;
        dispatch(setGalleryIndex(next));
    }

    const handlePrevSlide = () => {
        const next = galleryIndex - 1 < 0 ? items.length - 1 : galleryIndex - 1;
        dispatch(setGalleryIndex(next));
    }

    return (
        <Carousel
            activeIndex={galleryIndex}
            next={handleNextSlide}
            previous={handlePrevSlide}
        >
            <CarouselIndicators
                activeIndex={galleryIndex}
                items={items.map((image, i) => ({ ...image, altText: `Slide ${i+1}`, key: `${i + 1}`, src: `https://i.redd.it/${image.media_id}.jpg` }))}
                onClickHandler={newIndex => {dispatch(setGalleryIndex(newIndex))}}
            />
            {items.map((image, i) => (
                <CarouselItem>
                    <img 
                        alt={`Slide ${i+1}`}
                        src={`https://i.redd.it/${image.media_id}.jpg`}
                    />
                </CarouselItem>
            ))}
            <CarouselControl
                className='CarouselControlPrev'
                direction="prev"
                directionText="Previous"
                onClickHandler={handlePrevSlide}
                />
            <CarouselControl
                className='CarouselControlNext'
                direction="next"
                directionText="Next"
                onClickHandler={handleNextSlide}
            />
        </Carousel>
    )
}