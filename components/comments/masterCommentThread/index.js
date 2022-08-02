import React, { useState } from 'react';
import propTypes from 'prop-types';

import { useAuth } from '../../../contexts/AuthContext';
import { addComment, getProfileData } from '../../../lib/firebaseClient';
import CommentThread from '../commentThread/index.js';
import ReplyForm from '../replyForm/index.js';

const MasterCommentThread = ({ slug, type, parentId, maxThreadDepth }) => {
    const [addedSubThreadComments, setAddedSubThreadComments] = useState([]);
    const { userid } = useAuth();
    let firebaseUser = userid;

    const addCommentToMasterThread = async (commentReplyText) => {
        const comment = {
            parentId, 
            content: commentReplyText,
            postId: slug,
            postType: type,
        };

        const result = await addComment(comment, firebaseUser, userid);
        setAddedSubThreadComments([...addedSubThreadComments, result])
    };

    return (
        <div className="container">
            <div className="row"> 
                <div className="col-sm-12"> 
                    {firebaseUser ? <ReplyForm newCommentButtonText="Add comment" postComment={addCommentToMasterThread} /> : <p>Login to comment</p>}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12"> 
                    <CommentThread slug={slug} type={type} parentId={parentId} maxThreadDepth={maxThreadDepth} parentAddedSubThreadComments={addedSubThreadComments} />
                </div>
            </div>
        </div>
    );
}

MasterCommentThread.propTypes = {
    slug: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    parentId: propTypes.string,
    maxThreadDepth: propTypes.number,
    userIdForComment: propTypes.string,
}

MasterCommentThread.defaultProps = {
    parentId: null,
    maxThreadDepth: 0
}

export default MasterCommentThread;