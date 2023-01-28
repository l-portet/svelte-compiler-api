# Svelte Compiler API

> An API to compile a Svelte component to executable JS 📦

[Demo](https://codepen.io/l-portet/pen/GRBOBoM)

## Why?

Svelte is a great framework, but it's not always easy to use it simply in any environment (like Codepen). This package provides a wrapper around the Svelte compiler, which allows you to compile a single Svelte component to executable JS.

## How it woks

Just send a `POST` request to the API with the Svelte component as the body. The API will return the compiled JS output.

```bash
curl \
  -X POST \
  -d "<script>let msg = 'Hello world!'</script> <p>{msg}</p>" \
  https://svelte-compiler-api.onrender.com
```

### Options

If you need to pass options to the compiler, you can send them as query parameters. For example, to compile a Svelte component with the `autorun` option, you can send a request to `https://svelte-compiler-api.onrender.com/?autorun`. Autrorun will automatically inject the component in the body when it's imported.

At this time we don't support all of the options that the Svelte compiler supports. If you need an option that we don't support, please open an issue.

## Disclaimer

The API is hosted on a free plan on [Render](https://render.com). This means that the API may be slow and may go down. If you need a more reliable API, you can host it yourself.

Also, feel free to open an issue if you find a bug.
