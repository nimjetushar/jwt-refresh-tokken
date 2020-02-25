const config = {
  "port": 8080,
  "bodyLimit": "100kb",
  "corsHeaders": ["Link"],
  "db_url": "mongodb://localhost:27017/authorization",
  "auth_token_timeout": 80,
  "refresh_token_timeout": "1d",
  "reset_token_timeout": 900
}

export default config;
