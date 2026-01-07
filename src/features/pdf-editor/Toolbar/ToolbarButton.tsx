/**
 * ToolbarButton - A single toolbar button component
 */

'use client';

import React, { useCallback, useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './ToolbarIcons';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  toolName: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  shortcut?: string;
  hasDropdown?: boolean;
  dropdownContent?: React.ReactNode;
  className?: string;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  label,
  toolName,
  isActive = false,
  disabled = false,
  onClick,
  shortcut,
  hasDropdown = false,
  dropdownContent,
  className = '',
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleClick = useCallback(() => {
    if (disabled) return;

    if (hasDropdown) {
      setShowDropdown(prev => !prev);
    }

    onClick?.();
  }, [disabled, hasDropdown, onClick]);

  const handleMouseEnter = useCallback(() => {
    setShowTooltip(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowTooltip(false);
  }, []);

  return (
    <div className="relative inline-flex">
      <button
        ref={buttonRef}
        className={`
          toolbar-button
          relative flex flex-col items-center justify-center
          px-2 py-1.5 min-w-[48px]
          rounded-md transition-all duration-150
          text-gray-600 hover:text-gray-900
          hover:bg-gray-100
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          ${isActive ? 'bg-blue-100 text-blue-700 border border-blue-300' : ''}
          ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={disabled}
        data-tool={toolName}
        aria-label={label}
        aria-pressed={isActive}
      >
        {/* Icon */}
        <span className="toolbar-button-icon w-6 h-6 flex items-center justify-center">
          {icon}
        </span>

        {/* Label */}
        <span className="toolbar-button-label text-[10px] mt-0.5 whitespace-nowrap leading-tight">
          {label}
        </span>

        {/* Dropdown indicator */}
        {hasDropdown && (
          <span className="absolute top-1 right-1">
            <ChevronDownIcon size={10} className="text-gray-400" />
          </span>
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && !showDropdown && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
            {label}
            {shortcut && (
              <span className="ml-1.5 text-gray-400">({shortcut})</span>
            )}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      )}

      {/* Dropdown */}
      {hasDropdown && showDropdown && dropdownContent && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[160px]"
          onClick={() => setShowDropdown(false)}
        >
          {dropdownContent}
        </div>
      )}
    </div>
  );
};

/**
 * ToolbarDivider - A visual separator between button groups
 */
export const ToolbarDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`toolbar-divider w-px h-10 bg-gray-200 mx-1.5 ${className}`} />
);

/**
 * ToolbarGroup - A group of related buttons
 */
interface ToolbarGroupProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

export const ToolbarGroup: React.FC<ToolbarGroupProps> = ({
  children,
  label,
  className = '',
}) => (
  <div className={`toolbar-group flex items-center ${className}`}>
    {label && (
      <span className="text-[9px] text-gray-400 uppercase tracking-wider mr-1.5 hidden lg:block">
        {label}
      </span>
    )}
    <div className="flex items-center gap-0.5">
      {children}
    </div>
  </div>
);

/**
 * DropdownMenuItem - Item for dropdown menus
 */
interface DropdownMenuItemProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  icon,
  label,
  onClick,
  isActive = false,
  disabled = false,
}) => (
  <button
    className={`
      w-full flex items-center gap-2 px-3 py-2 text-sm text-left
      transition-colors duration-150
      ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}
      ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
    `}
    onClick={onClick}
    disabled={disabled}
  >
    {icon && <span className="w-5 h-5 flex-shrink-0">{icon}</span>}
    <span className="flex-1">{label}</span>
    {isActive && (
      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    )}
  </button>
);

export default ToolbarButton;
