import { useEffect, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";
import BlurText from "./BlurText";
import { getApiUrl } from '../utils/apiConfig';

const Portfolio = ({
  autoplay = true,
  pauseOnHover = false,
  images = [],
}) => {
  const [galleryImages, setGalleryImages] = useState([]);

  // Fetch images from the backend API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/api/portfolio`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio images');
        }
        
        const data = await response.json();
        console.log('Portfolio data loaded:', data); // Debug log
        const fetchedImages = data.map((item) => `${apiUrl}${item.images[0]}`);
        console.log('Portfolio images URLs:', fetchedImages); // Debug log
        console.log('Portfolio API URL:', apiUrl); // Debug log
        setGalleryImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching portfolio images:", error);
        // Use fallback placeholder images on error
        const placeholders = Array(6).fill('/logo192.png');
        setGalleryImages(placeholders);
        console.log("Using fallback images:", placeholders);
      }
    };

    fetchImages();
  }, []);

  // Ensure images are always populated
  const displayedImages = galleryImages.length > 0 ? galleryImages : images;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3D geometry
  const cylinderWidth = isScreenSizeSm ? 1600 : 3200;
  const faceCount = displayedImages.length;
  const faceWidth = (cylinderWidth / faceCount) * (isScreenSizeSm ? 2.2 : 1.8);
  const radius = cylinderWidth / (2 * Math.PI);

  // Framer Motion
  const dragFactor = isScreenSizeSm ? 0.08 : 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Convert rotation -> 3D transform
  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = useCallback((startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 80,
        ease: "linear",
        repeat: Infinity,
      },
    }).catch(error => {
      console.error('Animation Start Error', error);
    });
  }, [controls, rotation, autoplay]);

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
  }, [autoplay, rotation, controls, startInfiniteSpin]);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[800px] w-full overflow-hidden">
      {/* Portfolio Title - Clean & Amazing */}
      <div className="absolute top-4 sm:top-6 md:top-8 left-0 right-0 z-20 px-4 md:px-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#FF1CF7] via-[#B537F5] to-[#00F0FF] tracking-tight">
          Portfolio
        </h1>
      </div>

      {/* Top text overlay */}
      <div className="absolute top-20 sm:top-24 md:top-24 lg:top-28 left-0 right-0 z-20 text-center px-4">
        <BlurText
          text="Transforming ideas into reality"
          delay={100}
          animateBy="words"
          direction="top"
          className="text-1xl sm:text-2xl md:text-4xl font-bold text-white/80"
        />
      </div>

      {/* Bottom text overlay */}
      <div className="absolute bottom-4 left-0 right-0 z-20 text-center px-4">
        <BlurText
          text="One innovation at a time"
          delay={100}
          animateBy="words"
          direction="bottom"
          className="text-1xl sm:text-2xl md:text-4xl font-bold text-white/80"
        />
      </div>

      <div
        className="absolute top-0 left-0 h-full w-[48px] md:w-[96px] z-10"
        style={{
          background:
            "linear-gradient(to left, rgba(0,0,0,0) 0%, #060606 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 h-full w-[48px] md:w-[96px] z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #060606 100%)",
        }}
      />

      <div className="flex h-full items-center justify-center [perspective:1800px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[350px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {displayedImages.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i
                  }deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={url}
                alt="gallery"
                className="pointer-events-none h-[240px] w-[190px] rounded-[25px] border-[2px] border-transparent object-cover
                          transition-transform duration-300 ease-out group-hover:scale-105
                          sm:h-[312px] sm:w-[280px]"
                style={{
                  background: "linear-gradient(to right, blue, purple)",
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;