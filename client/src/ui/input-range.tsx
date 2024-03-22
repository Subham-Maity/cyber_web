"use client";
import { getTrackBackground, Range } from "react-range";
// prop type
type IProps = {
  STEP: number;
  MIN: number;
  MAX: number;
  values: number[];
  handleChanges: (val: number[]) => void;
};
const InputRange = ({ STEP, MIN, MAX, values, handleChanges }: IProps) => {
  return (
    <>
      <Range
        step={STEP}
        max={MAX}
        min={0}
        values={values}
        onChange={(vals) => handleChanges(vals)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            // key="track"
            style={{
              ...props.style,
              height: "3px",
              width: "100%",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            // key={`thumb-${index}`}
            style={{
              ...props.style,
              height: "17px",
              width: "5px",
              backgroundColor: "#00BF58",
            }}
          />
        )}
      />
    </>
  );
};

export default InputRange;
