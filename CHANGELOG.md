# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Changed the way components render

## [1.1.3] - 2020-05-11
### Fixed
- Stop doing private queries on SSR and avoid breaking SSR.

## [1.1.2] - 2020-04-28

### Fixed

- improve timing of Yotpo widget refreshes

## [1.1.1] - 2020-02-17

### Fixed

- make sure Yotpo widgets are refreshed after main script loads

## [1.1.0] - 2020-01-17

### Added

- added new app setting to allow choice of either product id or product reference id for pulling up yotpo reviews

## [1.0.1] - 2019-12-19

### Added

- Added documentation

## [1.0.0] - 2019-11-25

### Changed

- Removed billing options from manifest, which requires a new major version

## [0.0.2] - 2019-11-19

### Fixed

- Widgets now call `yotpo.refreshWidgets()` instead of `yotpo.initWidgets()` to ensure better stability

## [0.0.1] - 2019-11-14

### Added

- initial release
