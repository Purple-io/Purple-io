// Copyright © 2021 All rights reserved.

/**
 * Entry point for the sign-in page.
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
 */

import { createApp } from 'vue';
import index from '@/pages/sign-in/index.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/styles/forms.scss';

createApp(index).mount('#app');