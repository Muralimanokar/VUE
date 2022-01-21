<template>
  <app-layout>
     <div class="home_content_container"> 
       Home
     </div>  
  </app-layout>
</template>

<style>
.home_content_container{
  height: 100px;
  text-align: center;
  margin-top:100px
}
</style>


<script>
import AppLayout from '@/layouts/Admin.vue';

export default {
  name: 'HomeIndex',
  components: {
    AppLayout
  },
};
</script>
