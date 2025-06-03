import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const defaultSiteName = 'فروشگاه اینترنتی کارنو';

const SEO = ({
  title,
  description,
  canonical,
  openGraph = {},
  robots,
  additionalMetaTags = [],
  noIndex = false,
}) => {
  return (
    <Helmet
      defaultTitle={defaultSiteName}
      titleTemplate={`%s | ${defaultSiteName}`}
      htmlAttributes={{ lang: 'fa', dir: 'rtl' }}
    >
      {/* Title & Meta */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : robots || 'index,follow'} />

      {/* Open Graph */}
      <meta property="og:type" content={openGraph.type || 'website'} />
      <meta property="og:site_name" content={openGraph.site_name || defaultSiteName} />
      <meta property="og:title" content={openGraph.title || title} />
      <meta property="og:description" content={openGraph.description || description} />
      {canonical && <meta property="og:url" content={canonical} />}
      {openGraph.image && <meta property="og:image" content={openGraph.image} />}
      {openGraph.image_alt && <meta property="og:image:alt" content={openGraph.image_alt} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={openGraph.title || title} />
      <meta name="twitter:description" content={openGraph.description || description} />
      {openGraph.image && <meta name="twitter:image" content={openGraph.image} />}

      {/* Custom meta */}
      {additionalMetaTags.map((tag, i) => (
        <meta key={tag.name || i} {...tag} />
      ))}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  canonical: PropTypes.string,
  openGraph: PropTypes.object,
  robots: PropTypes.string,
  additionalMetaTags: PropTypes.arrayOf(PropTypes.object),
  noIndex: PropTypes.bool,
};

export default SEO;
