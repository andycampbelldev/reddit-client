import React, { useState } from "react";
import timeElapsed from "../../utils/timeElapsed";

import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import './PostComment.css'

export default function PostComment(props) {
    const { author, content, createdUTC, ups, downs, replies } = props;
    const commentDate = new Date(createdUTC * 1000);
    const commentAge = timeElapsed(commentDate);
    const [ unitOfTime, unitsElapsed ] = commentAge.largestUnit;
    const [ isVisible, setIsVisible ] = useState(true);
    const [ isReading, setIsReading ] = useState(false);
    const [ numberOfReplies, setNumberOfReplies ]  = useState(3);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        setIsReading(false);
        setNumberOfReplies(3);
    }

    const toggleReaderMode = () => {
        setIsReading(!isReading);
    }

    const handleMoreReplies = () => {
        setNumberOfReplies(numberOfReplies + 3);
    }

    const nestedReplies = (replies || []).map(nestedReply => {
        return <PostComment 
            author={nestedReply.data.author}
            content={nestedReply.data.body}
            createdUTC={nestedReply.data.created_utc}
            ups={nestedReply.data.ups}
            downs={nestedReply.data.downs}
            replies={nestedReply.data.replies ? nestedReply.data.replies.data.children.filter(reply => reply.kind === 't1') : []}
        />
    })

    return (
        <div className={`PostComment d-flex justify-content-start py-2 my-2 ${!isVisible && 'PostComment-collapsed'} ${isReading && 'PostComment-reading'}`}>
            <div className='PostComment-toggle' role='button' onClick={toggleReaderMode}></div>
            <div className='PostComment-content flex-grow-1'>
                <div className='PostComment-header d-flex justify-content-between align-items-center'>
                    <div className='PostComment-author PostComment-toggle-read' role='button' onClick={toggleVisibility}>
                        <span className='fw-bold'>{`/u/${author}`} </span>
                        <span className=''>posted {unitOfTime === 'day' && unitsElapsed > 7 ? commentDate.toLocaleDateString() : `${unitsElapsed} ${unitOfTime}${unitsElapsed > 1 ? 's' : ''} ago`}</span>
                    </div>
                    <span className='PostComment-ups-downs me-2'>
                        { ups > 0 && <><FontAwesomeIcon icon={faArrowUp} /> {ups}</>}
                        { downs > 0 && <><FontAwesomeIcon icon={faArrowDown} /> {downs}</>}
                    </span>
                </div>
                <div className='PostComment-body'>
                    <ReactMarkdown className='ReactMarkdown' children={content} linkTarget='_blank' skipHtml={true}/>
                </div>
                {nestedReplies.length > 0 && <div className='PostComment-replies d-flex flex-column'>{nestedReplies.slice(0, numberOfReplies)}</div>}
                { numberOfReplies < nestedReplies.length && 
                <div className='d-flex my-2 PostComment-collapsed'>
                    <div className='PostComment-toggle' role='button' onClick={handleMoreReplies}></div>
                    <button onClick={handleMoreReplies} className='PostComment-more-replies'>more replies</button> 
                </div>
                
                }
            </div>
        </div>
    )
}