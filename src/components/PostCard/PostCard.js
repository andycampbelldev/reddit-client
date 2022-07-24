import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setActivePostId, toggleDisplayPost } from '../../features/Post/PostSlice';
import { selectCurrentSubreddit } from '../../features/SubredditNav/SubredditSlice';

import { Col, Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faComment } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css'
import './PostCard.css'

export default function PostCard({ data, isLoading }) {
    const dispatch = useDispatch();
    const appSubreddit = useSelector(selectCurrentSubreddit);

    const handleClick = () => {
        dispatch(setActivePostId(id));
        dispatch(toggleDisplayPost());
    }

    if (isLoading) {
        return (
            <Col sm={{size: 6}} md={{size: 4}} className='d-flex align-items-stretch mb-2 px-1'>
                <Card className='PostCard flex-grow-1 border-0 lh-1 bg-transparent'>
                    <Skeleton height={400} />
                </Card>
            </Col>
        )
    }

    const { 
        id,
        postType,
        url_overridden_by_dest, 
        decodedTitle, 
        author, 
        selftext, 
        ups, 
        downs,
        thumbnail,
        backgroundImageUrl,
        whenPosted, 
        num_comments, 
        subreddit 
    } = data

    // if a background image is available, create an inline style object to override the default CSS pattern
    const backgroundImageStyle = {
        backgroundColor: 'unset',
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.8) -20%, transparent 60%), linear-gradient(360deg, rgba(0, 0, 0, 1) -10%, transparent 50%), url(${backgroundImageUrl})`
    }

    const title = decodedTitle.length > 100 ? `${decodedTitle.substring(0, 99)}...` : decodedTitle;
    const subtitle = postType === 'link' ? url_overridden_by_dest : '';
    const originalSubreddit = appSubreddit.toLowerCase() !== subreddit.toLowerCase() ? `/r/${subreddit}` : '';
    const cardText = selftext.length > 100 ? `${selftext.substring(0, 99)}...` : selftext;
    const upsCount = ups > 0 ? <span><FontAwesomeIcon icon={faArrowUp} /> {ups}</span> : '';
    const downsCount = downs > 0 ? <span><FontAwesomeIcon icon={faArrowDown} /> {downs}</span> : '';
    
    return (
        <Col sm={{size: 6}} md={{size: 4}} lg={{size: 3}} className='d-flex align-items-stretch mb-2 px-1'>
            <Card className={`PostCard flex-grow-1 ${backgroundImageUrl ? 'PostCard-background-image' : 'PostCard-no-background-image'}`} style={backgroundImageUrl ? backgroundImageStyle : {}} onClick={handleClick}>
                <CardBody className='CardBody'>
                    <CardTitle className='CardTitle'>{title}</CardTitle>
                    <CardSubtitle>{subtitle}</CardSubtitle>
                    <CardSubtitle>{originalSubreddit}</CardSubtitle>
                    <CardText>{cardText}</CardText>
                </CardBody>
                <CardFooter className={`PostCard-footer d-flex justify-content-between flex-wrap border-0 bg-transparent`}>
                    <span>{upsCount}{downsCount}</span>
                    <span><FontAwesomeIcon icon={faComment} /> {num_comments}</span>
                    <span className='mx-1 fw-bold'>/u/{author}</span>
                    <span>{whenPosted}</span>
                </CardFooter>
            </Card>
        </Col>
    )
}