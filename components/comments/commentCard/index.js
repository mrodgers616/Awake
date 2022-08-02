import React, { useState } from 'react';

// import './styles.css';
import { useAuth } from '../../../contexts/AuthContext';
import { addComment } from '../../../lib/firebaseClient';
import ReplyForm from '../replyForm';
import CommentThread from '../commentThread';
import {
	Container,
	Heading,
	Button,
	Image,
	Text,
	Flex,
	Box,
  } from "@chakra-ui/react";


const CommentCard = ({ comment, commentDepth, maxThreadDepth }) => {
    const fallBackProfileImage = 'https://image.ibb.co/jw55Ex/def_face.jpg'
	const profileImage = comment.user.profileImage || fallBackProfileImage;
	const [addedSubThreadComments, setAddedSubThreadComments] = useState([]);
	const { userid } = useAuth();
    let firebaseUser = userid;

	const ProfileImageStyles = {
		width: "75px",
		height: "75px",
		borderRadius: "50%",
		border: '8px solid',
		borderColor: 'white',
		bg: 'grey',
		mt: '2px',
		mb: '2px',
	}
	
	const ProfileImage = () => profileImage ? (<Image 
		src={profileImage} 
		{ ...ProfileImageStyles }
		objectFit="cover"
		objectPosition={'center'}
	  />) : (<Box {...ProfileImageStyles}/>)

	const replyToComment = async (commentReplyText) => {
		const commentToAdd = {
            parentId: comment.id, 
            content: commentReplyText,
            postId: comment.postId,
            postType: comment.postType
		};
		
        const result = await addComment(commentToAdd, firebaseUser, userid);
        setAddedSubThreadComments([...addedSubThreadComments, result])
	}

    return (
		<>
			<div className={`card comment id-${comment.id}`}>
				<div className="card-body">
					<div className="row">
						<div className="col-md-2">
							<ProfileImage/>
							<p className="text-secondary text-center">15 Minutes Ago</p>
						</div>
						<div className="col-md-10">
							<p>
								<a className="float-left"><strong>{comment.user.displayName}</strong></a>
								<span className="float-right"><i className="text-warning fa fa-star"></i></span>
								<span className="float-right"><i className="text-warning fa fa-star"></i></span>
								<span className="float-right"><i className="text-warning fa fa-star"></i></span>
								<span className="float-right"><i className="text-warning fa fa-star"></i></span>

							</p>
							<div className="clearfix"></div>
							<p>{comment.content}</p>
							<div>
								{firebaseUser && <ReplyForm buttonText="Add comment" postComment={replyToComment} />}
							</div>
						</div>
					</div>
				</div>
			</div>
			<CommentThread parentId={comment.id} type={comment.postType} slug={comment.postId} parentAddedSubThreadComments={addedSubThreadComments} currentDepth={(commentDepth + 1)} maxThreadDepth={maxThreadDepth} commentReplyCount={comment.childCount} />
		</>
    )
};

export default CommentCard;