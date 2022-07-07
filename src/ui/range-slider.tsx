import React, { useEffect, useState } from 'react';
import './range-slider.css';

interface Props {
  title: string;
  prefix?: string;
  suffix?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export const RangeSlider = ({
  title,
  prefix,
  suffix,
  min,
  max,
  step,
  value,
  onChange,
}: Props) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    if (internalValue !== value) setInternalValue(value);
  }, [value]);

  return (
    <div className="range-slider-wrapper">
      <h3 className="title">
        <span>{title}</span>
        <strong>
          {prefix}
          {internalValue}
          {suffix}
        </strong>
      </h3>
      <input
        type="range"
        className="range-slider"
        min={min}
        max={max}
        step={step}
        value={internalValue}
        onChange={(e) => {
          setInternalValue(Number(e.target.value));
          onChange(Number(e.target.value));
        }}
      />
      <div className="range">
        <span>
          {prefix}
          {min}
          {suffix}
        </span>
        <span>
          {prefix}
          {max}
          {suffix}
        </span>
      </div>
    </div>
  );
};
