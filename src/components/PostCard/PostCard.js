import React from "react";
import timeElapsed from "../../utils/timeElapsed";
import { useDispatch } from "react-redux";
import { setPost, toggleDisplayPost } from "../../features/Post/PostSlice";

import { Col, Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import './PostCard.css'

export default function PostCard(props) {
    const dispatch = useDispatch();

    const { data } = props;
    // handle crossposts from other subreddits
    const { url, url_overridden_by_dest, title, author, selftext, ups, downs, post_hint, is_gallery, gallery_data, secure_media, thumbnail, permalink, created_utc } = data.crosspost_parent_list ? data.crosspost_parent_list[0] : data;

    const postDate = new Date(created_utc * 1000);
    const postAge = timeElapsed(postDate);
    const [ unitOfTime, unitsElapsed ] = postAge.largestUnit;
    const whenPostedDisplay = unitOfTime === 'day' && unitsElapsed > 7 ? postDate.toLocaleDateString() : `${unitsElapsed} ${unitOfTime}${unitsElapsed > 1 ? 's' : ''} ago`

    // replace encoded ampersands in title string with ampersand character
    const decodedTitle = title.replace(/&amp;/g, '&');
    
    // determine what type of post - image, gallery or video, or link to external content like imgur or youtube
    const postType = post_hint === 'image' ? 'image' : post_hint === 'hosted:video' ? 'video' : ['link', 'rich:video'].includes(post_hint) ? 'link' : is_gallery ? 'gallery' : undefined;

    // construct post object to send to store when PostCard is clicked
    const post = {
        url: postType !== 'link' ? url : url_overridden_by_dest,
        type: postType,
        title: decodedTitle,
        author,
        whenPostedDisplay,
        ups,
        downs,
        content: selftext,
        permalink,
        thumbnail,
    }

    if (postType === 'image') {
        post.backgroundImageUrl = url
    } else if (postType === 'video') {
        post.backgroundImageUrl = thumbnail
        post.secure_media = secure_media
    } else if (postType === 'gallery') {
        post.backgroundImageUrl = `https://i.redd.it/${gallery_data.items[0].media_id}.jpg`;
        post.gallery_data = gallery_data;
    }

    const background = {
        backgroundColor: post.backgroundImageUrl ? 'unset' : '#e5e5f7',
        opacity: 1,
        backgroundImage: post.backgroundImageUrl ?
        `linear-gradient(180deg, rgba(0, 0, 0, 0.8) -20%, transparent 60%), linear-gradient(360deg, rgba(0, 0, 0, 1) -10%, transparent 50%), url(${post.backgroundImageUrl})`
        : 'linear-gradient(135deg, rgb(13 110 253 / 0.1) 25%, transparent 25%), linear-gradient(225deg, rgb(13 110 253 / 0.1) 25%, transparent 25%), linear-gradient(45deg, rgb(13 110 253 / 0.1) 25%, transparent 25%), linear-gradient(315deg, rgb(13 110 253 / 0.1) 25%, #e5e5f7 25%)',
        backgroundPosition: post.backgroundImageUrl ? 'center' : '11px 0, 11px 0, 0 0, 0 0',
        backgroundSize: post.backgroundImageUrl ? 'cover' : '22px 22px',
        backgroundRepeat: post.backgroundImageUrl ? 'no-repeat' : 'repeat'
    }

    const handleClick = () => {
        dispatch(setPost(post));
        dispatch(toggleDisplayPost());
    }
    
    return (
        <Col sm={{size: 6}} md={{size: 4}} className='d-flex align-items-stretch mb-2 px-1'>
            <Card className='PostCard flex-grow-1' style={background} onClick={handleClick}>
                <CardBody className='CardBody'>
                    <CardTitle className={`CardTitle ${post.backgroundImageUrl && 'text-light'}`}>
                        {decodedTitle.length > 100 ? `${decodedTitle.substring(0, 99)}...` : decodedTitle}
                    </CardTitle>
                    {postType === 'link' && <CardSubtitle>{url_overridden_by_dest}</CardSubtitle>}
                    <CardText>
                        {selftext.length > 100 ? `${selftext.substring(0, 99)}...` : selftext}
                    </CardText>
                    {postType === 'link' && <img src={thumbnail} />}
                </CardBody>
                <CardFooter className={`d-flex justify-content-between flex-wrap border-0 bg-transparent ${post.backgroundImageUrl && 'text-light'}`}>
                    {(ups > 0 || downs > 0) && 
                        <span>
                            { ups > 0 && <><FontAwesomeIcon icon={faArrowUp} /> {ups}</>}
                            { downs > 0 && <><FontAwesomeIcon icon={faArrowDown} /> {downs}</>}
                        </span>}
                    <span className='mx-1'>/u/{author}</span>
                    <span>{unitOfTime === 'day' && unitsElapsed > 7 ? postDate.toLocaleDateString() : `${unitsElapsed} ${unitOfTime}${unitsElapsed > 1 ? 's' : ''} ago`}</span>
                </CardFooter>
            </Card>
        </Col>
    )
}