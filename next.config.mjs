/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the existing AWS infra (private S3 + OAC + CloudFront) serves it as-is.
  output: "export",
  // CloudFront/S3 has no image optimizer; ship images as authored.
  images: { unoptimized: true },
  // Emit /work/foo/index.html so S3 static hosting resolves clean URLs.
  trailingSlash: true,
};

export default nextConfig;
