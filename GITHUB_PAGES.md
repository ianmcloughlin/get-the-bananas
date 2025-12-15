# GitHub Pages Setup Documentation

This repository is configured to use GitHub Pages for hosting a website.

## What's Included

The following files have been added to enable GitHub Pages:

1. **`_config.yml`** - Jekyll configuration file that defines the site settings, theme, and build options
2. **`index.md`** - Main landing page with front matter for Jekyll processing
3. **`.github/workflows/pages.yml`** - GitHub Actions workflow for automated deployment

## Enabling GitHub Pages

To enable GitHub Pages for this repository, follow these steps:

1. Go to the repository settings on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions** as the deployment method
4. The workflow will automatically trigger on pushes to the `main` branch

Once enabled, the site will be available at:
```
https://ianmcloughlin.github.io/get-the-bananas
```

## Local Development

To test the site locally, you can use Jekyll:

```bash
# Install Jekyll (if not already installed)
gem install bundler jekyll

# Serve the site locally
jekyll serve

# The site will be available at http://localhost:4000/get-the-bananas
```

## Customization

### Changing the Theme

Edit the `theme` property in `_config.yml`. Popular GitHub Pages themes include:
- `minima` (default)
- `cayman`
- `slate`
- `modernist`

### Editing Content

The main landing page can be edited by modifying `index.md`. You can add more pages by creating additional `.md` files in the repository root.

### Adding More Pages

Create new Markdown files with front matter:

```markdown
---
layout: default
title: Your Page Title
---

# Your Content Here
```

## Workflow Details

The GitHub Actions workflow (`.github/workflows/pages.yml`) performs the following:

1. **Build Job**: Checks out the code, sets up Jekyll, builds the site, and uploads artifacts
2. **Deploy Job**: Deploys the built site to GitHub Pages

The workflow runs:
- On every push to the `main` branch
- Manually via the Actions tab (workflow_dispatch)

## Troubleshooting

If the site doesn't appear:
1. Check that GitHub Pages is enabled in repository settings
2. Verify the workflow ran successfully in the Actions tab
3. Ensure the deployment source is set to "GitHub Actions"
4. Check that the `main` branch contains the necessary files

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)
