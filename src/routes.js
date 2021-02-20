// Copyright © 2021 Brandon Li. All rights reserved.

/**
 * Specifies the routes of the application. Corresponds to the `pages` object described in
 * https://cli.vuejs.org/config/#pages, and entries are relative to process.cwd().
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
 */

module.exports = {

  // root page
  'index': {
    entry: 'src/pages/index.js',
    filename: 'index.html',
    template: 'public/index.html',
    title: 'Brandon Li'
  },

  // sign-up page
  'sign-up': {
    entry: 'src/pages/sign-up/index.js',
    filename: 'sign-up/index.html',
    template: 'public/index.html',
    title: 'Sign Up - Purple'
  }
};