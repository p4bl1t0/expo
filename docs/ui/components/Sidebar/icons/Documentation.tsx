import { iconSize, palette, theme } from '@expo/styleguide';
import { IconProps } from '@expo/styleguide/dist/types';
import React from 'react';

export const DocumentationIcon = ({ size = iconSize.md, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M19.0564 17.3095H9.14014V4.97375H19.0564C19.5775 4.97375 19.9999 5.39617 19.9999 5.91725V16.366C19.9999 16.8871 19.5775 17.3095 19.0564 17.3095Z"
        fill={palette.light.blue11}
      />
      <path
        d="M0.943736 17.3094H9.72363V4.97363H0.943736C0.422657 4.97363 0.000239372 5.39605 0.000239372 5.91713V16.3659C0.000239372 16.887 0.422657 17.3094 0.943736 17.3094Z"
        fill={palette.light.blue11}
      />
      <path
        d="M9.43262 5.95233V17.3096C7.60991 15.7352 0.99262 16.0066 0.99262 16.0066V3.45155C0.99262 3.45155 6.77223 2.60684 9.43262 5.95233Z"
        fill={palette.light.blue8}
      />
      <path
        d="M9.4751 4.96965V17.3095C7.37583 14.5788 3.02508 14.8701 3.02508 14.8701V1.79437C3.02508 1.79437 7.44198 1.4854 9.4751 4.96965Z"
        fill={palette.light.blue6}
      />
      <path
        d="M10.5933 5.95233V17.3096C12.416 15.7352 19.0333 16.0066 19.0333 16.0066V3.45155C19.0333 3.45155 13.2536 2.60684 10.5933 5.95233Z"
        fill={palette.light.blue8}
      />
      <path
        d="M10.5508 4.95391V17.3095C12.65 14.5788 17.0008 14.8702 17.0008 14.8702V1.79439C17.0008 1.79439 12.5839 1.46966 10.5508 4.95391Z"
        fill={palette.light.blue6}
      />
    </svg>
  );
};

export const DocumentationInactiveIcon = ({ size = iconSize.md, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M19.0564 17.3095H9.14014V4.97375H19.0564C19.5775 4.97375 19.9999 5.39617 19.9999 5.91725V16.366C19.9999 16.8871 19.5775 17.3095 19.0564 17.3095Z"
        fill="#596068"
      />
      <path
        d="M0.943736 17.3095H9.72363V4.97369H0.943736C0.422657 4.97369 0.000239372 5.39611 0.000239372 5.91719V16.366C0.000239372 16.8871 0.422657 17.3095 0.943736 17.3095Z"
        fill="#596068"
      />
      <path
        d="M9.43262 5.95227V17.3095C7.60991 15.7351 0.99262 16.0065 0.99262 16.0065V3.45149C0.99262 3.45149 6.77223 2.60678 9.43262 5.95227Z"
        fill="#9B9EA3"
      />
      <path
        d="M9.4751 4.96965V17.3095C7.37583 14.5788 3.02508 14.8701 3.02508 14.8701V1.79437C3.02508 1.79437 7.44198 1.4854 9.4751 4.96965Z"
        fill="#E1E4E8"
      />
      <path
        d="M10.5933 5.95227V17.3095C12.416 15.7351 19.0333 16.0065 19.0333 16.0065V3.45149C19.0333 3.45149 13.2536 2.60678 10.5933 5.95227Z"
        fill="#9B9EA3"
      />
      <path
        d="M10.5508 4.95391V17.3095C12.65 14.5788 17.0008 14.8702 17.0008 14.8702V1.79439C17.0008 1.79439 12.5839 1.46966 10.5508 4.95391Z"
        fill="#E1E4E8"
      />
    </svg>
  );
};
