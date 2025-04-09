
import React from "react";

interface DealsHeaderProps {
  title: string;
  description: string;
}

export function DealsHeader({ title, description }: DealsHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
