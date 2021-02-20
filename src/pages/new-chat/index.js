// Copyright © 2021 All rights reserved.

/**
 * Entry point for the /new-chat page.
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
 */

import { createApp } from 'vue';
import index from '@/pages/new-chat/index.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/styles/forms.scss';

createApp(index).mount('#app');