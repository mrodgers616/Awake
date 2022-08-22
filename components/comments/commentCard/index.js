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
	Center,
	Stack,
	Divider
  } from "@chakra-ui/react";


const CommentCard = ({ comment, commentDepth, maxThreadDepth }) => {
    const fallBackProfileImage = 'https://image.ibb.co/jw55Ex/def_face.jpg'
	const profileImage = comment.user.profileImage || fallBackProfileImage;
	const [addedSubThreadComments, setAddedSubThreadComments] = useState([]);
	const { userid } = useAuth();
    let firebaseUser = userid;

	const ProfileImageStyles = {
		width: "50px",
		height: "50px",
		borderRadius: "60%",
		border: '8px solid',
		borderColor: '#F7FAFC',
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
				<Container >
					<div className="row">
						<Flex className="col-md-2">
						
							<ProfileImage/>
							
							<Center>
								<Text className="float-left"><strong>{comment.user.displayName} </strong> {/*15 Minutes Ago*/}</Text>
								<Text className="text-secondary text-center">   </Text>
							</Center>
						</Flex>
						
						<div className="col-md-10">
							<p>
								
								<span className="float-right"><i className="text-warning fa fa-star"></i></span>
								<span className="float-right"><i className="text-warning fa fa-star"></i></span>
								<span className="float-right"><i className="text-warning fa fa-star"></i></span>
								<span className="float-right"><i className="text-warning fa fa-star"></i></span>

							</p>
							<Container ml="2.5em">
								<div className="clearfix"></div>
								<Container mb="2%">
								<Stack height="75px" direction='row' ml="-5%">
									<Divider orientation='vertical' color="black"></Divider>
									<Text paddingLeft="23px" justifyContent="left">{comment.content}</Text>
								</Stack>
								</Container>
									<div>
										{firebaseUser && <ReplyForm submitButtonText="Post" cancelButtonText="cancel" buttonText="Add comment" postComment={replyToComment} />}
									</div>
							</Container>
						</div>
					</div>
				</Container>
			</div>
			<CommentThread parentId={comment.id} type={comment.postType} slug={comment.postId} parentAddedSubThreadComments={addedSubThreadComments} currentDepth={(commentDepth + 1)} maxThreadDepth={maxThreadDepth} commentReplyCount={comment.childCount} />
		</>
    )
};

export default CommentCard;