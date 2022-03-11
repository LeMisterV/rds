#!/usr/bin/env tnode
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { Worker } from "worker_threads";
import { build, BuildOptions } from "esbuild";

import { name, version, license, dependencies } from "../package.json";

const dev = process.argv.includes("--dev");

execSync("rm -rf dist/");

const serverOptions: BuildOptions = {
  outdir: "dist/server",
  platform: "node",
  target: "node16",
  legalComments: "inline",
  watch: dev,
};

Promise.all([
  build({
    entryPoints: ["src/server/index.ts"],
    ...serverOptions,
  }),
  build({
    bundle: true,
    entryPoints: [
      "src/server/start.ts",
      "src/server/build.ts",
      "src/server/serve.ts",
      "src/server/tscWorker.ts",
      "src/server/eslintWorker.ts",
    ],
    external: Object.keys(dependencies).concat(["chalk"]),
    ...serverOptions,
  }),
  build({
    bundle: true,
    entryPoints: ["src/client/index.ts"],
    outdir: "dist/client",
    platform: "browser",
    format: "esm",
    target: "safari13",
    legalComments: "inline",
    watch: dev,
  }),
]).then(() => {
  writeFileSync(
    "dist/server/index.js",
    readFileSync("dist/server/index.js", "utf-8").replace(
      "__VERSION__",
      version,
    ),
  );

  writeFileSync(
    "dist/server/inject.js",
    'import React from "react";\nexport { React };',
  );

  execSync("cp -r src/types bin LICENSE README.md dist/");
  execSync("mv dist/types/client.d.ts dist/");

  writeFileSync(
    "dist/package.json",
    JSON.stringify(
      {
        name,
        description: "React development server",
        version,
        author: "Arnaud Barré (https://github.com/ArnaudBarre)",
        license,
        repository: "github:ArnaudBarre/rds",
        types: "types",
        bin: { rds: "server/index.js" },
        keywords: ["react", "dev-server"],
        dependencies,
      },
      null,
      2,
    ),
  );

  // eslint-disable-next-line no-new
  if (dev) new Worker("./dist/server/tscWorker");
});
