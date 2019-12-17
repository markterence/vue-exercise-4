<script>
export default {
  data() {
    return {
      env: process.env.NODE_ENV
    };
  },
  methods: {
    testEnvVars() {
      this.$router.push("/toodoo");
      // const foofoo = process.env.FOO_VAR ? process.env.FOO_VAR : "wat";
      // const fooVue = process.env.VUE_APP_FOO;
      // console.log("%cprocess.env.FOO_VAR", "color: purple;", foofoo);
      // console.log("%cprocess.env.VUE_APP_FOO", "color: purple;", fooVue);
    }
  }
};
</script>

<template>
  <div>
    <div>
      <button @click="testEnvVars">Hit Me: /toodoo</button>
    </div>
  </div>
</template>
