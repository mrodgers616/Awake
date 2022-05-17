import React, { useState, useEffect, ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Textarea,
  Heading,
  Button,
  chakra,
  Image,
  Input,
  Text,
  Flex,
  Box,
  FormErrorMessage,
} from "@chakra-ui/react";
import CustomFileInput from "../CustomFileInput";
import * as yup from "yup";
import firebase from "../../lib/firebase";

export default function ProfileEditForm({ profileImage }: any): JSX.Element {
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [bgImageUrl, setBgImageUrl] = useState('');
  const [username, setUsername] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  type Inputs = {
    name: string,
    username: string,
    linkedin: string,
    facebook: string,
    twitter: string,
    email: string,
    biography: string,
    profileImage: string,
    backgroundImage: string
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const ProfileImageStyles = {
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    borderColor: "white",
    bg: "grey"
  };

  const ProfileBackgroundStyles = {
    width: "350px",
    height: "150px",
    borderRadius: "16px",
    borderColor: "white",
    bg: "grey",
  };

  const ProfileImage = () => profileImageUrl ? (<Image src={profileImageUrl} {...ProfileImageStyles} objectFit='cover'/>) : (<Box {...ProfileImageStyles} />);

  const ProfileBackground = () => bgImageUrl ? (<Image src={bgImageUrl} {...ProfileBackgroundStyles} objectFit='cover'/> ) : (<Box {...ProfileBackgroundStyles} />);

  const onProfileImageChange = (e: ChangeEvent) => {
    console.log(e);
    const [file] = e.target.files;
    const src = URL.createObjectURL(file);
    setProfileImageUrl(src);
  }

  const onBgImageChange = (e: ChangeEvent) => {
    console.log(e);
    const [file] = e.target.files;
    const src = URL.createObjectURL(file);
    setBgImageUrl(src);
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      let pfp;
      let bgp;
      if (data.profileImage) {
        pfp = await firebase.addImageToStorage(data.profileImage[0]);
        data.profileImage = pfp.fullPath;
      }
      if (data.backgroundImage) {
        bgp = await firebase.addImageToStorage(data.backgroundImage[0]);
        data.backgroundImage = bgp.fullPath;
      }
    } catch (err) {
      console.error('there was an error uploading the image', err.stack);
    }
  };

  return (
    <>
      <chakra.form px='8em' onSubmit={handleSubmit(onSubmit)}>
        <Flex mb="8em" justifyContent={'center'}>
          <Flex flexDirection="column" justifyContent={"space-evenly"} w="50%">
            <Heading fontSize="2em">Profile Picture</Heading>
            <Text fontSize="1.1em">
              Upload a PNG or JPG file with resolution recommendation of 350px x
              350px
            </Text>
          </Flex>
          <Flex justifyContent={"center"} flexGrow={2}>
            <Box position="relative">
              <ProfileImage />
              <CustomFileInput name='profileImage' register={register} handler={onProfileImageChange}/>
              { errors.profileImage && <FormErrorMessage>{errors.profileImage}</FormErrorMessage>}
            </Box>
          </Flex>
        </Flex>
        <Flex mb="8em">
          <Flex flexDirection="column" justifyContent={"space-evenly"} w='50%'>
            <Heading>Profile Picture</Heading>
            <Text>
              Upload a PNG or JPG file with resolution recommendation of 1400px x 400px
            </Text>
            { errors.backgroundImage && <FormErrorMessage>{errors.backgroundImage}</FormErrorMessage>}
          </Flex>
          <Flex justifyContent={"center"} flexGrow={2}>
            <Box position="relative">
              <ProfileBackground />
              <CustomFileInput 
                handler={onBgImageChange}
                top="-16px"
                right="-16px"
                register={register}
                name='backgroundImage'
              />
            </Box>
          </Flex>
        </Flex>
        <Flex mb="2em">
          <FormControl>
            <FormLabel mb="0" fontSize="1.2em" fontWeight={800}>
              Name
            </FormLabel>
            <Input { ...register('name')} bg="#EFEFEF" h="48px" />
          </FormControl>
        </Flex>
        <Flex mb="2em">
          <FormControl>
            <FormLabel mb="0" fontSize="1.2em" fontWeight={800}>
              Username
            </FormLabel>
            <Input { ...register('username')} bg="#EFEFEF" h="48px" />
          </FormControl>
        </Flex>
        <Flex mb="2em">
          <FormControl>
            <FormLabel mb="0" fontSize="1.2em" fontWeight={800}>
              Biography
            </FormLabel>
            <Textarea { ...register('biography')} bg="#EFEFEF" rows={10} resize="none" />
          </FormControl>
        </Flex>
        <Flex mb="2em">
          <FormControl>
            <FormLabel mb="0" fontSize="1.2em" fontWeight={800}>
              Email
            </FormLabel>
            <Input { ...register('email')} bg="#EFEFEF" h="48px" />
          </FormControl>
        </Flex>
        <Flex mb="2em">
          <FormControl>
            <FormLabel mb="0" fontSize="1.2em" fontWeight={800}>
              LinkedIn
            </FormLabel>
            <Input { ...register('linkedIn')} bg="#EFEFEF" h="48px" />
          </FormControl>
        </Flex>
        <Flex mb="2em">
          <FormControl>
            <FormLabel mb="0" fontSize="1.2em" fontWeight={800}>
              Facebook
            </FormLabel>
            <Input { ...register('facebook')} bg="#EFEFEF" h="48px" />
          </FormControl>
        </Flex>
        <Flex mb="12em">
          <FormControl>
            <FormLabel mb="0" fontSize="1.2em" fontWeight={800}>
              Twitter
            </FormLabel>
            <Input { ...register('twitter')} bg="#EFEFEF" h="48px" />
          </FormControl>
        </Flex>
        <Flex justifyContent={"center"}>
          <Button bg='transparent' border='2px solid' borderColor='#EFEFEF' mr='16px'>Cancel</Button>
          <Button bg='sage.500' color='white' type='submit'>Save Changes</Button>
        </Flex>
      </chakra.form>
    </>
  );
}
