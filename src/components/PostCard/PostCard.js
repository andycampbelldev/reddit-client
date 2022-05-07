import React from "react";

import { Col, Card, CardBody, CardTitle, CardText, CardFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import './PostCard.css'

export default function PostCard(props) {
    const { data } = props;
    const { url, selftext, ups, downs, author } = data;
    // replace encoded ampersands in title string with ampersand character
    const title = data.title.replace(/&amp;/g, '&');
    const hasImage = url.includes('.jpg');    

    const background = {
        backgroundColor: hasImage ? 'unset' : '#e5e5f7',
        opacity: 1,
        backgroundImage: hasImage ?
        `linear-gradient(180deg, rgba(0, 0, 0, 0.8) -20%, transparent 60%), linear-gradient(360deg, rgba(0, 0, 0, 1) -10%, transparent 20%), url(${data.url})`
        : 'linear-gradient(135deg, rgb(13 110 253 / 0.1) 25%, transparent 25%), linear-gradient(225deg, rgb(13 110 253 / 0.1) 25%, transparent 25%), linear-gradient(45deg, rgb(13 110 253 / 0.1) 25%, transparent 25%), linear-gradient(315deg, rgb(13 110 253 / 0.1) 25%, #e5e5f7 25%)',
        backgroundPosition: hasImage ? 'center' : '11px 0, 11px 0, 0 0, 0 0',
        backgroundSize: hasImage ? 'cover' : '22px 22px',
        backgroundRepeat: hasImage ? 'no-repeat' : 'repeat'
    }
    
    return (
        <Col sm={{size: 6}} md={{size: 4}} className='d-flex align-items-stretch mb-2 px-1'>
            <Card className='PostCard flex-grow-1' style={background}>
                <CardBody>
                    <CardTitle className={`CardTitle ${hasImage && 'text-light'}`}>
                        {title.length > 100 ? `${title.substring(0, 99)}...` : title}
                    </CardTitle>
                    <CardText>
                        {selftext.length > 100 ? `${selftext.substring(0, 99)}...` : selftext}
                    </CardText>
                </CardBody>
                <CardFooter className={`d-flex justify-content-between border-0 bg-transparent ${hasImage && 'text-light'}`}>
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