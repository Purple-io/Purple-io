<template>
  <Loader/>
  <NavBar/>
  <Home/>
  <About/>
  <Education/>
  <Skills/>
  <Industry/>
  <Projects/>
  <Contact/>
  <Footer/>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Home from '@/components/sections/Home.vue';
import About from '@/components/sections/About.vue';
import Education from '@/components/sections/Education.vue';
import Skills from '@/components/sections/Skills.vue';
import Industry from '@/components/sections/Industry.vue';
import Projects from '@/components/sections/Projects.vue';
import Contact from '@/components/sections/Contact.vue';
import Loader from '@/components/Loader.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    NavBar,
    Home,
    Loader,
    About,
    Education,
    Skills,
    Industry,
    Projects,
    Contact,
    Footer
  }
};
</script>