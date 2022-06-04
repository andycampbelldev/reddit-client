import React, { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { selectDisplayingPost, selectPost, toggleDisplayPost, setGalleryIndex, selectComments, selectCommentsLoading, selectCommentsError, getCommentsForPost, setPostThreadLength, selectPostThreadLength } from "./PostSlice";

import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import PostComment from "../../components/PostComment/PostComment";

import { Modal, ModalHeader, ModalBody, CardSubtitle, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faSpinner, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

import './Post.css'

export default function PostDetail(props) {
    const { show } = props;
    const dispatch = useDispatch();
    const post = useSelector(selectPost, shallowEqual);
    const displayingPost = useSelector(selectDisplayingPost);
    const threadLength = useSelector(selectPostThreadLength);
    const comments = useSelector(selectComments);
    const commentsLoading = useSelector(selectCommentsLoading);
    const commentsError = useSelector(selectCommentsError);

    const  { type, ups, downs, title, author, whenPostedDisplay, url, secure_media, gallery_data, permalink, thumbnail, name, num_comments } = post;
    //const postType = post_hint === 'image' ? 'image' : post_hint === 'hosted:video' ? 'video' : is_gallery ? 'gallery' : undefined;


    const handleClose = () => {
        dispatch(toggleDisplayPost());
        dispatch(setGalleryIndex(0));
        //dispatch(setVisibleComments(3));
    }

    const handleMoreComments = () => {
        const newLength = threadLength + 3;
        dispatch(setPostThreadLength(newLength))
    }

    // prevent body scrolling when Post is showing
    useEffect(() => {
        document.body.style.overflow = displayingPost ? 'hidden' : 'unset';
    }, [displayingPost, dispatch])

    useEffect(() => {
        if(permalink) {
            dispatch(getCommentsForPost(permalink));
        }
    }, [permalink, dispatch])

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
                <CardSubtitle className='Post-author mt-1'>
                    <span className='fw-bold'>/u/{author}</span>
                    <span className='ms-2'>posted {whenPostedDisplay}</span>
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
                <h5 className='my-3'>{num_comments} Comment{num_comments > 1 || num_comments === 0 ? 's' : ''}</h5>
                <div className='Post-comments d-flex flex-column'>
                    {commentsLoading && <Row><FontAwesomeIcon className='fa-spin fa-5x' icon={faSpinner} /></Row>}

                    {commentsError && <Row><FontAwesomeIcon className='fa-5x' icon={faHeartBroken} /></Row>}
                    
                    {!commentsLoading && comments.length > 0
                    //&& comments.map((comment, index) => (
                    && comments.slice(0, threadLength).map((comment, index) => (
                        <PostComment 
                            key={uuidv4()}
                            name={comment.data.name}
                            parent={[]}
                            author={comment.data.author}
                            content={comment.data.body}
                            createdUTC={comment.data.created_utc}
                            ups={comment.data.ups}
                            downs={comment.data.downs}
                            replies={comment.data.replies ? comment.data.replies.data.children.filter(c => c.kind === 't1') : []}
                            highlight={comment.highlight}
                            collapsed={comment.collapsed}
                            threadLength={comment.threadLength}
                        />)
                    ) 
                    }
                    { !commentsLoading && threadLength < comments.length && <button onClick={handleMoreComments} className='Post-more-comments'>more comments</button> }
                </div>
                
            </ModalBody>
        </Modal>
    )
}