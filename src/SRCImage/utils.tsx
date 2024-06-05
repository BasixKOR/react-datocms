import React, { version } from 'react';
import type { ResponsiveImageType } from '../Image';

export function priorityProp(
  fetchPriority?: string,
): Record<string, string | undefined> {
  const [majorStr, minorStr] = version.split('.');
  const major = Number.parseInt(majorStr, 10);
  const minor = Number.parseInt(minorStr, 10);

  // https://github.com/vercel/next.js/commit/68d5a3892b4edf1b62e3ece4ada324065a96b6f3
  if (major > 18) {
    return { fetchPriority };
  }
  // In React 18.2.0 or older, we must use lowercase prop
  // to avoid "Warning: Invalid DOM property".
  return { fetchpriority: fetchPriority };
}

const bogusBaseUrl = 'https://example.com/';

export const buildSrcSetFromSrc = (
  src: string | null | undefined,
  width: number | undefined,
  candidateMultipliers: number[],
) => {
  if (!(src && width)) {
    return undefined;
  }

  return candidateMultipliers
    .map((multiplier) => {
      const url = new URL(src, bogusBaseUrl);

      if (multiplier !== 1) {
        url.searchParams.set('dpr', `${multiplier}`);
        const maxH = url.searchParams.get('max-h');
        const maxW = url.searchParams.get('max-w');
        if (maxH) {
          url.searchParams.set(
            'max-h',
            `${Math.floor(Number.parseInt(maxH) * multiplier)}`,
          );
        }
        if (maxW) {
          url.searchParams.set(
            'max-w',
            `${Math.floor(Number.parseInt(maxW) * multiplier)}`,
          );
        }
      }

      const finalWidth = Math.floor(width * multiplier);

      if (finalWidth < 50) {
        return null;
      }

      return `${url.toString().replace(bogusBaseUrl, '/')} ${finalWidth}w`;
    })
    .filter(Boolean)
    .join(',');
};

export function buildWebpSource(
  data: ResponsiveImageType,
  sizes: HTMLImageElement['sizes'] | undefined,
) {
  return (
    data.webpSrcSet && (
      <source
        srcSet={data.webpSrcSet}
        sizes={sizes ?? data.sizes ?? undefined}
        type="image/webp"
      />
    )
  );
}

export function buildRegularSource(
  data: ResponsiveImageType,
  sizes: HTMLImageElement['sizes'] | undefined,
  srcSetCandidates: number[],
) {
  return (
    <source
      srcSet={
        data.srcSet ??
        buildSrcSetFromSrc(data.src, data.width, srcSetCandidates)
      }
      sizes={sizes ?? data.sizes ?? undefined}
    />
  );
}
