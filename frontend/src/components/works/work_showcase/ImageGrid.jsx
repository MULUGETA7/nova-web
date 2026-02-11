import React from "react";
import { Icon } from "@iconify/react";

function ImageGrid() {
  return (
    <section className="grid grid-cols-2 gap-6 py-12 w-full max-w-[1000px] max-md:grid-cols-1">
      {[
        {
          src: "/mockups/digaf.png",
          alt: "Design work sample 1",
          logo: "/images/clients/digaf.png"
        },
        {
          src: "/mockups/menged.png",
          alt: "Design work sample 2",
          logo: "/images/clients/menged.png"

        },
        {
          src: "/mockups/saas.png",
          alt: "Design work sample 3",
          logo: "/images/clients/matrix.png"

        },
        {
          src: "/mockups/d.png",
          alt: "Design work sample 4",
          logo: "/logo.png"
        },
        {
          src: "/mockups/meba.png",
          alt: "Design work sample 5",
          colSpan: "col-span-2 max-md:col-span-1",
          logo: "/images/clients/meba.png"

        },
      ].map((image, index) => (
        <figure
          key={index}
          className={`relative overflow-hidden  rounded-[38px] ${image.colSpan || ""
            } group`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className={`w-full  object-fit ${index !== 4 ? "h-[600px]" : "h-[400px]"}`}

          />
          <div className="absolute bottom-[20px] w-[95%] mx-auto left-0 right-0 bg-black/70 bg-opacity-10 border-[1px] border-white border-opacity-50 text-white flex items-center justify-between p-4 rounded-[38px] opacity-0 group-hover:opacity-100 transition-opacity">
            <img
              src={image.logo}
              alt="Logo"
              className={`${index === 1 ? 'scale-125' : ''} ${index === 4 ? 'invert scale-125' : ''} w-32 h-12 object-contain`}
            />
            <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full">
              Visit
              <Icon icon={"material-symbols:arrow-outward"} width="24" height="24" />
            </button>
          </div>
        </figure>
      ))}
    </section>
  );
}

export default ImageGrid;
