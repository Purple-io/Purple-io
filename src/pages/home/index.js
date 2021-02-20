// Copyright © 2021 All rights reserved.

/**
 * Entry point for the home page.
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
 */

import { createApp } from 'vue';
import index from '@/pages/home/index.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/styles/home.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

createApp(index).mount('#app');