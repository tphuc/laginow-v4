/* eslint-disable @next/next/no-img-element */
'use client';

import { cn } from '@/lib/utils';
import { Image as IcImage, Loader2, LoaderIcon, Trash, Trash2, Upload, UploadCloud, UploadIcon } from 'lucide-react';
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

const ImageUploader = React.forwardRef<HTMLDivElement, UploadImageProps>(
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
      const file = event.target.files?.[0];

      if (file) {

        // Check the file size (in bytes)
        const maxSize = 4 * 1024 * 1024; // 4MB in bytes

        if (file.size > maxSize) {
          // File exceeds the maximum allowed size
          toast({
            title: "Tối đa kích thước 4MB"
          });
          // Optionally, you can clear the input field
          if (uploadInputRef.current) {
            uploadInputRef.current.value = '';
          }
          return;
        }


        const formData = new FormData();
        formData.append('file', file);

        try {
          setIsLoading(true);
          const response = await fetch('/api/editor/upload-image2', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            let file = data?.file;
            setImage(file);
            onChange?.(file);
            if (resetAfterUploaded) {
              setImage(null)
            }
          } else {
            console.error('Image upload failed');
          }
        } catch (error) {
          console.error('Error uploading image', error);
        }
        setIsLoading(false);
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
                  "px-2 py-2 border-2 border-red-500 bg-red-200 text-destructive text-sm rounded-md ml-1",
                  isLoading ? "pointer-events-none" : ""
                )}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin text-muted-foreground w-5 h-5" />
                ) : (
                  <Trash2 className="w-4 h-4 fill-red-200 stroke-width-2" strokeWidth={2} />
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

ImageUploader.displayName = 'ImageUploader'
export default ImageUploader;