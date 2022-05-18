import type { ReactElement } from "react";
import {
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react';
import { GiPencil } from 'react-icons/gi';



function CustomFileInput({ top='8px', right='16px', handler, register, name }: any): JSX.Element {
  return (
    <FormControl
      width={'unset'}
      display='inline-block'
      position='absolute'
      top={top}
      right={right}
    >
      <FormLabel
        bg='sage.500'
        cursor='pointer'
        m='0'
        display='inline-block'
        padding='16px'
        borderRadius={'100%'}
        _hover={{
          bg: 'seafoam.500',
        }}
      >
        <GiPencil color='white' size='24px'/>
        <Input
          w='24px' 
          zIndex='-1'
          position='absolute'
          type='file'
          accept=".jpg, .jpeg, .png"
          top='0'
          left='0'
          _focus={{
            outline: 'none',
            opacity: 0
          }}
          { ...register(name)}
          onChange={handler}
        />
      </FormLabel>
    </FormControl>
  )
}

export default CustomFileInput;