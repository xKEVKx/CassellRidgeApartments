import { useEffect, useRef } from "react";

declare global {
  interface Window {
    strSnippetDomain?: string[];
  }
}

const portalOrigin = "https://cassellridge.prospectportal.com";

export default function ProspectPortalGuestCard() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.setAttribute("allowtransparency", "true");

    const url = new URL(iframe.getAttribute("src")!, window.location.href);
    url.searchParams.set("host_domain", window.location.hostname);
    iframe.src = url.toString();

    window.strSnippetDomain = window.strSnippetDomain || [];
    const snippetDomain = "//cassellridge.prospectportal.com";
    if (!window.strSnippetDomain.includes(snippetDomain)) {
      window.strSnippetDomain.push(snippetDomain);
    }

    if (!document.getElementById("prospect-portal-cross-domain-script")) {
      const script = document.createElement("script");
      script.id = "prospect-portal-cross-domain-script";
      script.type = "text/javascript";
      script.src = `${portalOrigin}/javascript/iframe_cross_domain_script.js`;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      id="guest_card_100184046"
      title="Contact Cassell Ridge Apartments"
      src={`${portalOrigin}/?module=guest_card&action=create_guest_card&property[id]=100184046&lightwindow=1&is_responsive_snippet=1&snippet_type=guest_card&locale_code=&`}
      height="670"
      width="100%"
      marginWidth={0}
      marginHeight={0}
      scrolling="auto"
      frameBorder={0}
      style={{ minHeight: 550, border: 0, display: "block" }}
    />
  );
}
