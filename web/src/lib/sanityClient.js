import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset   = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion= import.meta.env.VITE_SANITY_API_VERSION || '2025-08-01';
const useCdn    = (import.meta.env.VITE_SANITY_USE_CDN ?? 'true') !== 'false';

export const sanity = projectId ? createClient({ projectId, dataset, apiVersion, useCdn }) : null;
export const hasCMS = !!sanity;

const builder = sanity ? imageUrlBuilder(sanity) : null;
export const urlFor = (src, w, h) => builder ? builder.image(src).width(w).height(h).fit('crop').auto('format').url() : null;
