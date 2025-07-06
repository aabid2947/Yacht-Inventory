import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, defaultValue, ...props }, ref) => {
  const thumbCount = value?.length || defaultValue?.length || 2; // fallback to 2 thumbs

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full bg-[#f0f0f0] touch-none select-none items-center",
        className
      )}
      value={value}
      defaultValue={defaultValue}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-[2px] w-full  overflow-hidden ">
        <SliderPrimitive.Range className="absolute h-[2px] bg-black" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block h-[17px] w-[17px] rounded-full bg-[rgba(39,73,137,1)] ring-offset-background transition-colors focus-visible:outline-none    disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
});

RangeSlider.displayName = SliderPrimitive.Root.displayName;

export { RangeSlider };
