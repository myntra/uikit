---
sidebar: auto
---

# Troubleshooting Guide

This manual should have detailed description of all tasks involved in maintenance of this project.

## Deploying usage documentation website

1.  Open project directory in terminal
1.  Delete older build

    ```bash
    npm run clean
    ```

1.  Install dependencies

    ```bash
    pnpm install --frozen-lockfile
    ```

    This should install exact versions of the dependencies as recorded in `pnpm-lockfile.yaml`.

1.  Build components and packages

    ```bash
    npm run build
    ```

1.  Go to documentation directory

    ```bash
    cd uikit.myntra.com
    ```

1.  Build documentation

    ```bash
    npm run build
    ```

    This should build `uikit.myntra.com` website into `dist/` directory.

1.  Deploy to one of the QA environments

    ```bash
    npm run deploy -- qa2
    ```

1.  Verify it works in [QA environment](http://uikit2-spectrumstatic.dockins.myntra.com)

1.  Promote to production

    ```bash
    npm run promote -- --from qa2
    ```

## Embedded editor is not providing auto-completion

This is most likely due `typescript.worker.js` or `editor.worker.js` being
outdated.

We have two service workers:

- `/assets/monaco/editor.worker.js`
- `/assets/monaco/typescript.worker.js`

At the time of writing, Cross-Origin workers are not allowed and the Content-Security-Policy for [worker-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/worker-src) isn't supported in any browser. So, as a work-around these two files are served from an nginx server.

We have an HAP rule which would use nginx (port 80) hosted on `pas-sentry0` machine as a backend. The nginx server keeps local copies of these files and serves statically.

```conf
server {
  listen 80;
  server_name uikit.myntra.com;

  location /assets/monaco {
    root "/myntra/uikit.myntra.com";
    try_files $uri =404;
  }
}
```

:::warning Why can we proxy from S3 CDN?
We started with proxying S3 CDN but ended with cache invalidation issues (as file names have to fixed for HAP to re-route).
:::

To update these file on `pas-sentry0`, we can use `curl`:

```bash
curl --compressed https://myntrawebimages.s3.ap-southeast-1.amazonaws.com/spectrum/uikit/assets/assets/monaco/editor.worker.js --output /myntra/uikit.myntra.com/assets/monaco/editor.worker.js
curl --compressed https://myntrawebimages.s3.ap-southeast-1.amazonaws.com/spectrum/uikit/assets/assets/monaco/typescript.worker.js --output /myntra/uikit.myntra.com/assets/monaco/typescript.worker.js
```
