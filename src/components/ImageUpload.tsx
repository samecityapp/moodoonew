import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
  existingUrls?: string[];
  onRemoveExisting?: (url: string) => void;
}

export default function ImageUpload({
  images,
  onImagesChange,
  maxImages = 10,
  existingUrls = [],
  onRemoveExisting
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalImages = images.length + existingUrls.length;
  const canAddMore = totalImages < maxImages;

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  }

  function handleFiles(fileList: FileList) {
    const newFiles = Array.from(fileList).filter(file =>
      file.type.startsWith('image/')
    );

    const remainingSlots = maxImages - totalImages;
    const filesToAdd = newFiles.slice(0, remainingSlots);

    if (filesToAdd.length > 0) {
      onImagesChange([...images, ...filesToAdd]);
    }

    if (newFiles.length > remainingSlots) {
      alert(`En fazla ${maxImages} fotoğraf yükleyebilirsiniz.`);
    }
  }

  function removeImage(index: number) {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  }

  function openFileDialog() {
    fileInputRef.current?.click();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Fotoğraflar * (En fazla {maxImages})
        </label>
        <span className="text-xs text-gray-500">
          {totalImages} / {maxImages}
        </span>
      </div>

      {canAddMore && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-200
            ${dragActive
              ? 'border-black bg-gray-50 scale-[1.02]'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Fotoğraf yüklemek için tıklayın veya sürükleyin
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, WebP veya GIF (max. 5MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {(existingUrls.length > 0 || images.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {existingUrls.map((url, index) => (
            <div key={`existing-${index}`} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={url}
                  alt={`Mevcut ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {onRemoveExisting && (
                <button
                  type="button"
                  onClick={() => onRemoveExisting(url)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Kaldır"
                >
                  <X size={16} />
                </button>
              )}
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-xs rounded">
                Mevcut
              </div>
            </div>
          ))}

          {images.map((file, index) => (
            <div key={`new-${index}`} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Yeni ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Kaldır"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-green-600 text-white text-xs rounded">
                Yeni
              </div>
            </div>
          ))}
        </div>
      )}

      {!canAddMore && (
        <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
          <ImageIcon size={16} />
          <span>Maksimum fotoğraf sayısına ulaştınız.</span>
        </div>
      )}
    </div>
  );
}
