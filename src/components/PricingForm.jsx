import call from "./../assets/call.svg";

export default function PricingForm() {
  return (
    <div className="mx-auto border border-[#EFF2F9] rounded-[22px] pt-6 md:pt-[47px] px-4 sm:px-6 md:px-[40px] pb-6 md:pb-[33px] bg-[#EFF2F9] ">
      <div className="flex flex-col xl:flex-row xs:flex-row flex-wrap items-baseline justify-between gap-2 mb-4 w-full max-w-full">
        <div className="flex flex-col min-w-0">
          <p className="text-sm md:text-base text-[#000000A6] line-through truncate">
            MSRP: $1,325,275
          </p>
          <span className="text-xl md:text-2xl font-semibold leading-tight truncate">
            $120,000
          </span>
        </div>
        <button className="text-xs sm:text-sm md:text-base cursor-pointer font-medium bg-[#274989] px-3 py-1.5 rounded-md whitespace-nowrap shrink-0">
          <span className="text-[#FFFFFFA6]">Save: </span>
          <span className="text-white">$426,275</span>
        </button>
      </div>

      <div className="flex mb-6 md:mb-[34px]">
        <button className="flex-1 py-3 md:py-[11px] text-sm sm:text-base md:text-lg lg:text-[20px] font-medium border-b-2 border-[#274989]">
          Contact us
        </button>
        <button className="flex-1 py-3 md:py-[11px] text-sm sm:text-base md:text-lg lg:text-[20px] font-medium border-b-2 border-[#0000001A] text-[#000000]">
          Request a tour
        </button>
      </div>

      <form>
        <div className="flex flex-col gap-3 md:gap-[15px]">
          <input
            type="text"
            placeholder="*First name"
            className="w-full py-3 md:py-3.5 px-4 md:px-5 rounded-[9px] border border-[#274989] text-base md:text-[18px] font-normal bg-[#ffffff]"
          />
          <input
            type="text"
            placeholder="*Last name"
            className="w-full py-3 md:py-3.5 px-4 md:px-5 rounded-[9px] text-base md:text-[18px] font-normal bg-[#ffffff]"
          />
          <input
            type="text"
            placeholder="*Email address"
            className="w-full py-3 md:py-3.5 px-4 md:px-5 rounded-[9px] text-base md:text-[18px] font-normal bg-[#ffffff]"
          />
          <input
            type="text"
            placeholder="*Postal code"
            className="w-full py-3 md:py-3.5 px-4 md:px-5 rounded-[9px] text-base md:text-[18px] font-normal bg-[#ffffff]"
          />
          <input
            type="text"
            placeholder="*Phone number"
            className="w-full py-3 md:py-3.5 px-4 md:px-5 rounded-[9px] text-base md:text-[18px] font-normal bg-[#ffffff]"
          />
        </div>
        <p className="text-base md:text-[18px] text-[#000000] leading-[140%] font-normal mt-6 md:mt-[41px]">
          Fly Media will use the information you provide on this form to be in
          touch with you and to provide updates and marketing. Please let us
          know all the ways we can contact you:
        </p>

        <div className="mt-4 md:mt-[24px] flex flex-col gap-2 md:gap-[9px]">
          <label className="flex items-center gap-3 md:gap-[15px]">
            <input
              type="checkbox"
              className="border border-[#0000004D] h-5 w-5 md:h-[22px] md:w-[22px] bg-[#ffffff] accent-[#ffffff]"
            />
            <span className="text-base md:text-[18px] font-normal text-[#000000]">
              Email
            </span>
          </label>
          <label className="flex items-center gap-3 md:gap-[15px]">
            <input
              type="checkbox"
              className="border border-[#0000004D] h-5 w-5 md:h-[22px] md:w-[22px] bg-[#ffffff] accent-[#ffffff]"
            />
            <span className="text-base md:text-[18px] font-normal text-[#000000]">
              Phone
            </span>
          </label>
        </div>

        <p className="text-base md:text-[18px] font-normal mt-4 md:mt-[25px] text-[#000000A6]">
          View our <span className="underline">Privacy and Cookie Policy</span>
        </p>

        <button
          type="submit"
          className="w-full bg-[#274989] text-white mt-6 md:mt-[36px] rounded-[8px] py-3 md:py-[14px] text-base md:text-[18px] font-normal cursor-pointer"
        >
          Get started
        </button>

        <div className="flex items-center justify-start mt-6 md:mt-[30px] gap-4 md:gap-[21px]">
          <div className="border border-[#0000004D] p-3 md:p-[12px] rounded-[8px]">
            <img
              className="h-8 w-8 md:h-[40px] md:w-[40px]"
              src={call}
              alt="Call icon"
            />
          </div>
          <span className="text-base md:text-[18px] text-[#000000A6] font-normal">
            Call us <span className="underline">+1 234 567 8900</span>
          </span>
        </div>
      </form>
    </div>
  );
}
