
import React from 'react';

export interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Tool {
  name: string;
  imageUrl: string;
  description: string;
  category: string;
  duration?: string;
}

export interface Enquiry {
  toolName: string;
  name: string;
  email: string;
  reason: string;
}