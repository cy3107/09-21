## 钱包 Monorepo

该仓库通过 Turborepo 管理多个 workspace：共享库在 `packages/`，应用在 `apps/`，并提供 Verdaccio 私有 npm 仓库与 Storybook 组件文档。

### 目录结构

- `packages/libs`：钱包格式化等基础工具。
- `packages/hooks`：基于 `useImmer` 的钱包业务 Hook。
- `packages/config-tsconfig`：统一的 TypeScript 配置。
- `apps/main-spa`：主 SPA，消费 hooks 包并内置 Storybook。
- `infra/verdaccio`：Verdaccio 私仓配置与运行脚本。

### 安装依赖

```bash
npm install
```

> 安装完成后会在 `node_modules/.bin` 中提供 `turbo`、`storybook` 等命令。

### 常用脚本

```bash
# 构建所有项目（libs、hooks、main-spa 等）
npm run build

# 仅构建共享包
npm run build:packages

# 类型校验（tsc --noEmit）
npm run lint

# 启动开发服务（并行执行含 dev 脚本的 workspace，例如 main-spa）
npm run dev

# 启动 Storybook
npm run storybook

# Storybook 静态构建
npm run storybook:build
```

也可以进入子包单独执行脚本（例如 `npm run build --workspace packages/libs`）。

### 私仓（Verdaccio）

1. 启动服务：
   ```bash
   cd infra/verdaccio
   npm run start
   ```
2. 新终端创建用户：
   ```bash
   cd infra/verdaccio
   npm adduser --registry http://localhost:4873
   ```
3. 在项目根目录切换 registry：
   ```bash
   npm config set registry http://localhost:4873/ --location=project
   npm login --registry http://localhost:4873
   ```
4. 发布包：
   ```bash
   npm publish --workspace packages/libs --access restricted
   npm publish --workspace packages/hooks --access restricted
   ```
5. 主应用安装测试（保持 registry 指向私仓）：
   ```bash
npm install --workspace apps/main-spa
npx turbo run dev --filter=apps/main-spa
   ```
6. 需要恢复公共源时执行：
   ```bash
   npm config set registry https://registry.npmjs.org/ --location=project
   ```

更多 Verdaccio 细节见 `infra/verdaccio/README.md`。

### 参考项目

仓库结构和 Turborepo 任务配置借鉴了 [my-monorepo-turborepo](https://github.com/zhangzhimingwork/my-monorepo-turborepo)，后续可继续引入 lint、测试、CI 等最佳实践。***
# 09-21
# 09-21
