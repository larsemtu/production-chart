/* eslint-disable @typescript-eslint/no-explicit-any */
// useDebouncedRange.js
import { useState, useEffect } from "react";
import { debounce } from "lodash";

const useDebouncedRange = (
  dataLength: number,
  delay = 300,
  desiredTickCount = 10
) => {
  const [visibleRange, setVisibleRange] = useState({
    startIndex: 0,
    endIndex: dataLength - 1,
  });
  const [debouncedRange, setDebouncedRange] = useState(visibleRange);

  // Function to handle brush change event
  const handleBrushChange = (e: any) => {
    setVisibleRange({ startIndex: e.startIndex, endIndex: e.endIndex });
  };

  useEffect(() => {
    const updateDebouncedRange = debounce((range) => {
      setDebouncedRange(range);
    }, delay);

    updateDebouncedRange(visibleRange);

    // Cleanup
    return () => {
      updateDebouncedRange.cancel();
    };
  }, [visibleRange, delay]);

  const calculateTickInterval = () => {
    const visibleItemCount =
      debouncedRange.endIndex - debouncedRange.startIndex + 1;
    return Math.max(1, Math.floor(visibleItemCount / desiredTickCount));
  };

  const tickInterval = calculateTickInterval();

  return { handleBrushChange, tickInterval };
};

export default useDebouncedRange;
