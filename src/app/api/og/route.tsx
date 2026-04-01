import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#223366",
          fontFamily: "serif",
        }}
      >
        {/* Decorative top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #9b8ec4, #b8aed6, #9b8ec4)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px 60px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Texas Philanthropy
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#9b8ec4",
              lineHeight: 1.2,
              marginBottom: 32,
            }}
          >
            Network
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 700,
              lineHeight: 1.5,
            }}
          >
            A collaborative alliance committed to addressing
            Texas&apos;s most pressing social challenges
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 40,
              height: 2,
              backgroundColor: "#9b8ec4",
            }}
          />
          <div
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            texasphilanthropynetwork.org
          </div>
          <div
            style={{
              width: 40,
              height: 2,
              backgroundColor: "#9b8ec4",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
