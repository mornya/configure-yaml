# configure-yaml
![npm](https://img.shields.io/npm/v/configure-yaml)
![node](https://img.shields.io/node/v/configure-yaml)
![types](https://img.shields.io/npm/types/configure-yaml)
![downloads](https://img.shields.io/npm/dw/configure-yaml)
![license](https://img.shields.io/npm/l/configure-yaml)

The integrated configuration loader using YAML.

> This project has been created by [Vessel CLI](https://www.npmjs.com/package/@mornya/vessel).
  For a simple and quick reference about it, click [here](https://mornya.github.io/documents/guide/vessel.md).

## About
YAML 파일을 이용한 Node.js 전역 환경설정 로더.

## Installation
해당 라이브러리를 사용 할 프로젝트에서는 아래와 같이 의존성 모듈로 설치한다.
```bash
$ npm install --save configure-yaml
or
$ yarn add configure-yaml
```

## Modules in the package
본 패키지에는 아래와 같은 모듈들을 포함한다.<br>
제공되는 모듈과 메소드 사용법 등은 코드 스니핏을 참고한다.

### Configure module
Configure 모듈은 다음과 같은 메소드들을 제공한다.

#### `Configure.load`
설정 읽어오기 (기본 파일 경로는 configure.yml).
```yaml
# configure.yml
common:
  id: 123

production:
  id: 456
  name: 환경설정러
```
위와 같은 내용으로 configure.yml 파일에 저장이 되어 있을 경우, 메소드 파라미터에 따라 로드하는 항목을 결정한다.
```typescript
import { Configure } from 'configure-yaml';

// "common" 항목만 로드
Configure.load('configure.yml');

// "common" 및 "production" 항목 로드 (id 값은 "production" 항목 값으로 오버라이드 됨)
Configure.load('configure.yml', 'production');
```

## Change Log
프로젝트 변경사항은 [CHANGELOG.md](CHANGELOG.md) 파일 참조.

## License
프로젝트 라이센스는 [LICENSE](LICENSE) 파일 참조.
