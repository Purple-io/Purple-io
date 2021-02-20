// Copyright © 2021 All rights reserved.

/**
 * Specifies the routes of the application. Corresponds to the `pages` object described in
 * https://cli.vuejs.org/config/#pages, and entries are relative to process.cwd().
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
 */

module.exports = {

  // sign-up page
  'sign-up': {
    entry: 'src/pages/sign-up/index.js',
    filename: 'sign-up/index.html',
    template: 'public/index.html',
    title: 'Sign Up - Purple'
  },

  // sign-in page
  'sign-in': {
    entry: 'src/pages/sign-in/index.js',
    filename: 'sign-in/index.html',
    template: 'public/index.html',
    title: 'Sign In - Purple'
  },

  // sign-in page
  'home': {
    entry: 'src/pages/home/index.js',
    filename: 'home/index.html',
    template: 'public/index.html',
    title: 'Home - Purple'
  },
};