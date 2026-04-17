/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones de build para Vercel
  webpack: (config, { isServer }) => {
    // Reducir memoria durante el build
    if (isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: false, // Desactivar minimización para reducir memoria
      };
    }
    return config;
  },
  // Optimizaciones de imágenes
  images: {
    unoptimized: true, // Desactivar optimización de imágenes si no es necesaria
  },
  // Otras optimizaciones
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
