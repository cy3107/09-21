# Verdaccio 私有 npm 仓库

## 启动服务

```bash
cd infra/verdaccio
npm run start
```

默认会监听 `http://localhost:4873`，首次启动会在 `storage/` 下存储包资源。

## 创建仓库用户

启动 Verdaccio 后，另开一个终端执行：

```bash
cd infra/verdaccio
npm adduser --registry http://localhost:4873
```

按照提示输入用户名、密码和邮箱，凭据会被写入 `htpasswd` 文件。

## 测试登录和发布

1. 在项目根目录运行：

   ```bash
   npm set registry http://localhost:4873
   npm login --registry http://localhost:4873
   ```

2. 可以在任意需要发布的包目录执行：

   ```bash
   npm publish --access restricted
   ```

3. 完成后如果需要恢复公共源：

   ```bash
   npm set registry https://registry.npmjs.org/
   ```
