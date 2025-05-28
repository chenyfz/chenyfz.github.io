<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="cv-page">
    <h2 class="cv-title">
      <span>{{ t('title') }}</span> -
      {{ t('name') }}
    </h2>

    <hr>

    <h3>{{ t('education.title') }}</h3>
    <section class="master">
      <div class="lr-layout highlight line">
        <div>{{ t('education.master.degree') }}</div>
        <div>{{ t('education.master.time') }}</div>
      </div>
      <div class="lr-layout">
        <div>{{ t('education.master.university') }}</div>
        <div class="uni-location">{{ t('education.master.location') }}</div>
      </div>
      <ul class="line">
        <li>{{ t('education.master.gpa') }}</li>
        <li>
          {{ t('education.master.studyPlan.before') }}
          <router-link to="study-plan" class="link">{{ t('education.master.studyPlan.link') }}</router-link>
          {{ t('education.master.studyPlan.after') }}
        </li>
      </ul>
    </section>

    <section class="bachelor">
      <div class="lr-layout highlight line">
        <div>{{ t('education.bachelor.degree') }}</div>
        <div>{{ t('education.bachelor.time') }}</div>
      </div>
      <div class="lr-layout">
        <div>{{ t('education.bachelor.university') }}</div>
        <div class="uni-location">{{ t('education.bachelor.location') }}</div>
      </div>
      <ul class="line">
        <li>{{ t('education.bachelor.gpa') }}</li>
        <li>{{ t('education.bachelor.achievement') }}</li>
      </ul>
    </section>

    <hr>
    <h3>{{ t('experience.title') }}</h3>

    <section class="work">
      <div class="lr-layout highlight line">
        <div>{{ t('experience.trainee.role') }}</div>
        <div>{{ t('experience.trainee.time') }}</div>
      </div>
      <div class="lr-layout">
        <div>{{ t('experience.trainee.organization') }}</div>
        <div class="uni-location">{{ t('experience.trainee.location') }}</div>
      </div>
      <ul class="line">
        <li>{{ t('experience.trainee.team') }}, {{ t('experience.trainee.supervisor') }}</li>
        <li>{{ t('experience.trainee.thesis') }}</li>
      </ul>
    </section>

    <section class="work mt-3">
      <div class="lr-layout highlight line">
        <div>{{ t('experience.fullTime.role') }}</div>
        <div>{{ t('experience.fullTime.time') }}</div>
      </div>
      <div class="lr-layout">
        <div>{{ t('experience.fullTime.organization') }}</div>
        <div class="uni-location">{{ t('experience.fullTime.location') }}</div>
      </div>
      <ul class="line">
        <li>{{ t('experience.fullTime.team') }}</li>
        <li>{{ t('experience.fullTime.responsibilities.title') }}</li>
        <li class="new-ul-container">
          <ul>
            <li>{{ t('experience.fullTime.responsibilities.wechatSearch') }}</li>
            <li>{{ t('experience.fullTime.responsibilities.wechatChannels') }}</li>
            <li>{{ t('experience.fullTime.responsibilities.internalSystems') }}</li>
          </ul>
        </li>
        <li>{{ t('experience.fullTime.achievement') }}</li>
      </ul>
    </section>

    <hr>
    <h3>{{ t('skills.title') }}</h3>
    <section class="work">
      <ul>
        <li>{{ t('skills.webDevelopment') }}</li>
        <li>{{ t('skills.softwareArchitecture') }}</li>
        <li>{{ t('skills.pythonML') }}</li>
        <li>{{ t('skills.csharpUnity') }}</li>
        <li>{{ t('skills.threeDModelingPrinting') }}</li>
      </ul>
    </section>
  </div>
</template>

