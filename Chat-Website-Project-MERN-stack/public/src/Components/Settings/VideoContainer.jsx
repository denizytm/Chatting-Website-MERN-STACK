import { useEffect, useState } from 'react';
import styled from 'styled-components';
import React from "react"
import Webcam from "react-webcam"

export default function VideoContainer() {

    const [imageSrc,setImageSrc] = useState(undefined)

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

  return (
    <Container>
        <Webcam
        videoConstraints={videoConstraints} 
        screenshotFormat="image/jpeg"
        >
        {({ getScreenshot })=>(
            <button 
                onClick={()=>{
                    setImageSrc(getScreenshot())
                }}
            >
                Capture photo
            </button>
        )}    
        </Webcam>
        {imageSrc ? <img src={imageSrc} /> : ''}
    </Container>
  );
}

const Container = styled.div`
  height: 100px;
  width: 100px;
  background-color: red;
`;
