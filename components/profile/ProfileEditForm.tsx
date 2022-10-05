import React, { useState, ChangeEvent } from "react";
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
import { addImageToStorage, updateOrAddProfileData, getProfileData } from "../../lib/firebaseClient";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

export default function ProfileEditForm({ id, profile, profileImage, backgroundImage }: any): JSX.Element {
  const [profileImageUrl, setProfileImageUrl] = useState(profileImage);
  const [bgImageUrl, setBgImageUrl] = useState(backgroundImage);

  const { userid } = useAuth();
  const router = useRouter();

  type Inputs = {
    name: string,
    username: string,
    linkedIn: string,
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
    reset
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

  const ProfileImage = () => profileImageUrl ? (<Image src={profileImageUrl} {...ProfileImageStyles} objectFit='cover' />) : (<Box {...ProfileImageStyles} />);

  const ProfileBackground = () => bgImageUrl ? (<Image src={bgImageUrl} {...ProfileBackgroundStyles} objectFit='cover' />) : (<Box {...ProfileBackgroundStyles} />);

  const onProfileImageChange = (e: ChangeEvent) => {
    const [file] = (e.target as any).files;
    const src = URL.createObjectURL(file);
    setProfileImageUrl(src);
  }

  const onBgImageChange = (e: ChangeEvent) => {
    const [file] = (e.target as any).files;
    const src = URL.createObjectURL(file);
    setBgImageUrl(src);
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      let pfp;
      let bgp;
      console.log(data);

      if (data.profileImage.length) {
        console.log("here")
      }

      if (data.profileImage) {
        console.log("here2")
      }

      if (data.backgroundImage.length) {
        console.log("nowhere")
      }

      if (data.profileImage.length) {
        pfp = await addImageToStorage(userid!, data.profileImage[0]);
        data.profileImage = pfp.fullPath;
      }
      else {
        profileImageUrl ? data.profileImage = profileImageUrl : data.profileImage = "";
      }

      if (data.backgroundImage.length) {
        bgp = await addImageToStorage(userid!, data.backgroundImage[0]);
        //console.log('bgp: ', bgp);
        data.backgroundImage = bgp.fullPath;
      }
      else {
        bgImageUrl ? data.backgroundImage = bgImageUrl : data.backgroundImage = "";
      }

      const result = await updateOrAddProfileData(id, data);

      const profileBeforeData = await getProfileData(userid!);
      const profileData = profileBeforeData.data();

      reset();
      if (profileData.loginCounter == 1) {
        router.push("/campaigns");
      }
      else {
        router.push(`/user/[id]/profile`, `/user/${id}/profile`)
      }
      //router.push(`/user/[id]/profile`, `/user/${id}/profile`);
    } catch (err) {
      console.error('there was an error uploading the image', (err as Error).stack);
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
              <CustomFileInput name='profileImage' register={register} handler={onProfileImageChange} />
              {errors.profileImage && <FormErrorMessage>{errors.profileImage.message}</FormErrorMessage>}
            </Box>
          </Flex>
        </Flex>
        <Flex mb="8em">
          <Flex flexDirection="column" justifyContent={"space-evenly"} w='50%'>
            <Heading>Background Picture</Heading>
            <Text>
              Upload a PNG or JPG file with resolution recommendation of 1400px x 400px
            </Text>
            {errors.backgroundImage && <FormErrorMessage>{errors.backgroundImage.message}</FormErrorMessage>}
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
            <Input {...register('name', {
              value: profile?.name,
            })} bg="#EFEFEF" h="48px" />
          </FormControl>
        </Flex>
        <Flex mb="2em">
          <FormControl>
            <FormLabel mb="0" fontSize="1.2em" fontWeight={800}>
              Username
            </FormLabel>
            <Input {...register('username', {
              value: profile?.username,
            })} bg="#EFEFEF" h="48px" />
          </FormControl>
        </Flex>
        <Flex mb="2em">
          <FormControl>
            <FormLabel mb="0" fontSize="1.2em" fontWeight={800}>
              Biography
            </FormLabel>
            <Textarea {...register('biography', {
              value: profile?.biography,
            })} bg="#EFEFEF" rows={10} resize="none" />
          </FormControl>
        </Flex>
        <Flex mb="2em">
          <FormControl>
            <FormLabel mb="0" fontSize="1.2em" fontWeight={800}>
              Email
            </FormLabel>
            <Input {...register('email', {
              value: profile?.email,
            })} bg="#EFEFEF" h="48px" />
          </FormControl>
        </Flex>
        <Flex mb="2em">
          <FormControl>
            <FormLabel mb="0" fontSize="1.2em" fontWeight={800}>
              LinkedIn
            </FormLabel>
            <Input {...register('linkedIn', {
              value: profile?.linkedIn,
            })} bg="#EFEFEF" h="48px" />
          </FormControl>
        </Flex>
        <Flex mb="2em">
          <FormControl>
            <FormLabel mb="0" fontSize="1.2em" fontWeight={800}>
              Facebook
            </FormLabel>
            <Input {...register('facebook', {
              value: profile?.facebook,
            })} bg="#EFEFEF" h="48px" />
          </FormControl>
        </Flex>
        <Flex mb="12em">
          <FormControl>
            <FormLabel mb="0" fontSize="1.2em" fontWeight={800}>
              Twitter
            </FormLabel>
            <Input {...register('twitter', {
              value: profile?.twitter,
            })} bg="#EFEFEF" h="48px" />
          </FormControl>
        </Flex>
        <Flex justifyContent={"center"}>
          <Button bg='transparent' border='2px solid' borderColor='#EFEFEF' mr='16px'>Cancel</Button>
          <Button bg='#9EAD7' color='#9EAD7' type='submit' loadingText="loading" isLoading={isSubmitting}>Save Changes</Button>
        </Flex>
      </chakra.form>
    </>
  );
}
