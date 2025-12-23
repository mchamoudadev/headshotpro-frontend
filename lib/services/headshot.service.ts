/**
 * Headshot Service
 * Handles all headshot-related API calls
 */

import { api } from '../api/client';
import type {
  GetHeadshotsParams,
  GetHeadshotsResponse,
  UploadPhotoParams,
  UploadPhotoResponse,
  Headshot,
  GetStylesResponse,
  StyleInfo,
} from '../types';

/**
 * Get all available headshot styles
 */
export async function getHeadshotStyles(): Promise<StyleInfo[]> {
  return api.get<StyleInfo[]>('/headshots/styles');
}

/**
 * Upload photo and generate headshots
 */
export async function uploadPhoto(params: UploadPhotoParams): Promise<UploadPhotoResponse> {
  const formData = new FormData();
  formData.append('photo', params.photo);
  formData.append('styles', JSON.stringify(params.styles));
  
  // Add prompt if provided
  if (params.prompt) {
    formData.append('prompt', params.prompt);
  }

  return api.post<UploadPhotoResponse>(
    '/headshots/generate',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
}

/**
 * Get all headshots for authenticated user
 */
export async function getHeadshots(params?: GetHeadshotsParams): Promise<GetHeadshotsResponse> {
  return api.get<GetHeadshotsResponse>('/headshots', {
    params,
  });
}

/**
 * Get a single headshot by ID
 */
export async function getHeadshotById(id: string): Promise<Headshot> {
  const response = await api.get<{ headshot: Headshot }>(`/headshots/${id}`);
  return response.headshot;
}

/**
 * Delete a headshot
 */
export async function deleteHeadshot(id: string): Promise<void> {
  await api.delete(`/headshots/${id}`);
}

