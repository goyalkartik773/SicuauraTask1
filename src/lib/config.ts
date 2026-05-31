const getSiteUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!envUrl) {
    return "https://ggaligance.vercel.app";
  }
  if (envUrl.startsWith("http://") || envUrl.startsWith("https://")) {
    return envUrl;
  }
  return `https://${envUrl}`;
};

export const SITE_CONFIG = {
  url: getSiteUrl(),
  name: "GG Fashion",
  description: "India's finest ethnic wear — sarees, lehengas, suits and wedding collections.",
  twitter: "@ggfashion",
} as const;
