import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        },
      ) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

let recaptchaScriptPromise: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
  if (window.grecaptcha) return Promise.resolve();
  if (recaptchaScriptPromise) return recaptchaScriptPromise;

  recaptchaScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById("google-recaptcha-v2");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Failed to load reCAPTCHA")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "google-recaptcha-v2";
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
    document.head.appendChild(script);
  });

  return recaptchaScriptPromise;
}

interface RecaptchaV2Props {
  onChange: (token: string | null) => void;
  resetKey?: number;
}

export default function RecaptchaV2({ onChange, resetKey = 0 }: RecaptchaV2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);
  const [loadError, setLoadError] = useState(false);
  const { data, isError } = useQuery<{ siteKey: string }>({
    queryKey: ["/api/recaptcha/site-key"],
  });

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!data?.siteKey || !containerRef.current) return;

    let cancelled = false;
    setLoadError(false);

    loadRecaptchaScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.grecaptcha) return;
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: data.siteKey,
          callback: (token) => onChangeRef.current(token),
          "expired-callback": () => onChangeRef.current(null),
          "error-callback": () => onChangeRef.current(null),
        });
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
      onChangeRef.current(null);
      widgetIdRef.current = null;
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [data?.siteKey]);

  useEffect(() => {
    if (widgetIdRef.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetIdRef.current);
    }
  }, [resetKey]);

  if (isError || loadError) {
    return (
      <p role="alert" className="text-sm text-red-600">
        Verification could not load. Please refresh the page and try again.
      </p>
    );
  }

  return <div ref={containerRef} aria-label="Human verification" className="min-h-[78px]" />;
}