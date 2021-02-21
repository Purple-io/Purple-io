// Copyright © 2021 All rights reserved.

/**
 * Vue configuration file. See https://cli.vuejs.org/config/.
 *
 * @author Brandon Li <brandon.li@berkeley.com>
 */

module.exports = {
  lintOnSave: false,
  pages: require('./src/routes.js'),
  publicPath: '/'
};