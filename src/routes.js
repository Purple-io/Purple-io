// Copyright © 2021 All rights reserved.

/**
 * Specifies the routes of the application. Corresponds to the `pages` object described in
 * https://cli.vuejs.org/config/#pages, and entries are relative to process.cwd().
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
 */

module.exports = {

  // index page
  'index': {
    entry: 'src/pages/index.js',
    filename: 'index.html',
    template: 'public/index.html',
    title: 'PurplePOV'
  },

  // sign-up page
  'sign-up': {
    entry: 'src/pages/sign-up/index.js',
    filename: 'sign-up.html',
    template: 'public/index.html',
    title: 'Sign Up - PurplePOV'
  },

  // sign-in page
  'sign-in': {
    entry: 'src/pages/sign-in/index.js',
    filename: 'sign-in.html',
    template: 'public/index.html',
    title: 'Sign In - PurplePOV'
  },

  // home page
  'home': {
    entry: 'src/pages/home/index.js',
    filename: 'home.html',
    template: 'public/index.html',
    title: 'Home - PurplePOV'
  },

  // new-chat page
  'new-chat': {
    entry: 'src/pages/new-chat/index.js',
    filename: 'new-chat.html',
    template: 'public/index.html',
    title: 'New Chat - PurplePOV'
  }
};