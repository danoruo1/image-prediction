"use client";
import { Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import UploadImageButton from "./components";

export default function Home() {
  const title1 = "Neural Network Predictive Model";
  const summaryTitle = "Neural Network Summary";
  const desc =
    "This project is a machine learning model designed to classify images from two datasets: FashionMNIST and CIFAR-10. It utilizes a neural network built with PyTorch to perform image classification. The model first trains on the FashionMNIST dataset, which contains images of 10 different types of clothing. Afterward, the model is modified to handle the CIFAR-10 dataset, which includes 10 classes of objects, such as cars, birds, and dogs.";

  const [isVisible, setIsVisible] = useState(true);
  const [storedImage, setStoredImage] = useState<string | null>(null);

  const Execute = () => {
    setIsVisible((prev) => !prev);
  };

const sendData = () => {
  console.log(storedImage);  // Add this to check if it's a valid base64 string
  fetch('https://image-prediction-nl1a.onrender.com/upload-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image: storedImage })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const message = data.message;
    const predictedClass = data.predicted_class;
    alert(`${message}\nPredicted Class: ${predictedClass}`);
  })
  .catch(error => console.error('Error:', error));
};





  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(to right, rgb(140, 95, 255), rgb(125, 181, 245))",
          width: "100%",
          height: "15vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "4px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "sans-serif",
            fontSize: { xs: "2rem", md: "4rem", lg: "6rem" }, // Responsive text scaling
            color: "white",
            textAlign: "center",
            WebkitTextStroke: "1px black",
          }}
        >
          {title1}
        </Typography>
      </Box>

      {/* Main Content Box */}
      <Box
        sx={{
          width: "96vw",
          height: "70vh",
          marginTop: "2vh",
          background: "linear-gradient(to right, rgb(140, 95, 255), rgb(125, 181, 245))",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          overflow: "auto",
          padding: "2vh",
        }}
      >
        {/* Methodology Box */}
        {isVisible && (
          <Box
            sx={{
              width: { xs: "90%", md: "45%" },
              height: "60%",
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "5px",
              padding: "2vw",
              border: "3px solid black",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "sans-serif",
                fontSize: { xs: "1.5rem", md: "2.5rem" },
                color: "white",
                WebkitTextStroke: "1px black",
                marginBottom: "1vh",
              }}
            >
              Methodology
            </Typography>
            <Typography
              sx={{
                fontFamily: "sans-serif",
                fontSize: { xs: "1rem", md: "1.5rem" },
                textAlign: "center",
                color: "white",
                WebkitTextStroke: "1px black",
              }}
            >
              {desc}
            </Typography>
          </Box>
        )}

        {/* Upload Image Section */}
        {isVisible && (
          <Box
            sx={{
              width: { xs: "90%", md: "45%" },
              height: "60%",
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "5px",
              padding: "2vw",
              border: "3px solid black",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "sans-serif",
                fontSize: { xs: "1.5rem", md: "2.5rem" },
                color: "white",
                WebkitTextStroke: "1px black",
                marginBottom: "1vh",
              }}
            >
              Test Neural Network
            </Typography>
            <UploadImageButton onImageUpload={setStoredImage} />

            <Button
              sx={{
                width: "80%",
                maxWidth: "300px",
                height: "50px",
                backgroundColor: "#4c34eb",
                color: "white",
                fontSize: { xs: "1rem", md: "1.5rem" },
                WebkitTextStroke: "1px black",
                border: "2px solid black",
                ":hover": {
                  backgroundColor: "#aa9dfa",
                  color: "#120659",
                },
              }}
              onClick={sendData}
            >
              Execute
            </Button>
            
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Typography
        sx={{
          fontFamily: "sans-serif",
          fontSize: { xs: "1.5rem", md: "2.5rem" },
          color: "white",
          WebkitTextStroke: "1px black",
          marginTop: "2vh",
          textAlign: "center",
        }}
      >
        Github (s): danoruo1, taylorw0525
      </Typography>
    </Box>
  );
}
