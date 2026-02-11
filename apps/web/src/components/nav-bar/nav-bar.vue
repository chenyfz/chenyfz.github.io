<script setup lang="ts">
import {useWatchColor} from './use-watch-color.ts'
// import {useWatchLanguage} from './use-watch-language.ts' //
import LanguageButton from './language-button.vue'
import DarkModeButton from './dark-mode-button.vue'
import {computed, ref} from 'vue'
import DrawerTransition from '../../transitions/drawer-transition.vue'
import FadeTransition from '../../transitions/fade-transition.vue'
import {useRoute} from 'vue-router'
import { useI18n } from 'vue-i18n'

const { mode, toggleMode } = useWatchColor()
// const { language, toggleLanguage} = useWatchLanguage() //
const { t } = useI18n()

const route = useRoute()

const isMenuOpen = ref(false)
const onClickMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const tabs = [{
  pageName: 'home',
  textKey: 'homeTab',
  name: 'home'
}, {
  pageName: 'graduation-thesis',
  textKey: 'graduationThesisTab',
  name: 'graduation-thesis'
}, {
  pageName: 'masters-courses',
  textKey: 'mastersCoursesTab',
  name: 'masters-courses'
}, {
  pageName: 'cv',
  textKey: 'cvTab',
  name: 'cv'
}]

const currentPageName = computed(() => route.name)
const isHighlighted = (pageName: string) => {
  return pageName === currentPageName.value
}
</script>

<template>
  <div class="nav-bar sticky top-0 z-3 min-h-16 px-page text-lg font-semibold bg-transparent backdrop-blur-[20px] grid items-center gap-2 transition duration-200">
    <span
      class="material-symbols-outlined block layout:hidden select-none cursor-pointer rounded p-1 -m-1 hover:bg-highlight"
      :class="{'bg-highlight': isMenuOpen}"
      @click="onClickMenu"
    >menu</span>
    <div class="mr-6 hover:underline">
      <router-link v-if="route.params.lang" :to="{ name: 'home', params: { lang: route.params.lang }}">
        chenyfz.github.io
      </router-link>
    </div>

    <language-button
      class="hidden layout:block"
    />
    <div class="hidden layout:block">
      <dark-mode-button :mode="mode" @click="toggleMode" />
    </div>

    <template v-if="route.params.lang">
      <router-link
        v-for="tab in tabs"
        :key="tab.pageName"
        class="hidden layout:inline-block px-2 py-1.5 transition duration-150 rounded text-muted hover:bg-highlight"
        :class="{'text-content!': isHighlighted(tab.pageName)}"
        :to="{ name: tab.name, params: { lang: route.params.lang }}"
      >
        {{ t(tab.textKey) }}
      </router-link>
    </template>
  </div>

  <Teleport to="body">
    <drawer-transition :duration-second="0.5" direction="down">
      <div v-if="isMenuOpen" class="fixed inset-x-0 top-16 backdrop-blur-[20px] bg-transparent z-2">
        <template v-if="route.params.lang">
          <router-link
            v-for="tab in tabs"
            :key="tab.pageName"
            class="menu-item block py-3 px-page relative text-muted transition duration-150 hover:bg-highlight"
            :class="{'text-content!': isHighlighted(tab.pageName)}"
            :to="{ name: tab.name, params: { lang: route.params.lang }}"
            @click="isMenuOpen = false"
          >
            {{ t(tab.textKey) }}
          </router-link>
        </template>
        <div class="menu-item py-3 px-page relative text-muted grid items-center gap-4 pt-1.5 -ml-2 grid-cols-[auto_auto_1fr]">
          <language-button
          />
          <dark-mode-button :mode="mode" @click="toggleMode" />
        </div>
      </div>
    </drawer-transition>
    <fade-transition :duration-second="0.5">
      <div v-if="isMenuOpen" class="fixed inset-0 z-1 transition duration-200" @click="isMenuOpen = false" />
    </fade-transition>
  </Teleport>

</template>

<i18n lang="yaml" locale="en">
homeTab: "About Me"
mastersCoursesTab: "MSc Courses"
cvTab: "CV"
graduationThesisTab: "MSc Thesis"
</i18n>

<i18n lang="yaml" locale="zh">
homeTab: "主页"
mastersCoursesTab: "硕士课程"
cvTab: "简历"
graduationThesisTab: "硕士论文"
</i18n>

<style scoped>
.nav-bar {
  grid-template-columns: auto auto 1fr auto auto auto auto auto auto auto;
}

.menu-item:last-child::before {
  content: '';
  position: absolute;
  top: 0;
  left: var(--page-padding);
  right: var(--page-padding);
  border-top: 1px solid var(--c-muted);
}
</style>
