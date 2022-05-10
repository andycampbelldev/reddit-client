import React from "react";
import { useDispatch } from "react-redux";
import { toggleDisplayPost, setPost } from "../../features/post/postSlice";

import { Col, Card, CardBody, CardTitle, CardText, CardFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import './PostCard.css'

export default function PostCard(props) {
    const dispatch = useDispatch();

    const { data } = props;
    const { url, title, author, selftext, ups, downs, post_hint, secure_media } = data;

    // replace encoded ampersands in title string with ampersand character
    const decodedTitle = title.replace(/&amp;/g, '&');
    
    let backgroundImageUrl
    if (post_hint === 'image') {
        backgroundImageUrl = url
    } else if (post_hint === 'hosted:video') {
        backgroundImageUrl = data.thumbnail
    }

    const background = {
        backgroundColor: backgroundImageUrl ? 'unset' : '#e5e5f7',
        opacity: 1,
        backgroundImage: backgroundImageUrl ?
        `linear-gradient(180deg, rgba(0, 0, 0, 0.8) -20%, transparent 60%), linear-gradient(360deg, rgba(0, 0, 0, 1) -10%, transparent 20%), url(${backgroundImageUrl})`
        : 'linear-gradient(135deg, rgb(13 110 253 / 0.1) 25%, transparent 25%), linear-gradient(225deg, rgb(13 110 253 / 0.1) 25%, transparent 25%), linear-gradient(45deg, rgb(13 110 253 / 0.1) 25%, transparent 25%), linear-gradient(315deg, rgb(13 110 253 / 0.1) 25%, #e5e5f7 25%)',
        backgroundPosition: backgroundImageUrl ? 'center' : '11px 0, 11px 0, 0 0, 0 0',
        backgroundSize: backgroundImageUrl ? 'cover' : '22px 22px',
        backgroundRepeat: backgroundImageUrl ? 'no-repeat' : 'repeat'
    }

    const handleClick = () => {
        dispatch(setPost({ url, type: post_hint, title: decodedTitle, author, ups, downs, content: selftext, videoSrc: secure_media  }));
        dispatch(toggleDisplayPost());
    }
    
    return (
        <Col sm={{size: 6}} md={{size: 4}} className='d-flex align-items-stretch mb-2 px-1'>
            <Card className='PostCard flex-grow-1' style={background} onClick={handleClick}>
                <CardBody>
                    <CardTitle className={`CardTitle ${backgroundImageUrl && 'text-light'}`}>
                        {decodedTitle.length > 100 ? `${decodedTitle.substring(0, 99)}...` : decodedTitle}
                    </CardTitle>
                    <CardText>
                        {selftext.length > 100 ? `${selftext.substring(0, 99)}...` : selftext}
                    </CardText>
                </CardBody>
                <CardFooter className={`d-flex justify-content-between border-0 bg-transparent ${backgroundImageUrl && 'text-light'}`}>
                    <span>
                        { ups > 0 && <><FontAwesomeIcon icon={faArrowUp} /> {ups}</>}
                        { downs > 0 && <><FontAwesomeIcon icon={faArrowDown} /> {downs}</>}
                    </span>
                    <span>
                        /u/{author}
                    </span>
                </CardFooter>
            </Card>
        </Col>
    )
}