# Changelog

## 1.3.1 - 2017-10-06
### Fixed
- `.yo-rc.json` is removed after the project is generated [#7f0d489](https://github.com/franzip/generator-hapi-api-stack/commit/7f0d489cdcefb318b44ca07482259ad0dc6b3689)
### Changed
- Update dependencies and fixed wrong package name `shipit` to `shipit-cli` [#24d8d48](https://github.com/franzip/generator-hapi-api-stack/commit/24d8d48db12c9b36ec0f4fbed70002939cb2e367)
- Migrate to `yeoman-generator` 2 [#22559b5](https://github.com/franzip/generator-hapi-api-stack/commit/22559b5311cfb95e16f7603557f52871610c41d2)
### Added
- Add debug level to generated config files [#90b082e](https://github.com/franzip/generator-hapi-api-stack/commit/90b082ef2dee8d42d0ba44b38b35741859f518fb)
- Label generated hapi server as `api` [#2588a88](https://github.com/franzip/generator-hapi-api-stack/commit/2588a88c741aaf6ff54353be6a46d8d9f2865411)
- Add security headers by default [#07a8e73](https://github.com/franzip/generator-hapi-api-stack/commit/07a8e738df5dc79835e7d7cf8756482fc2d10e1d)
- Use yarn to install packages when available [#b763dd5](https://github.com/franzip/generator-hapi-api-stack/commit/b763dd50052442546415f8b3b58c3d3cdc192165)

## 1.3.0 - 2017-09-30
### Fixed
- Fix missing `utils` folder breaking generator since 1.2.0. See [#7](https://github.com/franzip/generator-hapi-api-stack/issues/7), [#3](https://github.com/franzip/generator-hapi-api-stack/issues/3)
### Added
- Add `good` plugin for logging ([@victorsosa](https://github.com/victorsosa) in [PR #4](https://github.com/franzip/generator-hapi-api-stack/pull/4))
- Add node 8 to travis test matrix [#b83560f](https://github.com/franzip/generator-hapi-api-stack/commit/b83560ff49ccd6dfe7fff891e9031df337c408d7)
- Add git precommit and prepush hooks [#9282bdc](https://github.com/franzip/generator-hapi-api-stack/commit/9282bdc5075b290bbc3dd155314fd2aaa80cbdbb), [#c515825](https://github.com/franzip/generator-hapi-api-stack/commit/c515825914289c61d2f6f9e059212b4fa397df56)
### Changed
- Run `git init` before `npm install` when project is generated [#2fcd79a](https://github.com/franzip/generator-hapi-api-stack/commit/2fcd79ade141a5386a6fdb0919c81f68ae0f48bb)
- Update project template dependencies [#f63c779](https://github.com/franzip/generator-hapi-api-stack/commit/f63c7794d2b89e9560adbc14b0460416bb4eb610)

## 1.2.2 - 2017-07-28 [YANKED]

### Changed
- Bump generator dependencies [#4053c18](https://github.com/franzip/generator-hapi-api-stack/commit/4053c18e9ad7f2db04c562c9aeb94cc4905a3533)

### Fixed
- Fix various code style issues [#407dfe2](https://github.com/franzip/generator-hapi-api-stack/commit/407dfe2f10b23fd79e0aaad44899b30c703cd26a)

## 1.2.0 - 2017-04-17 [YANKED]

### Changed
- Major rewrite to move to `yeoman-generator` 1.x API [#ff2ca4a](https://github.com/franzip/generator-hapi-api-stack/commit/ff2ca4a332af6757658c78f7f48c3208cb472cbf)
- Update generator and project template dependencies [#920ff24](https://github.com/franzip/generator-hapi-api-stack/commit/920ff242ff36f3f452e0f5a4ee02a9fc121e1137), [#c08cbea](https://github.com/franzip/generator-hapi-api-stack/commit/c08cbeaa8e771468823d32ab0d1d9b07c3a53a98)

## 1.1.0 - 2016-11-28

### Fixed
- Add missing `catbox-memory` dependency ([@RodrigoEspinosa](https://github.com/RodrigoEspinosa) in [PR #2](https://github.com/franzip/generator-hapi-api-stack/pull/2))

## 1.0.1 - 2016-08-28

### Changed
- Update `yeoman-generator` to 0.24.1 [#599600f](https://github.com/franzip/generator-hapi-api-stack/commit/48a03227e28e8494577544ecb861830771a13968)
