<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { ref, reactive, computed } from "vue";
// import { useStore } from "vuex";
import { menuConfig } from "./menu";
import { useRouter } from "vue-router";

const activeIndex = ref("");
const router = useRouter();

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const menuConfigData = ref(menuConfig);
</script>

<template>
  <div>
    <div>
      <el-container class="layout-container-demo" style="height: 500px">
        <el-header class="header-wrapper"> </el-header>
        <el-container class="main-wrapper">
          <el-aside width="200px">
            <el-scrollbar>
              <el-menu
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :default-active="activeIndex"
              >
                <template v-for="item in menuConfigData" :key="item.index">
                  <el-sub-menu :index="item.index">
                    <template #title>
                      <el-icon>
                        <component :is="item.icon"></component>
                      </el-icon>
                      <span>{{ item.title }}</span>
                    </template>
                    <template
                      v-for="subitem in item.subItems"
                      :key="subitem.path"
                    >
                      <el-menu-item-group>
                        <!-- todo -->
                        <el-menu-item :index="subitem.path">
                          <router-link :to="subitem.path">{{
                            subitem.title
                          }}</router-link>
                        </el-menu-item>
                      </el-menu-item-group>
                    </template>
                  </el-sub-menu>
                </template>
              </el-menu>
            </el-scrollbar>
          </el-aside>
          <el-container>
            <el-main>
              <router-view />
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped lang="less">
html,
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0;
  a {
    text-decoration: none;
    color: #2c3e50;
    // color: #13c2c2;
    &:hover {
    }
  }
  li.el-menu-item.is-active a {
    color: #13c2c2;
  }
  .header-wrapper {
    border: 1px solid #ddd;
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    background-color: #ddd;
  }
  .main-wrapper {
    padding-top: 60px;
  }
}

.login-link {
  margin-right: 20px;
}
.reg-link {
  margin-right: 20px;
}
.app-logo {
  height: 60px;
  vertical-align: middle;
}
.app-content {
  padding-top: 80px;
}
.top-title {
}
</style>
