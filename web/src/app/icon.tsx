import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#003785",
          border: "2px solid #b9ffff",
          color: "#b9ffff",
          fontSize: 15,
          fontWeight: 700,
          fontFamily: "monospace",
        }}
      >
        DC
      </div>
    ),
    { ...size }
  );
}