<i18n lang="yaml" locale="en">
title: "Curriculum Vitae"
name: "CHEN Yangfan"
education:
  title: "Education"
  master:
    degree: "MSc Human-Computer Interaction"
    time: "Sept. 2023 - Now"
    university: "Utrecht University"
    location: "Utrecht, Netherlands"
    gpa: "CGPA: 8.29/10"
    studyPlan:
      before: "See"
      link: "Study Plan"
      after: "for more information"
  bachelor:
    degree: "B.Eng. in Software Engineering"
    time: "Sept. 2016 - June 2020"
    university: "Nanjing University"
    location: "Jiangsu, China"
    gpa: "CGPA: 4.10/5"
    achievement: "Excellent Bachelor's Dissertation Awards by both Nanjing University and Jiangsu Province"
experience:
  title: "Work Experience"
  trainee:
    role: "Trainee"
    time: "March 2025 - Now"
    organization: "Centrum Wiskunde & Informatica (CWI)"
    location: "Amsterdam, Netherlands"
    team: "Human-Centered Data Analytics Group"
    supervisor: "supervisor: Lynda Hardman"
    thesis: "Master's Thesis: Accurate and Drift-Robust Gaze Pointing with On-the-fly Recalibration"
  fullTime:
    role: "Frontend Developer at WeChat"
    time: "July 2020 - May 2022"
    organization: "Tencent"
    location: "Guangdong, China"
    team: "Department: Design Center, Core Product Department, WeChat Group"
    responsibilities:
      title: "Main responsibilities:"
      wechatSearch: "WeChat Search frond-end development"
      wechatChannels: "WeChat Channels (short video platform) and WeChat Channels Live front-end development"
      internalSystems: "Full stack internal information systems development"
    achievement: "Tencent Good+ Contributor (top 15%) in 2021H1 and 2021H2"
skills:
  title: "Technical Skills:"
  webDevelopment: "Web development (frontend, backend, database, DevOps)"
  softwareArchitecture: "Software architecture"
  pythonML: "Python (data processing and machine learning)"
  csharpUnity: "C# (Windows App and Unity)"
  threeDModelingPrinting: "3D modelling and 3D printing"
</i18n>

<i18n lang="yaml" locale="zh">
title: "简历"
name: "陈扬帆"
education:
  title: "教育经历"
  master:
    degree: "硕士 - 人机交互"
    time: "2023年9月至今"
    university: "乌特勒支大学（Utrecht University）"
    location: "荷兰"
    gpa: "绩点: 8.29/10"
    studyPlan:
      before: "详见"
      link: "课程计划"
      after: ""
  bachelor:
    degree: "本科 - 软件工程"
    time: "2016年 - 2020年"
    university: "南京大学"
    location: "江苏南京"
    gpa: "绩点：4.1/5"
    achievement: "江苏省、南京大学本科优秀毕业论文"
experience:
  title: "工作经历"
  trainee:
    role: "实习生"
    time: "2025年3月至今"
    organization: "荷兰数学和计算机科学研究中心 (CWI)"
    location: "荷兰阿姆斯特丹"
    team: "Human-Centered Data Analytics Group"
    supervisor: "导师: Lynda Hardman"
    thesis: "硕士论文: Accurate and Drift-Robust Gaze Pointing with On-the-fly Recalibration"
  fullTime:
    role: "微信 - 前端开发"
    time: "2020年 - 2022年"
    organization: "腾讯"
    location: "广东广州"
    team: "部门：微信事业群 - 设计中心 - 前端重构组"
    responsibilities:
      title: "主要职责："
      wechatSearch: "微信搜一搜前端开发"
      wechatChannels: "微信视频号和视频号直播前端开发"
      internalSystems: "内部工具系统全栈开发"
    achievement: "2021年上半年和下半年腾讯Good+贡献者（前15%）"
skills:
  title: "技术专长"
  webDevelopment: "Web开发（前端、后端、数据库、DevOps）"
  softwareArchitecture: "软件架构"
  pythonML: "Python（数据处理和机器学习）"
  csharpUnity: "C#（Windows应用和Unity）"
  threeDModelingPrinting: "3D建模和3D打印"
</i18n>

<style scoped lang="stylus">
.cv-page
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

.mt-3
  margin-top 30px
</style>