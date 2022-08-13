<script setup lang="ts">
import VPHomeHero from './VPHomeHero.vue'
import VPHomeFeatures from './VPHomeFeatures.vue'
import { useData } from 'vitepress';

const { frontmatter: fm } = useData()
</script>

<template>
  <div class="VPHome">
    <slot name="home-hero-before" />
    <VPHomeHero 
      :name="fm.hero.name"
      :text="fm.hero.text"
      :tagline="fm.hero.tagline"
      :actions="fm.hero.actions"
    />
    <slot name="home-hero-after" />

    <slot name="home-features-before" />
    <VPHomeFeatures />
    <slot name="home-features-after" />
  </div>
</template>

<style scoped>
.VPHome {
  padding-bottom: 96px;
}

.VPHome :deep(.VPHomeSponsors) {
  margin-top: 112px;
  margin-bottom: -128px;
}

@media (min-width: 768px) {
  .VPHome {
    padding-bottom: 128px;
  }
}
</style>
