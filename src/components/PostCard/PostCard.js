import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPost, toggleDisplayPost } from "../../features/Post/PostSlice";
import { selectCurrentSubreddit } from "../../features/SubredditNav/SubredditSlice";

import { Col, Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faComment } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";

import 'react-loading-skeleton/dist/skeleton.css'
import './PostCard.css'

export default function PostCard({ data, isLoading }) {
    const dispatch = useDispatch();
    const appSubreddit = useSelector(selectCurrentSubreddit);

    if (isLoading) {
        return (
            <Col sm={{size: 6}} md={{size: 4}} className='d-flex align-items-stretch mb-2 px-1'>
                <Card className='PostCard flex-grow-1 border-0'>
                    <Skeleton height={400} />
                </Card>
            </Col>
        )
    }

    const { 
        id,
        postType,
        url, 
        url_overridden_by_dest, 
        decodedTitle, 
        author, 
        selftext, 
        ups, 
        downs,
        gallery_data, 
        secure_media, 
        thumbnail,
        backgroundImageUrl,
        permalink, 
        whenPosted, 
        num_comments, 
        subreddit 
    } = data

    // refactor this - perhaps just set the id of the active post in the store somewhere, and then retrieve all the post details some other way.
    // construct post object to send to store when PostCard is clicked
    const post = {
        url: postType !== 'link' ? url : url_overridden_by_dest,
        type: postType,
        title: decodedTitle,
        author,
        whenPosted,
        ups,
        downs,
        content: selftext,
        permalink,
        thumbnail,
        num_comments,
        gallery_data,
        secure_media,
        backgroundImageUrl
    }

    const dynamicPostCardStyle = {
        backgroundColor: post.backgroundImageUrl ? 'unset' : 'rgb(229, 229, 247)',
        backgroundImage: post.backgroundImageUrl ? `linear-gradient(180deg, rgba(0, 0, 0, 0.8) -20%, transparent 60%), linear-gradient(360deg, rgba(0, 0, 0, 1) -10%, transparent 50%), url(${post.backgroundImageUrl})`
        : 'linear-gradient(135deg, rgb(13 110 253 / 0.1) 25%, transparent 25%), linear-gradient(225deg, rgb(13 110 253 / 0.1) 25%, transparent 25%), linear-gradient(45deg, rgb(13 110 253 / 0.1) 25%, transparent 25%), linear-gradient(315deg, rgb(13 110 253 / 0.1) 25%, #e5e5f7 25%)'
    }

    const handleClick = () => {
        dispatch(setPost(post));
        dispatch(toggleDisplayPost());
    }
    
    return (
        <Col sm={{size: 6}} md={{size: 4}} className='d-flex align-items-stretch mb-2 px-1'>
            <Card className={`PostCard flex-grow-1 ${post.backgroundImageUrl ? 'PostCard-background-image' : 'PostCard-no-background-image'}`} style={dynamicPostCardStyle} onClick={handleClick}>
                <CardBody className='CardBody'>
                    <CardTitle className={`CardTitle`}>
                        {decodedTitle.length > 100 ? `${decodedTitle.substring(0, 99)}...` : decodedTitle}
                    </CardTitle>
                    {postType === 'link' && <CardSubtitle>{url_overridden_by_dest}</CardSubtitle>}
                    {appSubreddit.toLowerCase() !== subreddit.toLowerCase() && <CardSubtitle>/r/{subreddit}</CardSubtitle>}
                    <CardText>
                        {selftext.length > 100 ? `${selftext.substring(0, 99)}...` : selftext}
                    </CardText>
                    {postType === 'link' && <img src={thumbnail} />}
                </CardBody>
                <CardFooter className={`PostCard-footer d-flex justify-content-between flex-wrap border-0 bg-transparent`}>
                    {(ups > 0 || downs > 0) && 
                        <span>
                            { ups > 0 && <><FontAwesomeIcon icon={faArrowUp} /> {ups}</>}
                            { downs > 0 && <><FontAwesomeIcon icon={faArrowDown} /> {downs}</>}
                        </span>}
                    <span><FontAwesomeIcon icon={faComment} /> {num_comments}</span>
                    <span className='mx-1 fw-bold'>/u/{author}</span>
                    <span>{whenPosted}</span>
                </CardFooter>
            </Card>
        </Col>
    )
}