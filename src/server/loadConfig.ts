import { Config } from "../types";
import { getConfig } from "./bundleConfig";
import { logger } from "./logger";

export type ResolvedConfig = Awaited<ReturnType<typeof loadConfig>>;

export const loadConfig = async () => {
  const start = performance.now();
  const config = await getConfig<Config>("rds");
  const resolvedConfig = {
    open: config?.open ?? false,
    eslint:
      config?.eslint === false
        ? (false as const)
        : { cache: true, fix: false, ...config?.eslint },
    server: { host: false, port: 3000, strictPort: false, ...config?.server },
  };
  logger.debug(`Load config: ${(performance.now() - start).toFixed(2)}ms`);
  return resolvedConfig;
};
