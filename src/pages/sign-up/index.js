// Copyright © 2021 All rights reserved.

/**
 * Entry point for the sign-up page.
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
 */

import { createApp } from 'vue';
import index from '@/pages/sign-up/index.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/styles/sign-up.scss';

createApp(index).mount('#app');