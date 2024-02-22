import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  webpack: (config) => {
    config.resolve.alias["@components"] = path.join(
      import.meta.dirname,
      "src/components"
    );

    config.resolve.alias["@scripts"] = path.join(
      import.meta.dirname,
      "src/scripts"
    );

    return config;
  },
};

export default nextConfig;
