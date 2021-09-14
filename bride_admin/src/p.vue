<template>
   <section>
<!--       <keep-alive > 
           <router-view v-if="$store.state.mutations.refresh"></router-view>
       </keep-alive> -->
       <router-view ></router-view>
    </section>
</template>
<script>
    export default{
        data(){
          return {
           
          }
        },
        methods:{
        }
    }
</script>
