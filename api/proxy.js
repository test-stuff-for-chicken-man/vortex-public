const { createProxyMiddleware } = require("http-proxy-middleware");
const url = require("url");

module.exports = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const target = parsedUrl.query?.target;

  if (!target || !/^https?:\/\/.+/.test(target)) {
    res.statusCode = 400;
    return res.end("Missing or invalid 'target' URL");
  }

  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path, req) => {
  
      return path.replace(/^\/api\/proxy/, "");
    },
    onError(err, req, res) {
      res.statusCode = 500;
      res.end("Proxy error: " + err.message);
    },
  })(req, res);
};
