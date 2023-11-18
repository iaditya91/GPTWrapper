import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Bubble = ({ text, to }) => {
  return (
    <div style ={{
      display: 'grid',
      placeItems: 'center',
      height: '10vh',
    }}>
    <Paper
      component={Link}
      to={to}
      style={{
        width: 200,
        height: 200,
        borderRadius: '70%',
        backgroundColor: '#2196f3', 
        padding: '20px',
      }}>
    </Paper>
    
     <Typography variant="body1" 
      style={{ 
        padding: '20px',
        }}>
        {text}
      </Typography>
   </div>
  );
};

export default Bubble;