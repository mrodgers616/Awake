import React, { useState } from 'react';
import propTypes from 'prop-types';

import { useAuth } from '../../../contexts/AuthContext';
import { addComment, getProfileData } from '../../../lib/firebaseClient';
import CommentThread from '../commentThread/index.js';
import ReplyForm from '../replyForm/index.js';
import {
	Container,
	Heading,
	Button,
	Image,
	Text,
	Flex,
	Box,
    Link,
	Center
  } from "@chakra-ui/react";

const MasterCommentThread = ({ slug, type, parentId, maxThreadDepth }) => {
    const [addedSubThreadComments, setAddedSubThreadComments] = useState([]);
    const [showReplyForm, setShowReplyForm] = useState(true);
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
        <Container width="175%">
                <Box bgColor="#F7FAFC" width="50%">
                    <div >
                        {firebaseUser ? <ReplyForm newCommentButtonText="New Comment" postComment={addCommentToMasterThread} /> : <Link href="https://awakeinvest.com/login/" color="#32006B">Log in to comment</Link>}
                    </div>
                </Box>
            <div className="row">
                <div className="col-sm-12"> 
                    <CommentThread slug={slug} type={type} parentId={parentId} maxThreadDepth={maxThreadDepth} parentAddedSubThreadComments={addedSubThreadComments} />
                </div>
            </div>
        </Container>
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