import React from 'react';

const AlexaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 8a4 4 0 0 0-4 4" />
    <path d="M12 16a4 4 0 0 0 4-4" />
    <path d="M12 12a4 4 0 0 0-4-4" />
    <path d="M12 12a4 4 0 0 0 4 4" />
    <path d="M12 20a8 8 0 0 0 8-8" />
    <path d="M4 12a8 8 0 0 0 8 8" />
    <path d="M12 4a8 8 0 0 0-8 8" />
    <path d="M20 12a8 8 0 0 0-8-8" />
  </svg>
);

export default AlexaIcon;
