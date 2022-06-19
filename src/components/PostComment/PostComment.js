import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useDispatch } from 'react-redux';
import { toggleCommentHighlight, toggleCommentCollapse, setCommentThreadLength } from '../../features/Post/PostSlice';

import timeElapsed from '../../utils/timeElapsed';

import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import More from '../More/More';

import './PostComment.css'
import 'react-loading-skeleton/dist/skeleton.css'

export default function PostComment(props) {
    const dispatch = useDispatch();
    
    const { author, content, createdUTC, ups, downs, replies, name, parent, highlight, collapsed, threadLength, isLoading } = props;
    
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

    if(isLoading) {
        return (
            <div className={`PostComment d-flex justify-content-start align-items-center py-2 my-2`}>
                <Skeleton className='me-2' height={110} width={10} />
                <div className='PostComment-content flex-grow-1'>
                    <div className='PostComment-header d-flex justify-content-between align-items-center'>
                        <div className='PostComment-author PostComment-toggle-read d-flex'>
                            <Skeleton className='me-2' width={50} />
                            <Skeleton width={100} />
                        </div>
                        <Skeleton className='PostCOmment-ups-downs' width={50} />
                    </div>
                    <div className='PostComment-body'>
                        <Skeleton count={3}/>
                    </div>
                </div>
            </div>
        )
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

    const commentDate = new Date(createdUTC * 1000);
    const commentAge = timeElapsed(commentDate, 'day', 7);
    const whenPosted = commentAge.toPreferredString();

    const upsCount = ups > 0 ? <span><FontAwesomeIcon icon={faArrowUp} /> {ups}</span> : '';
    const downsCount = downs > 0 ? <span><FontAwesomeIcon icon={faArrowDown} /> {downs}</span> : '';
    const nestedReplyContent = nestedReplies.length > 0 ? nestedReplies.slice(0, threadLength) : '';
    const moreRepliesButton = threadLength < nestedReplies.length ? <More moreWhat='replies' onClick={handleIncreaseThreadLength} /> : '';

    return (
        <div className={`PostComment d-flex justify-content-start py-2 my-2 ${collapsed && 'PostComment-collapsed'} ${highlight && 'PostComment-reading'}`}>
            <div className='PostComment-toggle' role='button' onClick={toggleHighlight}></div>
            <div className='PostComment-content flex-grow-1'>
                <div className='PostComment-header d-flex justify-content-between align-items-center'>
                    <div className='PostComment-author PostComment-toggle-read' role='button' onClick={toggleCollapse}>
                        <span className='fw-bold'>{`/u/${author}`} </span>
                        <span>posted {whenPosted}</span>
                    </div>
                    <span className='PostComment-ups-downs me-2'>{upsCount}{downsCount}</span>
                </div>
                <div className='PostComment-body'>
                    <ReactMarkdown className='ReactMarkdown' children={content} linkTarget='_blank' skipHtml={true}/>
                    <div className='PostComment-replies d-flex flex-column'>{nestedReplyContent}</div>
                    {moreRepliesButton}
                </div>
            </div>
        </div>
    )
}