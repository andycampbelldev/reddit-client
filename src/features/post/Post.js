import React, { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from "react-redux";
import { selectDisplayingPost, selectPost, toggleDisplayPost, setGalleryIndex, selectComments, selectCommentsLoading, selectCommentsError, getCommentsForPost } from "./postSlice";

import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import PostComment from "../../components/PostComment/PostComment";

import { Modal, ModalHeader, ModalBody, CardSubtitle, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faSpinner, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

import './Post.css'

export default function PostDetail(props) {
    const { show } = props;
    const dispatch = useDispatch();
    const post = useSelector(selectPost);
    const displayingPost = useSelector(selectDisplayingPost);
    const comments = useSelector(selectComments);
    const commentsLoading = useSelector(selectCommentsLoading);
    const commentsError = useSelector(selectCommentsError);

    const  { type, ups, downs, title, author, whenPostedDisplay, url, secure_media, gallery_data, permalink, thumbnail } = post;
    //const postType = post_hint === 'image' ? 'image' : post_hint === 'hosted:video' ? 'video' : is_gallery ? 'gallery' : undefined;

    const handleClose = () => {
        dispatch(toggleDisplayPost());
        dispatch(setGalleryIndex(0));
    }

    // prevent body scrolling when Post is showing
    useEffect(() => {
        document.body.style.overflow = displayingPost ? 'hidden' : 'unset';
    }, [displayingPost, dispatch])

    useEffect(() => {
        if(permalink) {
            dispatch(getCommentsForPost(permalink));
        }
    }, [url, dispatch])

    return (
        <Modal className='Post' size='lg' scrollable isOpen={show}>
            <ModalHeader
                close={<button className='btn-close' onClick={handleClose}></button>}
                className='Post-header align-items-start'
                tag='div'
            >
                <span className='Post-votes'>
                        { ups > 0 && <><FontAwesomeIcon icon={faArrowUp} /> {ups} </>}
                        { downs > 0 && <><FontAwesomeIcon icon={faArrowDown} /> {downs} </>}
                </span>
                <span>{title}</span>
                <CardSubtitle className='Post-subtitle text-muted'>
                    <span>/u/{author}</span>
                    <span className='ms-2 fw-light'>{whenPostedDisplay}</span>
                </CardSubtitle>
            </ModalHeader>
            <ModalBody>
                {type === 'image' && <img className='img-fluid' src={url}></img>}
                {type === 'video' && <video className='img-fluid' controls muted src={secure_media.reddit_video.fallback_url}>Error</video> }
                {type === 'gallery' && <ImageCarousel items={gallery_data.items} /> }
                {type === 'link' &&
                    <Row className='Post-external-link d-flex justify-content-between align-items-center'>
                        <a target='_blank' href={url}>{url}</a>
                        <img className='m-2' src={thumbnail}/>
                    </Row>
                }
                {post.content && <p>{post.content}</p>}
                <h5 className='my-3'>Comments</h5>
                {commentsLoading && <Row><FontAwesomeIcon className='fa-spin fa-5x' icon={faSpinner} /></Row>}

                {commentsError && <Row><FontAwesomeIcon className='fa-5x' icon={faHeartBroken} /></Row>}
                
                {!commentsLoading && comments.length > 0
                && comments.map(comment => (
                    <PostComment 
                        key={uuidv4()}
                        author={comment.data.author}
                        content={comment.data.body}
                        createdUTC={comment.data.created_utc}
                        ups={comment.data.ups}
                        downs={comment.data.downs}
                    />)
                ) 
                }
                
                {!commentsLoading && comments.length === 0 && <p>This post has no comments</p>}
            </ModalBody>
        </Modal>
    )
}