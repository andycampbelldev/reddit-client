import React from "react";
import { useDispatch } from "react-redux";
import { setPost, toggleDisplayPost } from "../../features/post/postSlice";

import { Col, Card, CardBody, CardTitle, CardText, CardFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import './PostCard.css'

export default function PostCard(props) {
    const dispatch = useDispatch();

    const { data } = props;
    // handle crossposts from other subreddits
    const { url, title, author, selftext, ups, downs, post_hint, is_gallery, gallery_data, secure_media, thumbnail, permalink } = data.crosspost_parent_list ? data.crosspost_parent_list[0] : data;

    // replace encoded ampersands in title string with ampersand character
    const decodedTitle = title.replace(/&amp;/g, '&');
    
    // determine what type of post - image, gallery or video
    const postType = post_hint === 'image' ? 'image' : post_hint === 'hosted:video' ? 'video' : is_gallery ? 'gallery' : undefined;

    // construct post object to send to store when PostCard is clicked
    const post = {
        url,
        type: postType,
        title: decodedTitle,
        author,
        ups,
        downs,
        content: selftext,
        permalink
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
        `linear-gradient(180deg, rgba(0, 0, 0, 0.8) -20%, transparent 60%), linear-gradient(360deg, rgba(0, 0, 0, 1) -10%, transparent 20%), url(${post.backgroundImageUrl})`
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
                <CardBody>
                    <CardTitle className={`CardTitle ${post.backgroundImageUrl && 'text-light'}`}>
                        {decodedTitle.length > 100 ? `${decodedTitle.substring(0, 99)}...` : decodedTitle}
                    </CardTitle>
                    <CardText>
                        {selftext.length > 100 ? `${selftext.substring(0, 99)}...` : selftext}
                    </CardText>
                </CardBody>
                <CardFooter className={`d-flex justify-content-between border-0 bg-transparent ${post.backgroundImageUrl && 'text-light'}`}>
                    <span>
                        { ups > 0 && <><FontAwesomeIcon icon={faArrowUp} /> {ups}</>}
                        { downs > 0 && <><FontAwesomeIcon icon={faArrowDown} /> {downs}</>}
                    </span>
                    {/* for galleries, show how many images are in the gallery */}
                    { is_gallery && <span>{`1/${gallery_data.items.length}`}</span>}
                    <span>
                        /u/{author}
                    </span>
                </CardFooter>
            </Card>
        </Col>
    )
}