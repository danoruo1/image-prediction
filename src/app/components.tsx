import React, { useState } from "react";
import { Button } from "@mui/material";

interface UploadImageButtonProps {
  onImageUpload: (image: string | null) => void; // Callback to set image URL
}

function UploadImageButton({ onImageUpload }: UploadImageButtonProps) {
  const [image, setImage] = useState<string | null>(null); // Local state for image preview

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImage(imageUrl); // Update local image state
        onImageUpload(imageUrl); // Notify parent (Home) component
      };

      reader.readAsDataURL(file); // Read file as data URL
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="image-upload"
      />
      <Button
        variant="contained"
        component="label"
        htmlFor="image-upload"
        startIcon={
          <img
            src={image || "/images/upload.jpg"}
            alt="icon"
            style={{ width: 50, height: 50, border: "4px solid black" }}
          />
        }
        sx={{
          width: "100%",
          maxWidth: "300px",
          height: "50px",
          backgroundColor: "#4c34eb",
          color: "white",
          fontSize: { xs: "1rem", md: "1.5rem" },
          WebkitTextStroke: "1px black",
          border: "2px solid black", // Added to match Execute button
          ":hover": {
            backgroundColor: "#aa9dfa",
            color: "#120659",
          },
        }}
      >
        Upload Image
      </Button>
    </div>
  );
}

export default UploadImageButton;
