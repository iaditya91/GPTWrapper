import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Bubble = ({ text, to }) => {
  return (
    <>
    <div style={{ textAlign: 'center' }}>
    <Paper
      component={Link}
      to={to}
      style={{
        width: 200,
        height: 200,
        borderRadius: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2196f3', 
        color: '#fff', // You can customize the text color
      }}
      elevation={3}
    >
    
    </Paper>
    </div>
     <Typography variant="body1" style={{ textAlign: 'center', marginTop: '8px' }}>
     {text}
   </Typography>
   </>
  );
};

export default Bubble;