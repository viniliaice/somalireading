import { useState } from 'react';

/**
 * Illustration with an honest fallback: if the halftone asset has not been
 * generated yet, the alt text is shown on a halftone panel instead of a
 * broken image. All Somali text stays real application text.
 */
export function BookImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`bk-img-fallback ${className ?? ''}`} role="img" aria-label={alt}>
        <span className="bk-pending">Sawirka weli ma iman</span>
        <span className="bk-alt">{alt}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}
