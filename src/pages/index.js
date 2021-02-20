// Copyright © 2021 Brandon Li. All rights reserved.

/**
 * Entry point for the root page.
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
 */

import { createApp } from 'vue';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FadeEffect, SlideEffect, SlideExpoEffect } from '@/utils/gsap-effects';
import index from '@/pages/index.vue';
import '@/assets/styles/styles.scss';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
gsap.registerEffect(FadeEffect);
gsap.registerEffect(SlideEffect);
gsap.registerEffect(SlideExpoEffect);
createApp(index).mount('#app', true);