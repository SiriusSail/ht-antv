<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" :key="'manage' + $route.path" />
  </router-view>
</template>
