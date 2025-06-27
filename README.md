# 🌟 Lightiz UI

 A UI framework powered by configuration-first CSS generation.

---

## ✨ Introduction

**Lightiz UI** is a UI framework that enables you to describe styles via `.lightizui.style` configuration files (JSON format), and automatically transforms them into optimized CSS files using a dedicated transformer.

This approach allows:

* Easy **reuse** of styles across components
* Clear **visual consistency** in design systems
* No manual CSS writing – just declare and go

---

## 🛠 Installation

```bash
npm install lightizui lightizui-transformer
npm install lightizui-webpack --save-dev
```

---

## 📦 .lightizui.style Structure

```json
{
  "base": "lightizui",
  "components": ["button", "card", "alert"],
  "helpers": ["text"]
}
```

> This file will be processed by the Webpack loader to generate CSS from the component styles located in `node_modules/lightizui-core/styles/*.css`.

---

## 🔧 Webpack Configuration

```javascript
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.lightizui\.style$/, // Match style config files
        type: 'javascript/auto',
        use: [
          {
            loader: path.resolve(__dirname, 'node_modules/lightizui-webpack/dist/index.js'),
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.json', '.lightizui.style'],
  },
};
```

---

## 🚀 Usage

1. Create a `.lightizui.style` file in your project root:

```json
{
  "base": "lightizui",
  "components": ["button", "card"]
}
```

2. Import it in your JS/TS entry point:

```typescript
//index.ts
import './main.lightizui.style';

const Fragment= <button class="btn btn-primary">Hello</button>;
```

3. Or use a plugin to emit CSS as a separate file (optional plugin support coming soon).

---

## 📁 Related Packages

* [`lightizui-transformer`](https://npmjs.com/package/lightizui-transformer): Core transformer to generate CSS from config
* [`lightizui-webpack`](https://npmjs.com/package/lightizui-webpack): Webpack loader for transforming `.lightizui.style` files

---

## 🧠 Why Lightiz UI?

* ✨ Simpler styling pipeline
* 🔁 Reusable component-based styles
* ⚡ Lightning-fast builds with pre-compiled CSS
* 📦 Minimal CSS payload – only what you use

---

## 📜 License

MIT © smtdfc
