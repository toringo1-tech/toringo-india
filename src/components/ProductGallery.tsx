"use client";

import { useState } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div>
      <img
        src={active}
        alt="Product"
        className="w-full h-80 object-contain border rounded"
      />

      <div className="flex gap-2 mt-3">
        {images.map((img) => (
          <img
            key={img}
            src={img}
            onClick={() => setActive(img)}
            className={`w-16 h-16 object-contain border cursor-pointer ${
              active === img ? "border-blue-500" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}