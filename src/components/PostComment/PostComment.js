import React from "react";
import { useDispatch } from "react-redux";

import { v4 as uuidv4 } from 'uuid';

import timeElapsed from "../../utils/timeElapsed";

import { toggleCommentHighlight, toggleCommentCollapse, setCommentThreadLength } from "../../features/Post/PostSlice";

import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import './PostComment.css'

export default function PostComment(props) {
    const dispatch = useDispatch();
    
    const { author, content, createdUTC, ups, downs, replies, name, parent, highlight, collapsed, threadLength } = props;
    const commentDate = new Date(createdUTC * 1000);
    const commentAge = timeElapsed(commentDate);
    const [ unitOfTime, unitsElapsed ] = commentAge.largestUnit;
    

    const toggleHighlight = () => {
        dispatch(toggleCommentHighlight([...parent, name]))
    }

    const toggleCollapse = () => {
        dispatch(toggleCommentCollapse([...parent, name]))
    }

    const handleIncreaseThreadLength = () => {
        dispatch(setCommentThreadLength({
            parents: [...parent, name],
            threadLength: threadLength + 3
        }))
    }

    

    const nestedReplies = (replies || []).map(nestedReply => {
        return <PostComment 
            key={uuidv4()}
            name={nestedReply.data.name}
            parent={[...parent, nestedReply.data.parent_id]}
            author={nestedReply.data.author}
            content={nestedReply.data.body}
            createdUTC={nestedReply.data.created_utc}
            ups={nestedReply.data.ups}
            downs={nestedReply.data.downs}
            replies={nestedReply.data.replies ? nestedReply.data.replies.data.children.filter(reply => reply.kind === 't1') : []}
            highlight={nestedReply.highlight}
            collapsed={nestedReply.collapsed}
            // if the reply doesn't have an explicit length in state, then don't show any replies.
            threadLength={nestedReply.threadLength === undefined ? 0 : nestedReply.threadLength }
        />
    })

    return (
        <div className={`PostComment d-flex justify-content-start py-2 my-2 ${collapsed && 'PostComment-collapsed'} ${highlight && 'PostComment-reading'}`}>
            <div className='PostComment-toggle' role='button' onClick={toggleHighlight}></div>
            <div className='PostComment-content flex-grow-1'>
                <div className='PostComment-header d-flex justify-content-between align-items-center'>
                    <div className='PostComment-author PostComment-toggle-read' role='button' onClick={toggleCollapse}>
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
                    {nestedReplies.length > 0 && <div className='PostComment-replies d-flex flex-column'>{nestedReplies.slice(0, threadLength)}</div>}
                    { threadLength < nestedReplies.length && 
                    <div className='d-flex my-2 PostComment-collapsed'>
                        <div className='PostComment-toggle' role='button' onClick={handleIncreaseThreadLength}></div>
                        <button onClick={handleIncreaseThreadLength} className='PostComment-more-replies'>more replies</button> 
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}