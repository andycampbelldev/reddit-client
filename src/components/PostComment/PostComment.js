import React from "react";
import timeElapsed from "../../utils/timeElapsed";

import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Card, CardBody, CardText, CardFooter } from "reactstrap";

import './PostComment.css'

export default function PostComment(props) {
    const { author, content, createdUTC, ups, downs } = props;
    const commentDate = new Date(createdUTC * 1000);
    const commentAge = timeElapsed(commentDate);
    const [ unitOfTime, unitsElapsed ] = commentAge.largestUnit;

    return (
        
        <Card className='my-3'>
            <CardBody>
                <CardText className=''>
                <span><ReactMarkdown children={content} linkTarget='_blank' skipHtml={true}/></span>
                </CardText>
            </CardBody>
            <CardFooter className='d-flex justify-content-between'>
                <span className='me-3'>
                    { ups > 0 && <><FontAwesomeIcon icon={faArrowUp} /> {ups}</>}
                    { downs > 0 && <><FontAwesomeIcon icon={faArrowDown} /> {downs}</>}
                </span>
                <span className='text-muted'>{`/u/${author}`}</span>
                <span className='text-muted'>{unitOfTime === 'day' && unitsElapsed > 7 ? commentDate.toLocaleDateString() : `${unitsElapsed} ${unitOfTime}${unitsElapsed > 1 ? 's' : ''} ago`}</span>
            </CardFooter>
        </Card>
    )
}