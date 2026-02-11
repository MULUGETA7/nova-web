import React from "react";

function EliteClubButton() {
  return (
    <div className="relative">
      <div className="inline-flex gap-2.5 justify-center items-center px-6 py-6 shadow bg-black bg-opacity-10 rounded-[118px]">
        <div className="absolute inset-0 bg-[radial-gradient(50%_25%_at_50%_0%,#FFF_0%,#FFF_100%)] blur-[7.5px] rounded-[72px]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_20.7%_at_50%_0%,#FFF_0%,#FFF_100%)] rounded-[72px]" />
        <button className="flex relative gap-2.5 items-center p-1 bg-white rounded-[114px]">
          <SparkleIcon />
          <span className="text-base font-medium tracking-tighter leading-5 text-black">
            Join the Elite Club
          </span>
        </button>
      </div>
      <ClickIndicator />
    </div>
  );
}

function SparkleIcon() {
  return (
    <div>
      <svg
        width="24"
        height="23"
        viewBox="0 0 24 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[23px] h-[23px]"
      >
        <path
          d="M16.3593 2.99805C16.3013 2.02005 17.6123 1.64405 18.0813 2.50505L18.1053 2.54905L18.1523 2.63405C18.7263 3.67605 19.8683 4.27405 21.0523 4.15205C22.0603 4.04905 22.4473 5.42905 21.5343 5.86505C20.4543 6.38105 19.7903 7.49505 19.8503 8.69105L19.8563 8.81905C19.9043 9.79805 18.5913 10.16 18.1293 9.29605L18.0793 9.19905C17.5153 8.14205 16.3673 7.53005 15.1753 7.65105C14.1683 7.75305 13.7813 6.37805 14.6943 5.94105C15.7703 5.42505 16.4303 4.31105 16.3663 3.11905L16.3623 3.03905L16.3593 2.99805ZM7.0173 8.77805C6.9203 7.12505 9.1373 6.49005 9.9293 7.94605L9.9693 8.02005L10.0493 8.16405C11.0213 9.92505 12.9503 10.934 14.9513 10.729C16.6543 10.555 17.3093 12.887 15.7653 13.625C13.9393 14.497 12.8163 16.381 12.9183 18.402L12.9283 18.617C13.0103 20.273 10.7903 20.885 10.0093 19.424L9.9253 19.26C8.9703 17.473 7.0313 16.439 5.0153 16.644C3.3143 16.817 2.6603 14.492 4.2023 13.752C6.0213 12.879 7.1373 10.998 7.0303 8.98305L7.0233 8.84805L7.0173 8.77805Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

function ClickIndicator() {
  return (
    <div className="flex absolute flex-col items-start left-[11px]">
      <div className="px-3 ml-12 mt-2 py-2.5 text-xs tracking-tight leading-4 text-white bg-black rounded-3xl border-2 border-white">
        Just click
      </div>
      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[24px] h-[23px] absolute -top-[10px] left-[70px]"
        >
          <path
            d="M8.06519 7.9144C7.97119 6.7004 9.32519 5.9184 10.3302 6.6064L20.1122 13.3154C21.1872 14.0524 20.8192 15.7214 19.5352 15.9394L15.2142 16.6704C14.8712 16.7284 14.5602 16.9084 14.3392 17.1754L11.5452 20.5524C10.7142 21.5564 9.08419 21.0394 8.98319 19.7404L8.06519 7.9144Z"
            fill="black"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  );
}

export default EliteClubButton;
