<template>
  <div id="app">
    <!-- <landing-page></landing-page> -->
    <work-beach/>
  </div>
</template>

<script>
// import LandingPage from '@/components/LandingPage'
import WorkBeach from '@/containers/WorkBeach';

export default {
  name: 'electronvue',
  components: {
    // LandingPage
    WorkBeach
  }
};
</script>

<style>
/* CSS */
html {
  height: 100%;
}

body {
  height: 100%;
}

#app {
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
}
</style>
