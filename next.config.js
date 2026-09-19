const withNextIntl = require("next-intl/plugin")("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
    /*
      This app is served at aayushvisuals.com/invoice-generator, which is a
      rewrite in the portfolio pointing at this deployment. A rewrite alone
      is not enough: Next emits absolute URLs for its own chunks, fonts and
      API routes, so without a basePath every one of them would resolve
      against the portfolio's origin and 404. basePath makes the app emit
      the prefix itself, so what it asks for is what the rewrite forwards.

      It applies to the deployment's own URL too - the Vercel URL serves
      the app at /invoice-generator, not at /.
    */
    basePath: "/invoice-generator",

    /*
      basePath means the deployment serves at /invoice-generator and its
      root is nothing at all, so opening the Vercel URL bare gives a 404
      that looks like a failed deploy rather than a path that moved. This
      sends the root to the app.

      basePath:false on the redirect is required: without it Next prefixes
      the source too, making the rule /invoice-generator ->
      /invoice-generator, which is a redirect loop.
    */
    async redirects() {
        return [
            {
                source: "/",
                destination: "/invoice-generator",
                basePath: false,
                permanent: false,
            },
        ];
    },

    serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
    webpack: (config) => {
        config.module.rules.push({
            test: /\.map$/,
            use: "ignore-loader",
        });
        return config;
    },
};

// Bundle analyzer
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
