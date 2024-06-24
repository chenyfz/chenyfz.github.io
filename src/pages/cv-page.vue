<script setup lang="ts">
</script>

<template>
  <div class="about-page">
    <h2 class="cv-title">
      <span>{{ $t('cvMsg.cvTitle') }}</span> -
      {{ $t('cvMsg.name') }}
    </h2>

    <hr>

    <h3>{{ $t('cvMsg.educationTitle') }}</h3>
    <section class="master">
      <div class="lr-layout highlight line">
        <div>{{ $t('cvMsg.mscTitle') }}</div>
        <div>{{ $t('cvMsg.mscTime') }}</div>
      </div>
      <div class="lr-layout">
        <div>{{ $t('cvMsg.mscUni') }}</div>
        <div class="uni-location">{{ $t('cvMsg.mscLocation') }}</div>
      </div>
      <ul class="line">
        <li>{{ $t('cvMsg.mscGPA') }}</li>
        <li>
          {{ $t('cvMsg.spBefore') }}
          <router-link to="portfolio" class="link">{{ $t('cvMsg.spLink') }}</router-link>
          {{ $t('cvMsg.spAfter') }}
        </li>
      </ul>
    </section>

    <section class="bachelor">
      <div class="lr-layout highlight line">
        <div>{{ $t('cvMsg.bscTitle') }}</div>
        <div>{{ $t('cvMsg.bscTime') }}</div>
      </div>
      <div class="lr-layout">
        <div>{{ $t('cvMsg.bscUni') }}</div>
        <div class="uni-location">{{ $t('cvMsg.bscLocation') }}</div>
      </div>
      <ul class="line">
        <li>{{ $t('cvMsg.bscGPA') }}</li>
        <li>{{ $t('cvMsg.bscAchievement') }}</li>
      </ul>
    </section>

    <hr>
    <h3>{{ $t('cvMsg.workExperienceTitle') }}</h3>

    <section class="work">
      <div class="lr-layout highlight line">
        <div>{{ $t('cvMsg.workTitle') }}</div>
        <div>{{ $t('cvMsg.workTime') }}</div>
      </div>
      <div class="lr-layout">
        <div>{{ $t('cvMsg.workUni') }}</div>
        <div class="uni-location">{{ $t('cvMsg.workLocation') }}</div>
      </div>
      <ul class="line">
        <li>{{ $t('cvMsg.workTeam') }}</li>
        <li>{{ $t('cvMsg.workContentTitle') }}</li>
        <li class="new-ul-container">
          <ul>
            <li v-for="i in [...Array(3).keys()]" :key="i">
              {{ $t(`cvMsg.workContent[${i}]`) }}
            </li>
          </ul>
        </li>
      </ul>
    </section>

    <hr>
    <h3>{{ $t('cvMsg.skillTitle') }}</h3>
    <section class="work">
      <ul>
        <li v-for="i in [...Array(5).keys()]" :key="i">
          {{ $t(`cvMsg.skills[${i}]`) }}
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="stylus">
.about-page
  padding: 0 var(--page-padding)
  margin: 32px auto 56px auto
  max-width 730px

.cv-title
  span
    color: var(--text-color-secondary)

.uni-location
  display none

@media (min-width: 600px)
  .lr-layout
    display flex
    justify-content space-between
  .uni-location
    display unset

.highlight
  font-weight 600

.bachelor
  margin-top 40px
  margin-bottom 24px

.line
  margin-top 8px

</style>