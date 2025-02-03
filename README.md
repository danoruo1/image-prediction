Image Classification API with FastAPI and PyTorch

This project provides an API that predicts the class of an image uploaded as a base64 string using a pretrained neural network model. The model is trained on the FashionMNIST dataset, and the FastAPI server handles image processing, prediction, and returning the results to the user.

Project Overview

The application uses FastAPI to build a RESTful API for image classification. It accepts a base64-encoded image, processes the image (resizing, normalizing, and converting to grayscale), and then uses a PyTorch-based neural network model to predict the image’s class. The prediction is based on the FashionMNIST dataset, which consists of grayscale images of various clothing items.

Key features:

FastAPI: For creating the web service that handles image uploads and predictions.
PyTorch: A deep learning framework used to load and run the pretrained neural network model.
Base64 Image Upload: The user uploads images as base64-encoded strings.
Image Processing: The uploaded image is transformed to match the input requirements of the pretrained model.
Prediction: The model classifies the image into one of 10 clothing categories from the FashionMNIST dataset.
Technologies Used
Python: Backend programming language.
FastAPI: Fast, modern web framework for building APIs.
PyTorch: Deep learning framework for the neural network model.
PIL (Pillow): Image processing library for handling image data.
base64: For decoding base64 strings to image data.
CORS: Cross-Origin Resource Sharing (CORS) middleware for handling client-side requests from different domains.

Installation Guide:

1. Clone the repository:
Via Download or terminal
2. Install dependencies:
Make sure you have Python 3.7+ installed and then run:
pip install -r requirements.txt
use the commands in the javascriptrequirements.txt to install the other requirements
make sure to split the terminal
4. Start the FastAPI server:
run: uvicorn app:app --reload
5. Download the pretrained model file (pretrainedmodel.pth) and place it in the project directory

Results

1. Neural Network Model:
The neural network model is a simple fully connected network (MLP) with two hidden layers. It was trained on the FashionMNIST dataset, which contains 28x28 grayscale images of clothing items. The model consists of the following layers:
Flatten layer: To convert the 28x28 image into a vector.
Two fully connected layers: Each followed by a ReLU activation function.
Output layer: Produces predictions for the 10 classes (clothing categories).

3. Image Preprocessing:
When the image is uploaded as a base64 string, the following transformations are applied:
Convert the image to grayscale.
Resize the image to 28x28 pixels to match the input size of the model.
Normalize the pixel values to the range expected by the pretrained model.

3. Prediction:
The cleaned and preprocessed image is passed through the model, and the class with the highest predicted probability is returned as the result.

4. CORS Middleware:
The application uses CORS middleware to allow cross-origin requests from different domains, making it suitable for use in a frontend application.
