import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDisplayingPost, selectPost } from "./postSlice";
import { toggleDisplayPost } from "./postSlice";

import { Modal, ModalHeader, ModalBody, CardSubtitle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import './Post.css'

export default function PostDetail(props) {
    const { show } = props;
    const dispatch = useDispatch();
    const post = useSelector(selectPost);
    const displayingPost = useSelector(selectDisplayingPost)

    const handleClick = () => {
        dispatch(toggleDisplayPost());
    }

    // preven body scrolling when Post is showing
    useEffect(() => {
        document.body.style.overflow = displayingPost ? 'hidden' : 'unset';
    }, [displayingPost, dispatch])

    return (
        <Modal className='Post' size='lg' scrollable isOpen={show}>
            <ModalHeader
                close={<button className='btn-close' onClick={handleClick}></button>}
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
                {/* need to render video if available */}
                {post.type === 'hosted:video' && <video controls muted src={post.videoSrc.reddit_video.fallback_url}>Error</video> }
                {post.content}
            </ModalBody>
        </Modal>
    )
}