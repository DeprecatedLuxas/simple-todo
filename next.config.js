const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    scssOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
};
