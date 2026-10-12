import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { APARTMENT_COMPLEX_SCHEMA, ROUTE_IMAGES } from "@shared/seo";

type PageMetadataProps = {
  path: string;
  title: string;
  description: string;
  children?: ReactNode;
};

/** Owns all route-dependent head tags, including the server's data-rh tags. */
export default function PageMetadata({ path, title, description, children }: PageMetadataProps) {
  const canonical = `https://www.cassellridgeapts.com${path}`;
  const { image, alt } = ROUTE_IMAGES[path];
  const imageUrl = `https://www.cassellridgeapts.com/images/${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="robots" content="index, follow" />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={alt} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {path !== "/" && (
        <script type="application/ld+json">{JSON.stringify(APARTMENT_COMPLEX_SCHEMA)}</script>
      )}
      {children}
    </Helmet>
  );
}
