import { useEffect, useRef } from "react";

declare global {
  interface Window {
    NestioLeadCapture?: (config: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

const NESTIO_SCRIPT_SRC =
  "https://integrations.nestio.com/contact-widget/v1/integration.js";
const NESTIO_KEY = "c00f0c92dc684b96a8b510c8b37867c1";
const NESTIO_GROUP = 11245;

interface NestioLeadCaptureProps {
  /** "lead_capture" = contact form, "lead_capture_appointment" = schedule-a-tour form */
  type: "lead_capture" | "lead_capture_appointment";
  className?: string;
}

/**
 * Embeds the Funnel Leasing (Nestio) lead-capture widget. The widget's loader
 * script inserts the form iframe next to the script tag with id
 * "nestio-lead-capture-frame", so we inject a fresh script tag inside this
 * component's container each time it mounts.
 */
export default function NestioLeadCapture({ type, className }: NestioLeadCaptureProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // The vendor script requires its script tag to carry this exact id and
    // resolves it via getElementById, so two live instances would conflict.
    // Only initialize if no other instance's script tag is currently in the DOM.
    if (document.getElementById("nestio-lead-capture-frame")) {
      console.warn(
        "NestioLeadCapture: another instance is already mounted; skipping init to avoid ID conflict.",
      );
      return;
    }

    let cancelled = false;

    const init = () => {
      if (cancelled) return;
      if (typeof window.NestioLeadCapture === "function") {
        window.NestioLeadCapture({
          type,
          key: NESTIO_KEY,
          group: NESTIO_GROUP,
          color: "",
          location: "",
          onComplete: function () {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: "lead-form-submission" });
          },
        });
      }
    };

    const script = document.createElement("script");
    script.src = NESTIO_SCRIPT_SRC;
    script.id = "nestio-lead-capture-frame";
    script.onload = init;
    container.appendChild(script);

    return () => {
      // Ignore a late onload and remove the script plus any injected iframe
      cancelled = true;
      container.innerHTML = "";
    };
  }, [type]);

  return (
    <div
      ref={containerRef}
      className={`nestio-widget-container ${className ?? ""}`}
    />
  );
}
