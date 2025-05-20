import React from "react";

const socialMedia = [
  "https://cdn.builder.io/api/v1/image/assets/TEMP/d241aba5f24aecaebf9e1a2d074bb828de7a1faf?placeholderIfAbsent=true&apiKey=e906787a640d479bb7fd82a6c9a9c56a",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/2e89a0b8e4f3c133487b215c5019fb292780b606?placeholderIfAbsent=true&apiKey=e906787a640d479bb7fd82a6c9a9c56a",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/1a28283a39b5f32b741ccc4d262dff953fdfadc1?placeholderIfAbsent=true&apiKey=e906787a640d479bb7fd82a6c9a9c56a",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/28a04cce509fa07383e58bfdc5991a1e2a461310?placeholderIfAbsent=true&apiKey=e906787a640d479bb7fd82a6c9a9c56a",
];

function Footer() {
  return (
    <footer className="mt-10 md:mt-[85px] px-6 sm:px-8 md:px-[81px] pt-12 sm:pt-16 md:pt-[106px] pb-8 md:pb-[44px] border rounded-2xl md:rounded-[24px] border-[#00000033] bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
        {/* Dealership Info */}
        <section className="text-black">
          <h2 className="text-2xl sm:text-3xl md:text-[30px] font-[nusar] mb-6 md:mb-[29px]">
            DEALERSHIP
          </h2>
          <p className="font-normal text-base sm:text-lg md:text-[18px] leading-6 md:leading-[28px] tracking-[1%]">
            Book your free consultation now!
            <br />
            (954) 699-0699
            <br />
            1324 SE 17th St
            <br />
            Fort Lauderdale, FL 33316
          </p>
        </section>

        {/* Menu */}
        <section className="text-black">
          <h2 className="text-2xl sm:text-3xl md:text-[30px] mb-6 md:mb-[29px]">
            Menu
          </h2>
          <p className="font-normal text-base sm:text-lg md:text-[18px] leading-6 md:leading-[28px] tracking-[1%]">
            Home
            <br />
            About us
            <br />
            Inventory
            <br />
            Services
          </p>
        </section>

        {/* Fast Links */}
        <section className="text-black">
          <h2 className="text-2xl sm:text-3xl md:text-[30px] mb-6 md:mb-[29px]">
            Fast Links
          </h2>
          <p className="font-normal text-base sm:text-lg md:text-[18px] leading-6 md:leading-[28px] tracking-[1%]">
            Book
            <br />
            Privacy Policy
            <br />
            Contact us
            <br />
            My account
            <br />
            Wishlist
          </p>
        </section>

        {/* Newsletter - spans full width on md, then takes its own column on lg */}
        <section className=" text-black">
          <div className="w-full">
            <h3 className="text-2xl sm:text-3xl md:text-[30px] font-medium leading-tight">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 md:mt-[22px] text-sm sm:text-base md:text-[16px]">
              Stay up-to-date with the latest news, promotions,
              <br />
              and exclusive offers!
            </p>
            <div className="mt-8 md:mt-[69px] rounded-lg md:rounded-[7px] bg-[#00000026] p-0.5 flex justify-between items-center">
              <span className="text-[#000000B2] ml-4 md:ml-[25px] text-sm md:text-base">
                Email
              </span>
              <button className="bg-[#000000] text-white py-2 md:py-[14px] px-4 md:px-[26px] rounded md:rounded-[5px] text-sm md:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Copyright and Socials */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-10 md:mt-[59px] w-full gap-4">
        <p className="font-normal text-sm sm:text-lg tracking-normal leading-none text-black text-center sm:text-left">
          Copyright © Dealership. All Rights Reserved.
        </p>
        <div className="flex gap-3.5">
          {socialMedia.map((item) => (
            <img
              key={item}
              src={item}
              alt="Social media icon"
              className="object-contain shrink-0 w-8 md:w-9 aspect-square"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
