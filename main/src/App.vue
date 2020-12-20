<template>
  <div class="layout-wrapper">
    <div class="layout-header">
      <div class="logo">QIANKUN-EXAMPLE</div>
      <ul class="sub-apps">
        <li
          v-for="item in microApps"
          :class="{active: item.activeRule === current}"
          :key="item.name"
          @click="goto(item)"
        >{{ item.name }}</li>
      </ul>
      <div class="userinfo">主应用的state：{{ JSON.stringify(user) }}</div>
    </div>
    <div id="subapp-viewport"></div>
  </div>
</template>

<script>
import NProgress from "nprogress";
import microApps from "./micro-app";
import store from "@/store";
export default {
  name: "App",
  data() {
    return {
      isLoading: true,
      microApps,
      current: "/sub-vue",
    };
  },
  computed: {
    user() {
      return store.getGlobalState("user");
    },
  },
  watch: {
    isLoading(val) {
      if (val) {
        NProgress.start();
      } else {
        this.$nextTick(() => {
          NProgress.done();
        });
      }
    },
  },
  created() {
    this.bindCurrent();
    NProgress.start();
  },
  mounted() {
    this.listenRouterChange();
  },
  methods: {
    bindCurrent() {
      const path = window.location.pathname;
      if (this.microApps.findIndex((item) => item.activeRule === path) >= 0) {
        this.current = path;
      }
    },
    listenRouterChange() {
      const _wr = function (type) {
        const orig = history[type];
        return function () {
          const rv = orig.apply(this, arguments);
          const e = new Event(type);
          e.arguments = arguments;
          window.dispatchEvent(e);
          return rv;
        };
      };
      history.pushState = _wr("pushState");
      window.addEventListener("pushState", this.bindCurrent);
      window.addEventListener("popState", this.bindCurrent);

      this.$once("hook:beforeDestory", () => {
        window.removeEventListener("pushState", this.current);
        window.removeEventListener("popState", this.current);
      });
    },
    goto(item) {
      history.pushState(null, item.activeRule, item.activeRule);
    },
  },
};
</script>

<style>
html,
body {
  margin: 0 !important;
  padding: 0;
}

.layout-wrapper .layout-header {
  height: 50px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  line-height: 50px;
  position: relative;
}
.layout-wrapper .logo {
  float: left;
  margin: 0 50px;
}
.layout-wrapper .sub-apps {
  list-style: none;
  margin: 0;
}
.layout-wrapper .sub-apps > li {
  list-style: none;
  display: inline-block;
  padding: 0 20px;
  cursor: pointer;
}
.layout-wrapper .sub-apps > li.active {
  color: #42b983;
  text-decoration: underline;
}

.layout-wrapper .userinfo {
  position: absolute;
  right: 100px;
  top: 0;
}
</style>
