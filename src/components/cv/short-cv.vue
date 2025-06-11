<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="short-cv">
    <h3>{{ t('education.title') }}</h3>
    <section class="master">
      <div class="highlight line">
        {{ t('education.master.degree') }}
      </div>
      <div>{{ t('education.master.university') }} - {{ t('education.master.gpa') }}</div>
    </section>

    <section class="bachelor">
      <div class="highlight line">
        {{ t('education.bachelor.degree') }}
      </div>
      <div>{{ t('education.bachelor.university') }} - {{ t('education.bachelor.gpa') }}</div>
    </section>

    <h3 class="mt-4">{{ t('experience.title') }}</h3>

    <section class="work cwi">
      <div class="highlight line">
        {{ t('experience.trainee.role') }}
      </div>
      <div>
        {{ t('experience.trainee.organization') }}
      </div>
    </section>

    <section class="work wechat">
      <div class="highlight line">
        {{ t('experience.fullTime.role') }}
      </div>
      <div>
        {{ t('experience.fullTime.organization') }}
      </div>
    </section>
  </div>
</template>

<i18n lang="yaml" locale="en">
education:
  title: "Education"
  master:
    degree: "MSc Human-Computer Interaction (Sept. 2023 - Aug. 2025)"
    university: "Utrecht University"
    gpa: "CGPA: 8.29/10"
  bachelor:
    degree: "B.Eng. in Software Engineering (Sept. 2016 - June 2020)"
    university: "Nanjing University"
    gpa: "CGPA: 4.10/5"
experience:
  title: "Work Experience"
  trainee:
    role: "Trainee at Centrum Wiskunde & Informatica (CWI) (March 2025 - Sept. 2025)"
    organization: "Human-Centered Data Analytics Group"
  fullTime:
    role: "Frontend Developer at Tencent (July 2020 - May 2022)"
    organization: "Design Center, Core Product Department, WeChat Group"
</i18n>

<i18n lang="yaml" locale="zh">
education:
  title: "教育经历"
  master:
    degree: "硕士 - 人机交互 (2023.9 - 2025.8)"
    university: "乌特勒支大学（Utrecht University，荷兰）"
    gpa: "绩点: 8.29/10"
  bachelor:
    degree: "本科 - 软件工程 (2016.9 - 2020.7)"
    university: "南京大学"
    gpa: "绩点: 4.1/5"
experience:
  title: "工作经历"
  trainee:
    role: "毕业设计实习 - 荷兰数学和计算机科学研究中心 (CWI) (2025.3 - 2025.8)"
    organization: "Human-Centered Data Analytics Group"
  fullTime:
    role: "前端开发 - 腾讯 (2020.7-2022.5)"
    organization: "微信事业群 - 基础产品部 - 设计中心 - 前端重构组"
</i18n>

<style scoped lang="stylus">
.short-cv
  color: var(--text-color-50)

h3
  margin-bottom 8px

.highlight
  font-weight 600
  color: var(--text-color)

.line
  margin-top 8px

.mt-4
  margin-top 32px

.master,
.bachelor,
.cwi,
.wechat
  position: relative
  padding-left: 52px
  &:before
    position: absolute
    content: ''
    z-index: -1
    opacity: 0.7
    left: 0
    top: 6px
    display: block
    width: 40px
    height: 40px
    background-repeat: no-repeat
    background-position: center
    background-size: contain

.master:before
  background-image: url('/UU_logo.png')

.bachelor:before
  background-image: url('/NJU_logo.png')

.cwi:before
  background-image: url('/CWI_logo.png')
  background-position: top
  top: 8px

.wechat:before
  background-image: url('/wechat_logo.png')
</style>