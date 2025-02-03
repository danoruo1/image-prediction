from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image, UnidentifiedImageError
import base64
import re
from io import BytesIO

# Define the Neural Network (same as before)
class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.flatten = nn.Flatten()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(28*28, 512),
            nn.ReLU(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Linear(512, 10)
        )

    def forward(self, x):
        x = self.flatten(x)
        logits = self.linear_relu_stack(x)
        return logits

# Load the pretrained model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = NeuralNetwork().to(device)
model.load_state_dict(torch.load("pretrainedmodel.pth"))
model.eval()

# Define the classes for FashionMNIST
classes = [
    "T-shirt/top",
    "Trouser",
    "Pullover",
    "Dress",
    "Coat",
    "Sandal",
    "Shirt",
    "Sneaker",
    "Bag",
    "Ankle boot",
]

# Transformation used to preprocess the user-provided image
transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=1),  # Ensure the image is in grayscale
    transforms.Resize((28, 28)),  # Resize to 28x28, same as FashionMNIST images
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))  # Normalize the image
])

def clean_base64_string(base64_string):
    # Remove any data:image type prefix, if it exists
    base64_pattern = r"^data:image/.+;base64,"
    return re.sub(base64_pattern, '', base64_string)

def predict_image_from_base64(base64_string):
    try:
        # Clean the base64 string if necessary
        base64_string = clean_base64_string(base64_string)
        
        # Decode the base64 string
        img_data = base64.b64decode(base64_string)
        
        # Convert byte data to a PIL Image
        try:
            image = Image.open(BytesIO(img_data))
            image.verify()  # Verify if the image is valid
            
        except UnidentifiedImageError:
            return {"error": "Unable to identify image from the base64 data."}
        
        # Apply transformations to the image
        image = transform(image).unsqueeze(0).to(device)  # Add batch dimension and move to device
        
        # Make the prediction
        with torch.no_grad():
            pred = model(image)
            predicted_class = classes[pred.argmax(1).item()]
        
        return predicted_class
    
    except (ValueError, TypeError) as e:
        return {"error": "Invalid base64 string"}
    except Exception as e:
        return {"error": f"Unexpected error: {e}"}

app = FastAPI()

# Add CORS middleware to allow cross-origin requests
class ImageData(BaseModel):
    image: str  # Expecting a Base64 string

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, or specify your frontend URL here (e.g., ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.post("/upload-image")
def upload_image(data: ImageData):
    # Get the base64 string from the incoming data
    base64_string = data.image
    
    # Use the predict function to get the predicted class
    predicted_class = predict_image_from_base64(base64_string)
    # Return the prediction result along with a success message
    return {"message": "Image received successfully", "predicted_class": predicted_class}
