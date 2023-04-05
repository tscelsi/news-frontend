import React from 'react';

const LoadingSVG = () => (
  <svg width="50px" height="50px" viewBox="0 0 50 50">
    <path
      fill="#000"
      d="M25,1C12.317,1,1,12.317,1,25s11.317,24,24,24s24-11.317,24-24S37.683,1,25,1z M25,46c-11.579,0-21-9.421-21-21s9.421-21,21-21s21,9.421,21,21S36.579,46,25,46z"
    />
    <path
      fill="#fff"
      d="M25,4c-9.925,0-18,8.075-18,18s8.075,18,18,18s18-8.075,18-18S34.925,4,25,4z M25,38c-7.72,0-14-6.28-14-14s6.28-14,14-14s14,6.28,14,14S32.72,38,25,38z"
    />
    <path
      fill="#000"
      d="M25,7c-7.18,0-13,5.82-13,13s5.82,13,13,13s13-5.82,13-13S32.18,7,25,7z M25,31c-5.514,0-10-4.486-10-10s4.486-10,10-10s10,4.486,10,10S30.514,31,25,31z"
    >
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="0.6s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export default LoadingSVG;
