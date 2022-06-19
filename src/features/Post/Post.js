import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { 
    selectActivePostId,
    selectDisplayingPost, 
    toggleDisplayPost, 
    setGalleryIndex, 
    selectComments, 
    selectCommentsLoading, 
    selectCommentsError, 
    getCommentsForPost, 
    setPostThreadLength, 
    selectPostThreadLength 
} from './PostSlice';

import { Modal, ModalHeader, ModalBody, CardSubtitle, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import PostComment from '../../components/PostComment/PostComment';
import More from '../../components/More/More';

import './Post.css'

export default function PostDetail({ show, data }) {
    const  { 
        postType, 
        url, 
        url_overridden_by_dest, 
        ups, 
        downs, 
        decodedTitle, 
        author, 
        selftext, 
        whenPosted, 
        secure_media, 
        gallery_data, 
        permalink, 
        thumbnail, 
        num_comments 
    } = data;
    
    const dispatch = useDispatch();
    
    const displayingPost = useSelector(selectDisplayingPost);
    const activePostId = useSelector(selectActivePostId);
    const threadLength = useSelector(selectPostThreadLength);
    const comments = useSelector(selectComments);
    const commentsLoading = useSelector(selectCommentsLoading);
    const commentsError = useSelector(selectCommentsError);

    const handleClose = () => {
        dispatch(toggleDisplayPost());
        dispatch(setGalleryIndex(0));
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
        if(activePostId) {
            dispatch(getCommentsForPost(permalink));
            dispatch(setPostThreadLength(3));
        }
    }, [activePostId, dispatch])
    
    const postUrl = postType !== 'link' ? url : url_overridden_by_dest
    
    let postMainContent
    if (postType === 'image') {
        postMainContent = <img className='img-fluid' src={postUrl} alt={decodedTitle}></img>
    } else if (postType === 'video') {
        postMainContent = <video className='img-fluid' controls muted src={secure_media.reddit_video.fallback_url}>Error</video>
    } else if (postType === 'gallery') {
        postMainContent = <ImageCarousel images={gallery_data.items} />
    } else if (postType === 'link') {
        postMainContent = 
        <Row className='Post-external-link d-flex justify-content-between align-items-center'>
                <a target='_blank' rel='noreferrer' href={postUrl}>{postUrl}</a>
                <img className='m-2' src={thumbnail} alt={decodedTitle} />
            </Row>
    }

    const commentsContent = !commentsLoading && comments.length > 0 
        ?  comments.slice(0, threadLength).map((comment) => (
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
        : '';
    
        const upsCount = ups > 0 ? <span><FontAwesomeIcon icon={faArrowUp} /> {ups}</span> : '';
        const downsCount = downs > 0 ? <span><FontAwesomeIcon icon={faArrowDown} /> {downs}</span> : '';
        const postTextContent = selftext ? <p>{selftext}</p> : '';
        const commentsHeader = `${num_comments} Comment${num_comments > 1 || num_comments === 0 ? 's' : ''}`
        const commentsErrorMessage = commentsError ? <p>Could not load comments. Please try again.</p> : '';
        const commentsLoadingSkeleton = commentsLoading ? <PostComment isLoading={true} /> : '';
        const moreCommentsButton = !commentsLoading && threadLength < comments.length ? <More moreWhat='comments' onClick={handleMoreComments} /> : '';

    return (
        <Modal className='Post' size='lg' scrollable isOpen={show}>
            <ModalHeader
                close={<button className='btn-close' onClick={handleClose}></button>}
                className='Post-header align-items-start'
                tag='div'
            >
                <span className='Post-votes'>{upsCount}{downsCount}</span>
                <span>{decodedTitle}</span>
                <CardSubtitle className='Post-author mt-1'>
                    <span className='fw-bold'>/u/{author}</span>
                    <span className='ms-2'>posted {whenPosted}</span>
                </CardSubtitle>
            </ModalHeader>
            <ModalBody>
                {postMainContent}
                {postTextContent}
                <h5 className='my-3'>{commentsHeader}</h5>
                <div className='Post-comments d-flex flex-column'>
                    {commentsErrorMessage}
                    {commentsLoadingSkeleton}
                    {commentsContent}
                    {moreCommentsButton}
                </div>
            </ModalBody>
        </Modal>
    )
}