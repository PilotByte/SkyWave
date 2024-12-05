'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface ClickableCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export function ClickableCard({
  title = 'Featured Card',
  description = 'Add a descritpion here',
  onClick = () => null,
}: ClickableCardProps) {
  return (
    <Card
      className="w-[350px] transition-all duration-300 hover:shadow-lg focus:shadow-lg hover:-translate-y-1 focus:-translate-y-1 cursor-pointer group"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      aria-pressed="false"
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end text-muted-foreground">
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </CardFooter>
    </Card>
  );
}
