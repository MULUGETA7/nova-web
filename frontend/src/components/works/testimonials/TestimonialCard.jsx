import React from "react";
import TestimonialBubble from "./TestimonialBubble";
import ProfileFooter from "./ProfileFooter";

function TestimonialCard({ mainImage, mainImageAlt, testimonials, profile }) {
  return (
    <article className="overflow-hidden relative bg-white h-[520px] rounded-[38px] w-[478px] max-md:mb-8 max-md:w-full max-md:h-auto max-md:max-w-[478px]">
      
      <div className="flex h-[350px]">
        <img
           src={mainImage}
           loading="lazy"
          className="object-cover  p-3 m-1 rounded-3xl  max-md:aspect-[1.55/1] "
          alt={mainImageAlt}
      />
      {/* <img
           src={secondImage}
           loading="lazy"
          className="object-cover m-3 mt-12 rounded-3xl h-[293px] w-[184px] max-md:h-auto max-md:aspect-[1.55/1] max-md:w-[calc(100%_-_24px)]"
          alt={mainImageAlt}
      /> */}
      </div>

      {testimonials.map((testimonial, index) => (
        <TestimonialBubble
          key={index}
          text={testimonial.text}
          author={testimonial.author}
          position={testimonial.position}
        />
      ))}

      <ProfileFooter
        image={profile.image}
        name={profile.name}
        title={profile.title}
      />
    </article>
  );
}

export default TestimonialCard;
