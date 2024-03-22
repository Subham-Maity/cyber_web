import * as React from "react";
import { Range } from "react-range";

type IProps = {
  STEP: number;
  MIN: number;
  MAX: number;
  values: number[];
  handleChanges: (val: number[]) => void;
  setFinalPrice?: (values: number[]) => void;
};

function SingleRange({
  STEP,
  MIN,
  MAX,
  values,
  handleChanges,
  setFinalPrice,
}: IProps) {
  //   console.log("max", MAX);
  return (
    <>
      {setFinalPrice && (
        <Range
          step={STEP}
          min={MIN}
          max={MAX}
          values={values}
          onChange={(values) => handleChanges(values)}
          onFinalChange={(values) => setFinalPrice(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              key="track"
              style={{
                ...props.style,
                height: "3px",
                width: "100%",
                backgroundColor: "#D2F34C",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              key={`thumb-${index}`}
              style={{
                ...props.style,
                height: "15px",
                width: "15px",
                backgroundColor: "#00BF58",
                borderRadius: "50%",
                outline: "none",
              }}
            />
          )}
        />
      )}
    </>
  );
}

export default SingleRange;
