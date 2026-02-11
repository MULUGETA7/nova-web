"use client";
import React from "react";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      mainImage: "/images/projects/testimonies/1novavr.png",
      mainImageAlt: "Sound Station",
      testimonials: [
        {
          text: "Nova's graphic design quality is unmatched. their service keeps everything seamless",
          author: "Moti ableti ",
          position: "top-[320px] left-3",
        },
      ],
      profile: {
        image: "/images/avatar.jpeg",
        name: "Moti ableti ",
        title: "Digaf Microfinance",
      },
    },
    {
      id: 2,
      mainImage: "/images/projects/testimonies/2mobile-apps.png",
      mainImageAlt: "Meeting Notes",
      testimonials: [
        {
          text: "Functional design meets beauty. Work with Kree8 if you can. Their designs are always creative and aligned with our brand.",
          author: "minyahl banti",
          position: "top-[320px] left-3",
        },
      ],
      profile: {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0db0c83decd12ad3d84281dac0ad8eea6e70df4b",
        name: "minyahl banti",
        title: "Maedot Le Ethiopia",
      },
    },
    {
      id: 3,
      mainImage: "/images/projects/testimonies/3workout-app.png",
      mainImageAlt: "Coffee Shop",
      testimonials: [
        {
          text: "We've been using KREE8 for months, and their designs always exceed expectations. Reliable, fast, and creative!",
          author: "ewnetim getaneh",
          position: "top-[320px] left-3",
        },
      ],
      profile: {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/711ea7248c11e06e9044e95ae539fffddf51ab87",
        name: "ewnetim getaneh  ",
        title: "Matrix Technologies",
      },
    },
    {
      id: 4,
      mainImage: "/images/projects/testimonies/digaf1.png",
      mainImageAlt: "Sound Station",
      testimonials: [
        {
          text: "Nova's graphic design quality is unmatched. their service keeps everything seamless",
          author: "Moti ableti ",
          position: "top-[320px] left-3",
        },
      ],
      profile: {
        image: "/images/avatar.jpeg",
        name: "Moti ableti ",
        title: "Digaf Microfinance",
      },
    },
    {
      id: 5,
      mainImage: "/images/projects/testimonies/maedot1.png",
      mainImageAlt: "Meeting Notes",
      testimonials: [
        {
          text: "Functional design meets beauty. Work with Kree8 if you can. Their designs are always creative and aligned with our brand.",
          author: "minyahl banti",
          position: "top-[320px] left-3",
        },
      ],
      profile: {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0db0c83decd12ad3d84281dac0ad8eea6e70df4b",
        name: "minyahl banti",
        title: "Maedot Le Ethiopia",
      },
    },
    {
      id: 6,
      mainImage: "/images/projects/testimonies/meba1.png",
      mainImageAlt: "Coffee Shop",
      testimonials: [
        {
          text: "We've been using KREE8 for months, and their designs always exceed expectations. Reliable, fast, and creative!",
          author: "ewnetim getaneh",
          position: "top-[320px] left-3",
        },
      ],
      profile: {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/711ea7248c11e06e9044e95ae539fffddf51ab87",
        name: "ewnetim getaneh  ",
        title: "Matrix Technologies",
      },
    },
    {
      id: 7,
      mainImage: "/images/projects/testimonies/tes1.png",
      mainImageAlt: "Coffee Shop",
      testimonials: [
        {
          text: "We've been using KREE8 for months, and their designs always exceed expectations. Reliable, fast, and creative!",
          author: "ewnetim getaneh",
          position: "top-[320px] left-3",
        },
      ],
      profile: {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/711ea7248c11e06e9044e95ae539fffddf51ab87",
        name: "ewnetim getaneh  ",
        title: "Matrix Technologies",
      },
    },
    {
      id: 8,
      mainImage: "/images/projects/testimonies/meba1.png",
      mainImageAlt: "Coffee Shop",
      testimonials: [
        {
          text: "We've been using KREE8 for months, and their designs always exceed expectations. Reliable, fast, and creative!",
          author: "ewnetim getaneh",
          position: "top-[320px] left-3",
        },
      ],
      profile: {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/711ea7248c11e06e9044e95ae539fffddf51ab87",
        name: "ewnetim getaneh  ",
        title: "Matrix Technologies",
      },
    },
    {
      id: 9,
      mainImage: "/images/projects/testimonies/spectra1.png",
      mainImageAlt: "Coffee Shop",
      testimonials: [
        {
          text: "We've been using KREE8 for months, and their designs always exceed expectations. Reliable, fast, and creative!",
          author: "ewnetim getaneh",
          position: "top-[320px] left-3",
        },
      ],
      profile: {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/711ea7248c11e06e9044e95ae539fffddf51ab87",
        name: "ewnetim getaneh  ",
        title: "Matrix Technologies",
      },
    },
    {
      id: 10,
      mainImage: "/images/projects/testimonies/tes2.png",
      mainImageAlt: "Coffee Shop",
      testimonials: [
        {
          text: "We've been using KREE8 for months, and their designs always exceed expectations. Reliable, fast, and creative!",
          author: "ewnetim getaneh",
          position: "top-[320px] left-3",
        },
      ],
      profile: {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/711ea7248c11e06e9044e95ae539fffddf51ab87",
        name: "ewnetim getaneh  ",
        title: "Matrix Technologies",
      },
    },
  ];

  return (
    <section className="relative w-full py-16 bg-black">
      <div className="w-[120%]">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          mousewheel={true}
          spaceBetween={10}
          slidesPerView={3}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectCoverflow]}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="">
              <TestimonialCard
                mainImage={testimonial.mainImage}
                mainImageAlt={testimonial.mainImageAlt}
                testimonials={testimonial.testimonials}
                profile={testimonial.profile}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default TestimonialSection;
