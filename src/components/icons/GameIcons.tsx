// This file contains custom SVG icons for the game hub.

const iconProps = {
  className: "w-12 h-12 sm:w-16 sm:h-16 text-primary group-hover:text-accent transition-colors duration-300",
};

export const FireIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-2.4 2.4-3.6 5.6-3.6 9.6 0 4 1.2 7.2 3.6 9.6s6 3.6 9.6 3.6c4 0 7.2-1.2 9.6-3.6s3.6-6 3.6-9.6c0-4-1.2-7.2-3.6-9.6S16 2 12 2z" transform="scale(0.75) translate(4, 4)"/>
    <path d="M12.5 10.5c-2.4-2.4-3.6-5.6-3.6-9.6" transform="scale(0.75) translate(4, 4)"/>
  </svg>
);

export const StoneIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

export const WindIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
  </svg>
);

export const WaterIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12c.83-.67 2-1.5 3-2 1.43-1.43 2.14-3 3-3 1.43 0 2.14 1.57 3.57 3.57S15.86 15 18 15s3-1 3-1"/>
    <path d="M3 7c.83-.67 2-1.5 3-2 1.43-1.43 2.14-3 3-3 1.43 0 2.14 1.57 3.57 3.57S15.86 10 18 10s3-1 3-1"/>
    <path d="M3 17c.83-.67 2-1.5 3-2 1.43-1.43 2.14-3 3-3 1.43 0 2.14 1.57 3.57 3.57S15.86 20 18 20s3-1 3-1"/>
  </svg>
);

export const NatureIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l-3 4.5h6L12 2z"/>
    <path d="M18 6.5l-3 4.5h6l-3-4.5z"/>
    <path d="M6 6.5l-3 4.5h6L6 6.5z"/>
    <path d="M15 13l-3 4.5h6l-3-4.5z"/>
    <path d="M9 13l-3 4.5h6l-3-4.5z"/>
  </svg>
);

export const TreasureChestIcon = () => (
    <svg className="w-20 h-20 sm:w-24 sm:h-24 text-primary group-hover:text-accent transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="8" width="20" height="12" rx="2" />
        <path d="M12 8V6a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
        <path d="M12 8V6a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <path d="M12 14h.01" />
    </svg>
);
