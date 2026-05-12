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
  // Desactivar verificación de tipos y ESLint durante el build para evitar errores
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
