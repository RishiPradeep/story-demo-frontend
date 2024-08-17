"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";

interface ChildComponentProps {
  setVisibility: (value: string) => void;
}

export default function SelectVisibility({
  setVisibility,
}: ChildComponentProps) {
  const [renderIcon, setRenderIcon] = useState<0 | 1>(0);

  return (
    <Select
      defaultValue="Public"
      onValueChange={(value) => {
        setRenderIcon(value === "Private" ? 1 : 0);
        setVisibility(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue>
          <div className="flex items-center gap-4">
            <span>{renderIcon === 0 ? <FaUnlock /> : <FaLock />}</span>
            {renderIcon === 0 ? <div>Public</div> : <div>Private</div>}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Private">Private</SelectItem>
        <SelectItem value="Public">Public</SelectItem>
      </SelectContent>
    </Select>
  );
}
