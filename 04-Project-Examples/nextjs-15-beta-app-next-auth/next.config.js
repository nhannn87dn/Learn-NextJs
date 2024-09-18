/** @type {import("next").NextConfig} */
module.exports = {
  output: "standalone",
  env: {
      JWT_SECRET: 'myCatfly200miles',
      NEXTAUTH_SECRET: '4b5jMM1qXd+1/gv2eZ320qltFCrTGVG/qtsLbKMG+Go=',
      AUTH_SECRET: '4b5jMM1qXd+1/gv2eZ320qltFCrTGVG/qtsLbKMG+Go=',
      NEXTAUTH_URL: 'http://localhost:3000'
  },
}
