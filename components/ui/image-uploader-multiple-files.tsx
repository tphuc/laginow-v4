/* eslint-disable @next/next/no-img-element */
'use client';

import { cn } from '@/lib/utils';
import { Image as IcImage, Loader2, LoaderIcon, Trash, Upload, UploadCloud, UploadIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState, ChangeEvent, useRef } from 'react';
import { toast } from './use-toast';

export interface UploadImageProps {
  onChange?: (value: any) => void;
  value?: { fileId?: string, url: string };
  defaultValue?: { fileId?: string, url: string } | null;
  placeholder?: any,
  className?: string,
  imageClassName?: string,
  style?: React.CSSProperties,
  resetAfterUploaded?: boolean;
}

const ImageUploaderMultiFiles = React.forwardRef<HTMLDivElement, UploadImageProps>(
  ({ onChange, defaultValue, resetAfterUploaded, style, imageClassName, className, placeholder = 'Chọn ảnh', ...rest }, ref) => {
    const [image, setImage] = useState<any>(defaultValue);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    React.useEffect(() => {
      if (defaultValue) {
        setImage(defaultValue)
      }
    }, [defaultValue])

    const uploadInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
    
      if (files && files.length > 0) {
        // Check file sizes and other validations for each file
        const maxSize = 4 * 1024 * 1024; // 4MB in bytes
    
        const validFiles = Array.from(files).filter(file => file.size <= maxSize);
    
        if (validFiles.length !== files.length) {
          // Some files exceed the maximum allowed size
          toast({
            title: "Tối đa kích thước 4MB cho mỗi file"
          });
          // Optionally, you can clear the input field
          if (uploadInputRef.current) {
            uploadInputRef.current.value = '';
          }
          return;
        }
    
        try {
          setIsLoading(true);
          
          const uploadPromises = validFiles.map(async file => {
            const formData = new FormData();
            formData.append('file', file);
    
            try {
              const response = await fetch('/api/editor/upload-image2', {
                method: 'POST',
                body: formData,
              });
    
              if (response.ok) {
                const data = await response.json();
                let uploadedFile = data?.file;
    
                // Handle each uploaded file as needed
                // For example, you can store them in an array
                console.log('Uploaded file:', uploadedFile);
    
                return uploadedFile
                
              } else {
                console.error('Image upload failed');
              }
            } catch (error) {
              console.error('Error uploading image', error);
            }
          });
    
          // Wait for all uploads to complete
          let files = await Promise.all(uploadPromises);
          onChange?.(files)
    
        } finally {
          setIsLoading(false);
        }
      }
    };

    const handleImageChange = async (e) => {
      e?.preventDefault()
      if (image) {
        try {
          setIsLoading(true);
          const response = await fetch('/api/delete-image2', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileId: image?.fileId }),
          });

          if (response.ok) {
            setImage(null);
            onChange?.(null);
          } else {
            console.error('Image deletion failed');
          }
        } catch (error) {
          console.error('Error deleting image', error);
        }
        setIsLoading(false);
      }

      // if (uploadInputRef.current) {
      //   uploadInputRef.current.click();
      // }
    };

    const handleImageDelete = async () => {
      if (image) {
        try {
          setIsLoading(true);
          const response = await fetch('/api/editor/delete-image2', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileId: image?.fileId }),
          });

          if (response.ok) {
            setImage(null);
            onChange?.(null);
          } else {
            console.error('Image deletion failed');
          }
        } catch (error) {
          console.error('Error deleting image', error);
        }
        setIsLoading(false);
      }
    };

    return (
      <div
        {...rest}
        ref={ref}
        style={style}
        className={cn(
          "relative transition-all flex min-h-[100px] min-w-[100px] justify-center items-center border border-input rounded-md",
          className
        )}

      >
        {image ? (
          <>
            <img alt='' src={image?.url} className={cn("w-auto h-full border border-input max-w-[300px] max-h-[300px] rounded-md object-cover", imageClassName)} />
            <div className="absolute top-0 right-0 m-1">
              {/* <button
                onClick={handleImageChange}
                className={cn(
                  "px-2 py-2 border border-1 border-input bg-secondary text-primary text-sm rounded-md",
                  isLoading ? "pointer-events-none" : ""
                )}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />
                ) : (
                  <IcImage className="w-4 h-4" strokeWidth={1.5} />
                )}
              </button> */}
              <button
                onClick={handleImageDelete}
                className={cn(
                  "px-2 py-2 border border-1 border-input bg-secondary text-destructive text-sm rounded-md ml-1",
                  isLoading ? "pointer-events-none" : ""
                )}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />
                ) : (
                  <Trash className="w-4 h-4" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </>
        ) : (
          <label className="cursor-pointer">
            <input
              ref={(inputRef) => {
                uploadInputRef.current = inputRef;
              }}
              type="file"
              multiple
              accept="image/jpeg"
              className={cn("absolute w-0 h-0 opacity-0", isLoading ? "pointer-events-none" : "")}
              onChange={handleImageUpload}
            />

            <div className="text-center flex flex-col items-center text-muted-foreground">
              {placeholder}
              {isLoading ? (
                <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />
              ) : (
                <IcImage strokeWidth={1.5} />
              )}
            </div>
          </label>
        )}
      </div>
    );
  }
);

ImageUploaderMultiFiles.displayName = 'ImageUploaderMultiFiles'
export default ImageUploaderMultiFiles;