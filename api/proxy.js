const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  let defaultTarget = "https://vtx.onrender.com";

  // Optional: Allow dynamic target override via query parameter
  const url = new URL(req.url, `http://${req.headers.host}`);
  const dynamicTarget = url.searchParams.get("proxy");

  // Basic validation to prevent SSRF or abuse (adjust as needed)
  const isValidTarget = dynamicTarget && dynamicTarget.startsWith("https://");

  const target = isValidTarget ? dynamicTarget : defaultTarget;

  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {}, // Adjust if you want to remove/modify paths
  })(req, res);
};
