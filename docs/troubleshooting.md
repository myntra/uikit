# Troubleshooting Guide

This manual should have detailed description of all tasks involved in maintenance of this project.

## Deploying usage documentation website

1.  Open project directory in terminal
2.  Delete older build

    ```bash
    npm run clean
    ```

3.  Install dependencies

    ```bash
    pnpm install --frozen-lockfile
    ```

    This should install exact versions of the dependencies as recorded in `pnpm-lockfile.yaml`.

4.  Build components and packages

    ```bash
    npm run build
    ```

5.  Go to documentation directory

    ```bash
    cd uikit.myntra.com
    ```

6.  Install dependencies

    ```bash
    pnpm install --frozen-lockfile
    ```

7.  Build documentation

    ```bash
    npm run build
    ```

    This should build `uikit.myntra.com` website into `dist/` directory.

8.  Deploy to one of the QA environments

    ```bash
    npm run deploy -- qa1
    ```

9.  Promote to production

    ```bash
    npm run promote -- --from qa1
    ```
