# cypress-split-example ![cypress version](https://img.shields.io/badge/cypress-13.3.0-brightgreen) ![cypress-split version](https://img.shields.io/badge/cypress--split-1.18.5-brightgreen)

> Split Cypress specs on GitHub Actions and CircleCI

Using the free plugin [cypress-split](https://github.com/bahmutov/cypress-split) without any external services

![Cypress split on GitHub Actions](./images/split.png)

📝 Read the blog post [Run Cypress Specs In Parallel For Free](https://glebbahmutov.com/blog/cypress-parallel-free/).

<!-- prettier-ignore-start -->
CI name | Workflow | CI status
--- | --- | ---
GitHub Actions | [ci.yml](./.github/workflows/ci.yml) | [![ci](https://github.com/bahmutov/cypress-split-example/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bahmutov/cypress-split-example/actions/workflows/ci.yml)
Reusable GHA | [reusable.yml](./.github/workflows/reusable.yml) | [![reusable](https://github.com/bahmutov/cypress-split-example/actions/workflows/reusable.yml/badge.svg?branch=main)](https://github.com/bahmutov/cypress-split-example/actions/workflows/reusable.yml)
CircleCI | [config.yml](./.circleci/config.yml) | [![CircleCI](https://dl.circleci.com/status-badge/img/gh/bahmutov/cypress-split-example/tree/main.svg?style=svg&circle-token=dfde227842eaaf720046feeb8ada7cd419732634)](https://dl.circleci.com/status-badge/redirect/gh/bahmutov/cypress-split-example/tree/main)
<!-- prettier-ignore-end -->

Reusable workflow via [cypress-workflows](https://github.com/bahmutov/cypress-workflows)

## Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2023

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)
- [videos](https://www.youtube.com/glebbahmutov)
- [presentations](https://slides.com/bahmutov)
- [cypress.tips](https://cypress.tips)
- [Cypress Tips & Tricks Newsletter](https://cypresstips.substack.com/)
- [my Cypress courses](https://cypress.tips/courses)

License: MIT - do anything with the code, but don't blame me if it does not work.
