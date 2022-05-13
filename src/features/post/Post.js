import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDisplayingPost, selectPost, selectGalleryActiveIndex, toggleDisplayPost, setGalleryActiveIndex } from "./postSlice";

import Carousel from "../../components/ImageCarousel/ImageCarousel";

import { Modal, ModalHeader, ModalBody, CardSubtitle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import './Post.css'

export default function PostDetail(props) {
    const { show } = props;
    const dispatch = useDispatch();
    const post = useSelector(selectPost);
    const displayingPost = useSelector(selectDisplayingPost);

    const handleClose = () => {
        dispatch(toggleDisplayPost());
        dispatch(setGalleryActiveIndex(0))
    }

    // prevent body scrolling when Post is showing
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
                {post.type === 'gallery' && <Carousel items={post.gallery.items} /> }
                {post.content}
            </ModalBody>
        </Modal>
    )
}