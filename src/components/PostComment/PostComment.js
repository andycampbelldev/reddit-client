import React, { useState } from 'react';

import timeElapsed from '../../utils/timeElapsed';

import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import More from '../More/More';

import './PostComment.css'
import 'react-loading-skeleton/dist/skeleton.css'

export default function PostComment(props) {  
    const [ highlight, setHighlight ] = useState(false);
    const [ collapsed, setCollapsed ] = useState(false);
    const [ numberReplies, setNumberReplies ] = useState(1);

    const { author, content, createdUTC, ups, downs, replies, isLoading } = props;
    
    const toggleHighlight = () => {
        setHighlight(!highlight);
    }

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    }

    const handleMoreReplies = () => {
        setNumberReplies(numberReplies + 1);
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

    const nestedReplies = (replies || []).map(r => {
        return <PostComment 
            key={r.data.id}
            name={r.data.name}
            author={r.data.author}
            content={r.data.body}
            createdUTC={r.data.created_utc}
            ups={r.data.ups}
            downs={r.data.downs}
            replies={r.data.replies ? r.data.replies.data.children.filter(reply => reply.kind === 't1') : []}
        />
    })

    const commentDate = new Date(createdUTC * 1000);
    const commentAge = timeElapsed(commentDate, 'day', 7);
    const whenPosted = commentAge.toPreferredString();

    const upsCount = ups > 0 ? <span><FontAwesomeIcon icon={faArrowUp} /> {ups}</span> : '';
    const downsCount = downs > 0 ? <span><FontAwesomeIcon icon={faArrowDown} /> {downs}</span> : '';
    const nestedReplyContent = nestedReplies.length > 0 ? nestedReplies.slice(0, numberReplies) : '';
    const moreRepliesButton = numberReplies < nestedReplies.length ? <More moreWhat='replies' onClick={handleMoreReplies} /> : '';

    return (
        <div className={`PostComment d-flex justify-content-start my-2 overflow-hidden ${highlight ? 'PostComment-highlight' : ''} ${collapsed ? 'opacity-50' : ''}`}>
            <div className={`PostComment-blockquote flex-shrink-0 me-2 ${collapsed ? 'PostComment-blockquote-collapsed' : ''}`} role='button' onClick={toggleCollapse}></div>
            <div className='PostComment-content flex-grow-1 py-2'>
                <div className='PostComment-header d-flex justify-content-between align-items-center'>
                    <div className={`PostComment-author`} role='button' onClick={toggleHighlight}>
                        <span className='fw-bold'>{`/u/${author}`} </span>
                        <span>posted {whenPosted}</span>
                    </div>
                    <span className='PostComment-ups-downs me-2'>{upsCount}{downsCount}</span>
                </div>
                <div className={`PostComment-body overflow-hidden ${collapsed ? 'PostComment-body-collapsed' : ''}`}>
                    <ReactMarkdown className='ReactMarkdown' children={content} linkTarget='_blank' skipHtml={true}/>
                    <div className='PostComment-replies d-flex flex-column'>{nestedReplyContent}</div>
                    {moreRepliesButton}
                </div>
            </div>
        </div>
    )
}