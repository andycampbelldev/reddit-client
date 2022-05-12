import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDisplayingPost, selectPost, selectGalleryActiveIndex } from "./postSlice";
import { toggleDisplayPost, setGalleryActiveIndex } from "./postSlice";

import { Modal, ModalHeader, ModalBody, CardSubtitle, Carousel, CarouselIndicators, CarouselItem, CarouselControl } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import './Post.css'

export default function PostDetail(props) {
    const { show } = props;
    const dispatch = useDispatch();
    const post = useSelector(selectPost);
    const displayingPost = useSelector(selectDisplayingPost);
    const galleryActiveIndex = useSelector(selectGalleryActiveIndex);

    const handleClose = () => {
        dispatch(toggleDisplayPost());
        dispatch(setGalleryActiveIndex(0))
    }

    const handleNextSlide = () => {
        const next = galleryActiveIndex + 1 >= post.gallery.items.length ? 0 : galleryActiveIndex + 1;
        dispatch(setGalleryActiveIndex(next));
    }

    const handlePrevSlide = () => {
        const next = galleryActiveIndex - 1 < 0 ? post.gallery.items.length - 1 : galleryActiveIndex - 1;
        dispatch(setGalleryActiveIndex(next));
    }


    // preven body scrolling when Post is showing
    useEffect(() => {
        document.body.style.overflow = displayingPost ? 'hidden' : 'unset';
    }, [displayingPost, dispatch])

    return (
        <Modal className='Post' size='lg' scrollable isOpen={show}>
            <ModalHeader
                close={<button className='btn-close' onClick={handleClose}></button>}
                className='align-items-start'
            >
                <span className='Post-votes'>
                        { post.ups > 0 && <><FontAwesomeIcon icon={faArrowUp} /> {post.ups} </>}
                        { post.downs > 0 && <><FontAwesomeIcon icon={faArrowDown} /> {post.downs} </>}
                </span>
                {post.title}
                <CardSubtitle className='Post-author text-muted'>
                    /u/{post.author}
                </CardSubtitle>
            </ModalHeader>
            <ModalBody>
                {post.type === 'image' && <img className='img-fluid' src={post.url}></img>}
                {post.type === 'video' && <video controls muted src={post.videoSrc.reddit_video.fallback_url}>Error</video> }
                {post.type === 'gallery' && 
                    <Carousel
                        activeIndex={galleryActiveIndex}
                        next={handleNextSlide}
                        previous={handlePrevSlide}
                        slide={false}
                    >
                        <CarouselIndicators
                            activeIndex={galleryActiveIndex}
                            items={post.gallery.items.map((image, i) => ({ ...image, altText: `Slide ${i+1}`, key: `${i + 1}`, src: `https://i.redd.it/${image.media_id}.jpg` }))}
                            onClickHandler={newIndex => {dispatch(setGalleryActiveIndex(newIndex))}}
                        />
                        {post.gallery.items.map((image, i) => (
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
                }
                {post.content}
            </ModalBody>
        </Modal>
    )
}