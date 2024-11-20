'use client';

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardSelectorProps {
  title: string;
  description: string;
  onClick?: () => void;
  isSelected: boolean;
}

function CardSelector({
  title = 'Featured Card',
  description = 'Add a description here',
  onClick,
  isSelected,
}: CardSelectorProps) {
  return (
    <Card
      className={cn(
        'w-[150px] my-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-[5px] focus:-translate-y-1 cursor-pointer group',
        isSelected && 'border-2 border-green-400 bg-green-700/10'
      )}
      onClick={onClick}
      role="button"
    >
      <CardHeader>
        <CardTitle className="flex justify-center">{title}</CardTitle>
        <CardDescription className="flex justify-center">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default CardSelector;
