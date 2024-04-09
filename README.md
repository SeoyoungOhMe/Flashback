# Flashback
졸업프로젝트 그로쓰

## 시작 가이드
```
git clone https://github.com/SeoyoungOhMe/Flashback.git
```
- 의존성 모듈 설치
```
npm install express ejs body-parser pg express-session bcypt jsonwebtoken
```
- 시작 
npm start로 시작!

## `dev` 주요 폴더 설명
- routes 폴더 : API 주요 기능을 폴더별로 개발해 모아둠.
- app.js 파일 : 최상위 파일
- config 폴더 : db 정보 저장


## 에러 발생 시
- `npm start` 시 발생할 수 있는 에러
```
node:internal/modules/cjs/loader:1473
  return process.dlopen(module, path.toNamespacedPath(filename));
                 ^

Error: dlopen(/Users/osy/Flashback/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node, 0x0001): tried: '/Users/osy/Flashback/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node' (not a mach-o file), '/System/Volumes/Preboot/Cryptexes/OS/Users/osy/Flashback/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node' (no such file), '/Users/osy/Flashback/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node' (not a mach-o file)
    at Module._extensions..node (node:internal/modules/cjs/loader:1473:18)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Module._load (node:internal/modules/cjs/loader:1023:12)
    at Module.require (node:internal/modules/cjs/loader:1235:19)
    at require (node:internal/modules/helpers:176:18)
    at Object.<anonymous> (/Users/osy/Flashback/node_modules/bcrypt/bcrypt.js:6:16)
    at Module._compile (node:internal/modules/cjs/loader:1376:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Module._load (node:internal/modules/cjs/loader:1023:12) {
  code: 'ERR_DLOPEN_FAILED'
}

Node.js v20.10.0
```
bcrypt 모듈의 로컬 설치 위치 문제 때문이므로 삭제 후 다시 깔면 됨.

- 해결 방법 :
```
npm uninstall bcrypt
npm install bcrypt
```