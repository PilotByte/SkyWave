"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface CardSelectorProps {
  title: string;
  description: string;
  onClick?: () => void;
}

function CardSelector({
  title = "Featured Card",
  description = "Add a description here",
}: CardSelectorProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Card
      className={`w-[150px] my-4 transition-all duration-300 ${
        isHovered ? "shadow-lg -translate-y-1" : ""
      } hover:shadow-lg focus:shadow-lg hover:-translate-y-1 focus:-translate-y-1 cursor-pointer group`}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      aria-pressed={isHovered}
    >
      <CardHeader>
        <CardTitle className="flex justify-center">{title}</CardTitle>
        <CardDescription className="flex justify-center">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default CardSelector;