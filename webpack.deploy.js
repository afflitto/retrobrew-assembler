const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const production = require('./webpack.prod.js');
const webpack = require('webpack');
const WebpackS3Plugin = require('webpack-s3-plugin');
const AWS = require('aws-sdk');

module.exports = merge(production, {
  plugins: [
    new WebpackS3Plugin({
      directory: 'dist',
      s3Options: {
        credentials: new AWS.SharedIniFileCredentials({profile: 'personal'}), //get credentials from ~/.aws/credentials
      },
      s3UploadOptions: {
        Bucket: 'retrobrew-host' //name of bucket
      },
      progress: true //display progress bar
    }),
  ]
})
