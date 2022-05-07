import React from "react";
import { Col, Card, CardBody, CardTitle, CardText, CardImg, CardImgOverlay } from "reactstrap";
import './PostCard.css'

export default function PostCard(props) {
    const { data } = props;
    // replace encoded ampersands in title string with ampersand character
    const title = data.title.replace(/&amp;/g, '&');
    const hasImage = data.url.includes('.jpg');
    const background = hasImage ? `linear-gradient(180deg, #000000cc -20%, transparent), url(${data.url})` : `linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(12,154,201,0.16152398459383754) 0%, rgba(0,212,255,0.16)`
    return (
        <Col sm={{size: 6}} md={{size: 4}} className='d-flex align-items-stretch mb-2 px-1'>
            <Card className='PostCard flex-grow-1' style={{backgroundImage: background}}>
                <CardBody>
                    <CardTitle tag='h3' className={hasImage && 'text-light'}>
                        {title.length > 100 ? `${title.substring(0, 99)}...` : title}
                    </CardTitle>
                    <CardText>
                        {data.selftext}
                    </CardText>
                </CardBody>
            </Card>
        </Col>
    )
}