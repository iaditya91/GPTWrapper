import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Bubble = ({ text, to, imageSrc }) => {
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
        width: 150,
        height: 150,
        borderRadius: '70%',
        backgroundColor: '#2196f3', 
        padding: '20px',
      }}>
      {imageSrc && <img src={imageSrc} alt={`Bubble ${text}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />}
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