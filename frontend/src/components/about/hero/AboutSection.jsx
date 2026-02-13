import React, { useEffect, useState } from "react";
import { getApiUrl } from '../../../utils/apiConfig';

const AboutSection = () => {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/api/pages/about-us`);
        if (response.ok) {
          const data = await response.json();
          setPageData(data);
        }
      } catch (error) {
        console.error("Error fetching about-us page data:", error);
      }
    };
    fetchPageData();
  }, []);

  const sectionImage = pageData?.sectionImages?.find(img => img.label === 'AboutSection')?.url;
  const imageUrl = sectionImage ? `${getApiUrl()}${sectionImage}` : "https://cdn.builder.io/api/v1/image/assets/c95d7ed1b46245fe99ca63e5b9b593ad/e539be07ad63cfb4147c53428f893fcbca42ca30?placeholderIfAbsent=true";

  return (
    <section className="flex overflow-hidden flex-col justify-center items-center w-full max-md:px-5 max-md:max-w-full">
      <div className="flex-1 px-9 py-24 w-full max-md:px-5 max-md:max-w-full">
        <section className="box-border mt-0 md:mt-[-80px] w-full flex flex-col md:flex-row relative px-9 py-0 mx-auto my-0 max-md:px-5 max-md:py-0 max-md:h-auto max-sm:px-4 max-sm:py-0">
          <header className="flex mt-4 roboto relative flex-col w-1/3 mr-auto">
            <link
              href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;500&display=swap"
              rel="stylesheet"
            />
            <h1 className="text-white font-bold mx-auto uppercase leading-[10px] text-[100px] max-md:text-9xl max-md:leading-[108px] max-sm:text-7xl max-sm:leading-[72px]">
              We are
            </h1>
            <span className="ml-2.5 font-[1000] uppercase leading-[172.8px] text-[110px] text-zinc-200 max-md:text-9xl max-md:leading-[108px] max-sm:text-7xl max-sm:leading-[72px]">
              Novas
            </span>
          </header>
          <article className="flex flex-col w-full md:w-1/3 ml-auto">
            <p className="pb-1.5 text-sm font-medium leading-8 text-gray-200 max-md:text-2xl max-md:leading-7 max-sm:text-lg max-sm:leading-6">
              Nova Labs is a collective of thinkers, builders, designers, and disruptors. We specialize in digital transformation — helping businesses of all sizes thrive through strategic design, intelligent development, and immersive branding.
            </p>
          </article>
        </section>

        <figure className="mt-9 px-20 w-full">
          <img
            src={imageUrl}
            alt="Nova Labs showcase"
            className="object-contain w-full rounded-2xl aspect-[2.19] max-md:max-w-full shadow-2xl"
          />
        </figure>
      </div>
    </section>
  );
};

export default AboutSection;
