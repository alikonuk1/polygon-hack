import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Button } from "@/components/elements";
import { MotionSlideRight, MotionSlideLeft } from "@/components/motion";

interface MintCardProps {
  section: any;
  direction: string;
  setDirection: React.Dispatch<React.SetStateAction<string>>;
  handleSelectedValue: (name: string) => void;
  handleSelectedImage: (direction: string) => void;
  index: number;
}

export const MintCard = ({ section, direction, setDirection, handleSelectedValue, handleSelectedImage, index }: MintCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const prepareSelect = (name: string, newDirection: string) => {
    setDirection(newDirection);
    handleSelectedValue(name);
  }
  return (
    <>
      {direction === "left" ?
        <MotionSlideLeft>
          <img
            src={section.img}
            className="rounded-md pb-4 overflow-hidden shadow-lg justify-center w-[20rem] h-[20rem]"
            alt={`${section.name} image carousel`}
            key={index}
          />
        </MotionSlideLeft>
        :
        <MotionSlideRight>
          <img
            src={section.img}
            className="rounded-md pb-4 overflow-hidden shadow-lg w-[20rem] h-[20rem]"
            alt={`${section.name} image carousel`}
            key={index}
          />
        </MotionSlideRight>
      }
      <div className="inline-flex pt-4">
        <h3 className="text-xl w-8">{section.name}</h3>
        <div className="ml-[6rem] flex">
          <AiOutlineLeft onClick={() => handleSelectedImage('left')}
            className='left-0 text-3xl inset-y-1/2 text-white cursor-pointer'
          />
          <AiOutlineRight onClick={() => handleSelectedImage('right')}
            className='right-0 text-3xl inset-y-1/2 text-white cursor-pointer'
          />
        </div>
      </div>
      <p className="mt-4">{section.lore}</p>
      <div className="text-center">
        <Button onClick={() => prepareSelect(section.name.toLowerCase(), direction === "left" ? "left" : "right")}>
          Select
        </Button>
      </div>
    </>
  )
}