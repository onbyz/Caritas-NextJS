import Script from "next/script";

export function Analytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Z55Y48DLTY"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Z55Y48DLTY');
        `}
      </Script>
      <Script id="gtm" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M65DPNG7');
        `}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-M65DPNG7"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="GTM"
        />
      </noscript>
    </>
  );
}
