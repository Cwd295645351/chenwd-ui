# pnpm 实现 monorepo

`pnpm` 支持 `monorepo` 的工作机制叫做[workspace(工作空间)](https://pnpm.io/zh/workspaces)

它要求在代码仓的根目录下存有 `pnpm-workspace.yaml` 文件指定哪些目录作为独立的工作空间，这个工作空间可以理解为一个子模块或者 npm 包。

例如以下的 `pnpm-workspace.yaml` 文件定义：`a` 目录、`b` 目录、`c` 目录下的所有子目录，都会各自被视为独立的模块。

```yaml
packages:
    - a
    - b
    - c/*
```

```js
📦my-project
 ┣ 📂a
 ┃ ┗ 📜package.json
 ┣ 📂b
 ┃ ┗ 📜package.json
 ┣ 📂c
 ┃ ┣ 📂c-1
 ┃ ┃ ┗ 📜package.json
 ┃ ┣ 📂c-2
 ┃ ┃ ┗ 📜package.json
 ┃ ┗ 📂c-3
 ┃   ┗ 📜package.json
 ┣ 📜package.json
 ┣ 📜pnpm-workspace.yaml
```

需要注意的是，pnpm 并不是通过目录名称，而是通过目录下 package.json 文件的 name 字段来识别仓库内的包与模块的。

## 一、 中枢管理操作

安装和卸载依赖时， `-w` 选项表示在 `monorepo` 模式下的根目录进行操作

安装公共开发依赖

```bash
pnpm install -wD xxx
```

卸载依赖

```bash
pnpm uninstall -w xxx
```

## 二、子包管理操作

在 `workspace` 模式下，`pnpm` 主要通过 `--filter` 选项过滤子模块，实现对各个工作空间进行精细化操作的目的。

1. 为指定模块安装外部依赖

```bash
# 为 a 模块安装 lodash
pnpm --filter a install -S lodash
pnpm --filter a install -D lodash
```

2. 指定内部模块之间的相互依赖

指定模块之间的互相依赖。下面的例子演示了为 `a` 包安装内部依赖 `b`。

```bash
# 指定 a 模块依赖于 b 模块
pnpm --filter a install -S b
```

此时内部模块 a 的 package 如下：

```json
{
	"name": "a",
	// ...
	"dependencies": {
		"b": "workspace:^"
	}
}
```
