// PM2 process for CloudPanel. PORT must match the "App Port" set on the CloudPanel Node.js site.
module.exports = {
  apps: [
    {
      name: "dayz-site",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: __dirname,
      env: { NODE_ENV: "production", PORT: 3000 },
    },
  ],
};
