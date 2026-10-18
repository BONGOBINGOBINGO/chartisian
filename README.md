# Chartisian — GitHub Pages package

This is a ready-to-publish static website. The `index.html`, `assets/`, and `CNAME` files must stay together at the repository root.

## Publish with GitHub Pages

1. Create a GitHub repository for the site. For a free GitHub account, make it public.
2. Extract this ZIP and upload its contents to the repository root. Do not upload the ZIP as a single file.
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
4. In **Settings → Pages → Custom domain**, enter `chartisian.com` and save. The included `CNAME` file already contains this domain.
5. Add the DNS records below in GoDaddy. Leave existing MX and TXT records in place so email services keep working.
6. After DNS resolves, return to **Settings → Pages** and enable **Enforce HTTPS** when GitHub makes it available.

## GoDaddy DNS records

In GoDaddy, open **Domain Portfolio → chartisian.com → DNS → Add New Record**. Remove only conflicting web records for `@` or `www`; do not remove mail records.

Add four separate `A` records:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Add a `CNAME` record for `www`:

| Type | Name | Value |
|---|---|---|
| CNAME | www | YOUR-GITHUB-USERNAME.github.io |

Replace `YOUR-GITHUB-USERNAME` with your GitHub username. GitHub recommends pointing `www` directly to the GitHub Pages hostname rather than to the apex domain.

Optional IPv6 support: add four separate `AAAA` records with Name `@` and values `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, and `2606:50c0:8003::153`.

DNS changes can take up to 24 hours to propagate. GitHub's official instructions: <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>. GoDaddy's DNS instructions: <https://www.godaddy.com/en-in/help/add-a-cname-record-19236>.

## Files

- `index.html` — landing page
- `assets/` — styles, interactions, and portrait artwork
- `CNAME` — custom domain for GitHub Pages
