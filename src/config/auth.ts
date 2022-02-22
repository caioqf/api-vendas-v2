export default {
  jwt: {
    //isto deveria estar no .env e importado com process.env.APP_SECRET, mas ta dando erro :)
    secret: '304730ef8b98bff2878c84be7d80617',
    expiresIn: '1d',
  }
}
