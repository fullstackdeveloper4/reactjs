import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Button } from 'antd';
export default function Alertify({ type,  message , setType , setMessage}) {
  return (
    <Stack  spacing={2}>
      <Alert severity={type}>{message}<Button onClick={()=>setType("") }> × </Button></Alert>
    </Stack>
  );
}