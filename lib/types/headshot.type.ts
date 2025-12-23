/**
 * Headshot Types
 * TypeScript interfaces for headshot feature
 */

export type HeadshotStatus = 'processing' | 'completed' | 'failed';

export type HeadshotStyle = 
  | 'professional' 
  | 'casual' 
  | 'creative' 
  | 'executive' 
  | 'linkedin';

export interface GeneratedHeadshot {
  style: string;
  url: string;
  key: string;
  createdAt: string;
}

export interface Headshot {
  _id: string;
  userId: string;
  originalPhotoUrl: string;
  originalPhotoKey: string;
  status: HeadshotStatus;
  generatedHeadshots: GeneratedHeadshot[];
  selectedStyles: string[];
  failureReason?: string;
  processingStartedAt?: string;
  processingCompletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StyleInfo {
  key: HeadshotStyle;
  name: string;
  description: string;
}

export interface GetHeadshotsParams {
  status?: HeadshotStatus;
  limit?: number;
  offset?: number;
}

export interface GetHeadshotsResponse {
  headshots: Headshot[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface UploadPhotoParams {
  photo: File;
  styles: HeadshotStyle[];
  prompt?: string; // Optional custom prompt, if not provided uses default style prompt
}

export interface UploadPhotoResponse {
  headshotId: string;
  status: HeadshotStatus;
  selectedStyles: string[];
}

export interface GetStylesResponse {
  data: StyleInfo[];
}

export interface HeadshotCardProps {
  headshot: Headshot;
  onDelete?: (id: string) => void;
  onView?: (headshot: Headshot) => void;
}

export interface PhotoUploadProps {
  onUploadSuccess?: (file: File) => void;
  onUploadError?: (error: string) => void;
}

export interface StyleSelectorProps {
  selectedStyles: HeadshotStyle[];
  onStylesChange: (styles: HeadshotStyle[]) => void;
  maxStyles?: number;
  availableStyles?: StyleInfo[];
}

export interface HeadshotGalleryProps {
  headshots: Headshot[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  onDelete?: (id: string) => void;
}
