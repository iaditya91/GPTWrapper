import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import TopBar from '../../DashBoard/Components/TopBar';

const GenerateTopics = () => {
    return (
        <>
        <TopBar/>
            <h1>GenerateTopics</h1>
            <div>Topic Headlines</div>
            <div>Topic Relation with other fields</div>
            <div>Topic Examples</div>
        </>
    )
}

export default GenerateTopics