import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { FileCheck2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ImageUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

const MultiImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [images, setImages] = useState([]);

  return (
    <div className="flex justify-start items-end space-x-3 flex-wrap">
      <UploadDropzone
        endpoint="imageUploader"
        appearance={{
          container: { height: "180px" },
          button: {
            accentColor: "black",
            backgroundColor: "black",
            padding: "15px 30px",
          },
        }}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <div className="flex flex-wrap justify-start space-x-2 items-center">
        {images.map((item, index) => (
          <div className="h-[150px] w-[150px] rounded-sm">
            <div className="h-[150px] w-[150px] relative">
              <Image
                src={item}
                alt={`${index}`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiImageUpload;
