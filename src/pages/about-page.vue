<script setup lang="ts">
</script>

<template>
  <div class="about-page">
    <div class="cv">
      <div class="cv-title">{{ $t('aboutMeMsg.cvTitle') }}</div>
      <div class="education-title">{{ $t('aboutMeMsg.educationTitle') }}</div>
      <div class="time"> 2023 - 2025</div>
      <div class="master-title">{{ $t('aboutMeMsg.masterTitle') }}</div>
      <div class="estimated-note">{{ $t('aboutMeMsg.estimated') }}</div>
      <div class="master-location">{{ $t('aboutMeMsg.masterLocation') }}</div>
      <div class="time bachelor-time"> 2016 - 2020</div>
      <div class="bachelor-title">{{ $t('aboutMeMsg.bachelorTitle') }}</div>
      <div class="bachelor-location">{{ $t('aboutMeMsg.bachelorLocation') }}</div>
      <div class="work-experience-title">{{ $t('aboutMeMsg.workExperienceTitle') }}</div>
      <div class="time">2020 - 2022</div>
      <div class="fed-title">{{ $t('aboutMeMsg.fedTitle') }}</div>
      <div />
      <div class="fed-location">{{ $t('aboutMeMsg.fedLocation') }}</div>
    </div>
    <div class="about-me-title">{{ $t('aboutMeMsg.aboutMeTitle') }}</div>
    <div class="about-me-content">{{ $t('aboutMeMsg.aboutMeContent') }}</div>
  </div>
</template>

<style scoped lang="stylus">
.about-page
  padding: 0 32px
  margin: 16px auto

.cv
  display grid
  grid-template-columns auto 1fr
  grid-template-rows: auto;
  row-gap: 4px
  column-gap: 16px

.cv-title
.education-title
.work-experience-title
  grid-column: 1 / 3
  margin-top: 16px
  font-weight 800
  margin-bottom 4px

.estimated-note
  color: var(--text-color-secondary)

.bachelor-location
  grid-column 2 / 3

.bachelor-time
.bachelor-title
  margin-top: 16px

.bachelor-title
.master-title
.fed-title
  font-weight 600

.about-me-title
  margin-top: 16px
  font-weight 800

.about-me-content
  margin-top 4px
//.education-title
//
//.time
//
//.estimated-note
//
//.master-title
//
//.master-location
//
//.bachelor-title
//
//.bachelor-location
//
//.work-experience
//
//.fed-title
//
//.fed-location
//
//.about-me-title
//
//.about-me-content

</style>