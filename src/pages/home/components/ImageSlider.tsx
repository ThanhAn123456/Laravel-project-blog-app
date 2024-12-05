import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import {
  IconArrowBadgeLeftFilled,
  IconArrowBadgeRightFilled,
} from "@tabler/icons-react";

interface ImageSliderProps {
  mediaData: Array<{ id: number; file_url: string }>;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ mediaData }) => {
  const swiperRef = useRef<any>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<number>(0); // Track loaded images

  useEffect(() => {
    if (!mediaData || mediaData.length === 0) return;

    // Calculate max height once all images are loaded
    if (imagesLoaded === mediaData.length) {
      const imageHeights = Array.from(
        document.querySelectorAll(".slider-image")
      ).map((img) => (img as HTMLImageElement).height || 0);

      setMaxHeight(Math.max(...imageHeights));
    }
  }, [imagesLoaded, mediaData]);

  if (!mediaData || mediaData.length === 0) return null;

  return (
    <div className="rounded-md overflow-hidden relative">
      <Swiper
        ref={swiperRef} // Attach the swiper instance to the ref
        pagination={{ clickable: true }}
        navigation={false} // Disable the default navigation
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {mediaData.map((media) => (
          <SwiperSlide key={media.id}>
            <div
              className="flex items-center justify-center"
              style={{ height: maxHeight || "auto" }}
            >
              <img
                src={media.file_url}
                alt={`media-${media.id}`}
                className="slider-image w-full h-full object-cover rounded-md"
                onLoad={() => setImagesLoaded((prev) => prev + 1)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Only show navigation if there's more than 1 image */}
      {mediaData.length > 1 && (
        <>
          <div
            className="p-1 rounded-full bg-white bg-opacity-50 custom-prev absolute left-2 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          >
            <IconArrowBadgeLeftFilled />
          </div>
          <div
            className="p-1 rounded-full bg-white bg-opacity-50 custom-next absolute right-2 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer"
            onClick={() => swiperRef.current?.swiper.slideNext()}
          >
            <IconArrowBadgeRightFilled />
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
