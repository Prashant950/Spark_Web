import React, { useRef, useState } from "react";

const MAX_PHOTOS = 6;

const PhotosStep = ({ data, onChange }) => {
  const inputRef = useRef(null);
  const [error, setError] = useState("");

  const photos = data.photos || [];

  const convertFileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("Unable to read image."));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    setError("");

    if (photos.length + files.length > MAX_PHOTOS) {
      setError(`You can upload a maximum of ${MAX_PHOTOS} photos.`);
      event.target.value = "";
      return;
    }

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        return false;
      }

      return true;
    });

    if (validFiles.length !== files.length) {
      setError("Only image files are allowed.");
    }

    try {
      const convertedPhotos = await Promise.all(
        validFiles.map((file) => convertFileToDataUrl(file))
      );

      onChange({
        photos: [...photos, ...convertedPhotos],
      });
    } catch (err) {
      console.error("Photo processing failed:", err);

      setError("Unable to process one or more photos.");
    } finally {
      event.target.value = "";
    }
  };

  const removePhoto = (index) => {
    const updated = photos.filter((_, photoIndex) => photoIndex !== index);

    onChange({
      photos: updated,
    });

    setError("");
  };

  return (
    <div className="space-y-7">
      {/* Heading */}
      <div className="relative">
        <span className="pointer-events-none absolute -top-3 right-0 text-4xl opacity-10 select-none sm:text-5xl">
          📸
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-rose-600 ring-1 ring-inset ring-rose-100">
          <span>💗</span> Put your best face forward
        </span>

        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Add Your Photos
        </h3>

        <p className="mt-1.5 text-sm text-slate-500">
          Add at least one photo so people can fall for the real you
        </p>
      </div>

      {/* Upload */}
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={photos.length >= MAX_PHOTOS}
          className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 px-6 py-10 text-center transition hover:border-rose-400 hover:shadow-inner disabled:pointer-events-none disabled:opacity-50 sm:py-12"
        >
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 text-2xl text-white shadow-lg shadow-rose-500/30">
            💕
          </div>

          <p className="text-sm font-semibold text-slate-800">
            Upload Photos
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Select up to {MAX_PHOTOS} images
          </p>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          <span>⚠️</span>
          {error}
        </div>
      )}

      {/* Preview */}
      {photos.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
              <span>🖼️</span> Your Photos
            </p>

            <p className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
              {photos.length}/{MAX_PHOTOS}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {photos.map((photo, index) => (
              <div
                key={`${photo}-${index}`}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200 transition-shadow hover:shadow-lg"
              >
                <img
                  src={photo}
                  alt={`Profile ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-red-600"
                  aria-label={`Remove photo ${index + 1}`}
                >
                  ×
                </button>

                {index === 0 && (
                  <div className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-2.5 py-1 text-[10px] font-semibold text-white shadow-md">
                    <span>❤️</span> Main Photo
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Requirement */}
      <div className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
        <span className="text-sm">💡</span>
        <p className="text-xs leading-5 text-slate-500">
          Please upload at least one clear photo of yourself. Your first
          photo will be used as your main profile photo.
        </p>
      </div>
    </div>
  );
};

export default PhotosStep;