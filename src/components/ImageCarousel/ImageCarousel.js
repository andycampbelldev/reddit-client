import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGalleryActiveIndex, setGalleryActiveIndex } from "../../features/post/postSlice";

import { Carousel, CarouselIndicators, CarouselItem, CarouselControl } from "reactstrap";

export default function ImageCarousel(props) {
    const { items } = props;
    const dispatch = useDispatch();
    const galleryActiveIndex = useSelector(selectGalleryActiveIndex);

    const handleNextSlide = () => {
        const next = galleryActiveIndex + 1 >= items.length ? 0 : galleryActiveIndex + 1;
        dispatch(setGalleryActiveIndex(next));
    }

    const handlePrevSlide = () => {
        const next = galleryActiveIndex - 1 < 0 ? items.length - 1 : galleryActiveIndex - 1;
        dispatch(setGalleryActiveIndex(next));
    }

    return (
        <Carousel
            activeIndex={galleryActiveIndex}
            next={handleNextSlide}
            previous={handlePrevSlide}
            slide={false}
        >
            <CarouselIndicators
                activeIndex={galleryActiveIndex}
                items={items.map((image, i) => ({ ...image, altText: `Slide ${i+1}`, key: `${i + 1}`, src: `https://i.redd.it/${image.media_id}.jpg` }))}
                onClickHandler={newIndex => {dispatch(setGalleryActiveIndex(newIndex))}}
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
                direction="prev"
                directionText="Previous"
                onClickHandler={handlePrevSlide}
                />
            <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={handleNextSlide}
            />
        </Carousel>
    )
}