import React, { useState } from 'react';
import propTypes from 'prop-types';
import {
	Container,
	Heading,
	Button,
	Image,
	Text,
	Flex,
	Box,
	Center,
    Input,
    Textarea
  } from "@chakra-ui/react";

const ReplyForm = ({ newCommentButtonText, submitButtonText, cancelButtonText, postComment }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [commentReplyText, setCommentReplyText] = useState('');

    const handleSubmitClick = async () => {
        await postComment(commentReplyText);
        setShowReplyForm(false);
        setCommentReplyText('');
    };

    return (
        <div>
        {!showReplyForm && (
            <a className="float-right btn btn-outline-primary ml-2" onClick={() => setShowReplyForm(true)}>
            <i className="fa fa-reply"></i><Text color="blue"> {newCommentButtonText} </Text>
            </a>
        )} 
        {showReplyForm && (
            <Box bgColor="#F7FAFC" width="50%" justifyContent="left">
                    <label htmlFor="exampleFormControlTextarea1"></label>
                    <Textarea border="2px" placeholder="Reply" className="form-control" id="exampleFormControlTextarea1" rows="3" value={commentReplyText} onChange={(event) => setCommentReplyText(event.target.value)}></Textarea>
                <Flex>	
                    <Box mr="7%">
                        <Button bgColor="#F7FAFC" justifyContent="left">
                        <a className="float-right btn btn-outline-primary ml-2" onClick={handleSubmitClick}>
                            <i className="fa fa-reply"></i> {submitButtonText}
                        </a>
                        </Button>
                    </Box>
                    <Button bgColor="#F7FAFC" justifyContent="left">
                        <a className="float-right btn text-white btn-danger" onClick={() => setShowReplyForm(false)}>
                            <i className="fa fa-heart"></i> {cancelButtonText}
                        </a>
                    </Button>
                </Flex>
            </Box>
        )} 
       </div>
    );
};

ReplyForm.propTypes = {
    newCommentButtonText: propTypes.string,
    submitButtonText: propTypes.string,
    cancelButtonText: propTypes.string,
    postComment: propTypes.func.isRequired
};

ReplyForm.defaultProps = {
    newCommentButtonText: 'Reply',
    submitButtonText: 'submit',
    cancelButtonText: 'cancel',
    postComment: () => {}
};

export default ReplyForm;