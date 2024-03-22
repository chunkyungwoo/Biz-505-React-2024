# 주문서 관리 프로젝트

## Prisma 설정

- `npx prisma init`
- `prisma/schema.prisma` 파일과 `.env` 파일 확인
- `.env` 파일에 DB 연결 정보 설정

```.env
DATABASE_URL="mysql://root:!Biz8080@localhost:3306/orderDB"
```

- `prisma/schema.prisma` 파일에서 다음 항목 확인. provider 를 `mysql` 로 변경

```
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

- 이미 적용된 DB schema import : `npx prisma db pull`
- prisma 설정 적용 : `npx prisma generate` 실행
- `schema.prisma` 파일과 `package.json` 파일 확인
