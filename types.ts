
import React from 'react';

export interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Tool {
  name: string;
  imageUrl: string;
  description:string;
  category: string;
  duration?: string;
  tags?: string[];
  originalPrice?: number;
  offerPrice?: number;
}

export interface Enquiry {
  toolName: string;
  name: string;
  email: string;
  reason: string;
  submittedAt?: string;
}

export type PlanTier = 'Free' | 'Pro' | 'Enterprise';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  plan: PlanTier;
  joinedAt: string;
  subscriptionStatus: 'active' | 'inactive';
}

export interface PaymentMethod {
  last4: string;
  brand: string;
}
