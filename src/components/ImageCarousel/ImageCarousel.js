import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectGalleryIndex, setGalleryIndex } from '../../features/Post/PostSlice';

import { Carousel, CarouselIndicators, CarouselItem, CarouselCaption, CarouselControl } from 'reactstrap';
import './ImageCarousel.css'

export default function ImageCarousel({ images }) {
    const dispatch = useDispatch();
    const galleryIndex = useSelector(selectGalleryIndex);

    const handleNextSlide = () => {
        const next = galleryIndex + 1 >= images.length ? 0 : galleryIndex + 1;
        dispatch(setGalleryIndex(next));
    }

    const handlePrevSlide = () => {
        const next = galleryIndex - 1 < 0 ? images.length - 1 : galleryIndex - 1;
        dispatch(setGalleryIndex(next));
    }

    return (
        <Carousel
            activeIndex={galleryIndex}
            next={handleNextSlide}
            previous={handlePrevSlide}
            interval={false}
        >
            <CarouselIndicators
                activeIndex={galleryIndex}
                items={images.map((image, i) => ({ altText: `Slide ${i+1}`, key: `${i + 1}`, src: `https://i.redd.it/${image.media_id}.jpg` }))}
                onClickHandler={newIndex => {dispatch(setGalleryIndex(newIndex))}}
            />
            {images.map((image, i) => (
                <CarouselItem className='CarouselItem' key={image.media_id}>
                    <img  alt={`Slide ${i+1}`} src={`https://i.redd.it/${image.media_id}.jpg`} />
                    {image.caption && <CarouselCaption className='CarouselCaption' captionText={image.caption}/>}
                </CarouselItem>
            ))}
            <CarouselControl
                className={'CarouselControlPrev'}
                direction='prev'
                directionText='Previous'
                onClickHandler={handlePrevSlide}
                />
            <CarouselControl
                className={'CarouselControlNext'}
                direction='next'
                directionText='Next'
                onClickHandler={handleNextSlide}
            />
        </Carousel>
    )
}