<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="thesis-page">
    <h2 class="heading">{{ t('title') }}</h2>
    <p class="status-line">{{ t('statusLine') }}</p>
    <div></div>

    <!-- Intro Section -->
    <section class="section">
      <div class="text-block">
        <h3 class="section-subtitle">{{ t('introTitle') }}</h3>
        <p>{{ t('intro1') }}</p>
        <p>{{ t('intro2') }}</p>
      </div>
      <div class="img-wrapper right">
        <img class="illustration drift-illustration" src="/drift-illustration.png" alt="Calibration drift illustration"/>
      </div>
    </section>

    <!-- Smooth-Pursuit Limitation Section -->
    <section class="section">
      <div class="img-wrapper left">
        <img class="illustration" src="/pursuit-illustration.png" alt="Smooth pursuit concept"/>
      </div>
      <div class="text-block">
        <h3 class="section-subtitle">{{ t('smoothTitle') }}</h3>
        <p>{{ t('smooth1') }}</p>
        <p>{{ t('smooth2') }}</p>
      </div>
    </section>

    <!-- Zoom Pursuit Solution -->
    <section class="section">
      <div class="text-block">
        <h3 class="section-subtitle">{{ t('zpTitle') }}</h3>
        <p>{{ t('zp1') }}</p>
        <p>{{ t('zp2') }}</p>
      </div>
      <div class="img-wrapper right">
        <img class="illustration" src="/thesis-illustration.png" alt="Zoom Pursuit animation"/>
      </div>
    </section>

    <!-- Evaluation -->
    <section class="section single-col">
      <div class="text-block">
        <h3 class="section-subtitle">{{ t('evalTitle') }}</h3>
        <p>{{ t('eval') }}</p>
        <ul class="baseline-list">
          <li><strong>CZL</strong> – {{ t('czl') }}</li>
          <li><strong>GCAK</strong> – {{ t('gcak') }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<i18n lang="yaml" locale="en">
  title: "Zoom Pursuit: Drift-Robust Gaze Pointing for General-Purpose (Unmodified) GUIs"
  statusLine: "This project started in February 2025 and is in progress. The full thesis will be completed by the end of July and linked here."
  introTitle: "Calibration Drift"
  intro1: "Gaze-based interaction in 2D GUIs typically requires precise individual calibration. However, individual calibration is vulnerable to factors such as head movement and lighting changes, often resulting in calibration drift."
  intro2: "This drift frequently necessitates task-interrupting recalibrations, reducing usability in real-world settings."
  smoothTitle: "Smooth Pursuit and Its Limitation"
  smooth1: "Smooth Pursuit–based alternatives improve robustness by comparing eye movement trajectories with predefined visual motion, avoiding the need for precise spatial calibration."
  smooth2: "All existing implementations, however, assume full control over the user interface: every target must be animated along specific paths (e.g., circular or linear motion) for trajectory matching. This confines current approaches to controlled setups like custom apps or experimental browsers, making them impractical for general-purpose GUIs."
  zpTitle: "Introducing Zoom Pursuit (ZP)"
  zp1: "ZP generates motion stimuli suitable for pursuit tracking without requiring any knowledge or control over the underlying interface. When the user signals a need for enhanced precision—for example, through a gesture, a key press, or gaze dwelling—ZP triggers a local radial zoom animation centered on the current gaze estimate."
  zp2: "The outward expansion produces consistent visual motion regardless of content. By analysing the user's eye movements relative to this induced motion, the system dynamically corrects gaze estimates and performs incremental self-calibration during regular use."
  evalTitle: "Evaluation & Baselines"
  eval: "We compared ZP with two established techniques that, like ZP, operate in unmodified GUIs. Pursuit-based methods were excluded because they rely on full UI control."
  czl: "Centered Zoom Lens relocates and magnifies the user's gaze point at screen centre, leveraging better central tracking accuracy and magnification to improve precision."
  gcak: "Gaze-controlled Arrow Keys provide indirect pointer control using gaze direction combined with keyboard input, offering robustness through manual correction."
  placeholder: "(Illustration coming soon)"
</i18n>

<i18n lang="yaml" locale="zh">
  title: "Zoom Pursuit：面向通用（无需改动）GUI 的抗漂移凝视指向"
  statusLine: "本项目自 2025 年 2 月启动，目前仍在进行中。论文全文将于 7 月底完成并在此处附上链接。"
  introTitle: "校准漂移"
  intro1: "在 2D 图形界面中，凝视交互往往需要精确的个体校准。但头部移动、光照变化等因素会导致校准漂移。"
  intro2: "漂移迫使用户中断任务重新校准，降低了真实场景中的可用性。"
  smoothTitle: "Smooth Pursuit 方法与局限"
  smooth1: "Smooth Pursuit 方法通过比较眼动轨迹与预设视觉运动，提高了鲁棒性，无需精确的空间校准。"
  smooth2: "然而所有现有实现都假设对界面的完全控制：必须让目标沿特定路径（如圆形或直线）运动，以便进行轨迹匹配。这使得它们只能应用于定制应用或实验浏览器，难以在通用 GUI 中落地。"
  zpTitle: "我们的方案：Zoom Pursuit (ZP)"
  zp1: "ZP 无需了解或控制底层界面即可生成适合追踪的运动刺激。当用户通过手势、按键或凝视停留等方式表明需要更高精度时，ZP 会在当前凝视估计点触发局部径向放大动画。"
  zp2: "向外扩散的视觉运动与内容无关，系统通过比较眼动与该运动动态修正凝视估计，并在日常使用中持续自我校准。"
  evalTitle: "评估与基线"
  eval: "我们将 ZP 与两种同样可在原生 GUI 中运行的经典技术进行对比。由于现有追踪法需要控制 UI 动画，故未被列为基线。"
  czl: "Centered Zoom Lens：将凝视点移动并放大到屏幕中心，利用中心区域更高的追踪精度提升选择准确性。"
  gcak: "Gaze-controlled Arrow Keys：结合凝视方向与键盘输入间接控制指针，依靠手动修正提高鲁棒性。"
  placeholder: "（示意图待补充）"
</i18n>

<style scoped lang="stylus">
.thesis-page
  max-width 960px
  margin 24px auto 64px
  padding 0 var(--page-padding)

.heading
  margin-bottom 24px
  font-size 28px
  font-weight 700

.section-subtitle
  margin-top 0
  margin-bottom 8px

.section
  margin-top 48px
  display grid
  grid-template-columns 1fr 1fr
  grid-gap 32px
  align-items start

.text-block p
  margin 12px 0
  line-height 1.6

.illustration
  width 100%
  border-radius 8px
  object-fit cover
  border 8px solid #ffffff
  box-sizing border-box

.drift-illustration
  border-left 64px solid #ffffff
  border-right 64px solid #ffffff

.img-wrapper.left
  order: -1

.baseline-list
  margin-top 12px
  padding-left 20px
  list-style-type disc

.baseline-list li
  margin 6px 0

@media screen and (max-width: 768px)
  .section
    grid-template-columns 1fr
  .text-block
    order -1
  .img-wrapper
    order 0
  .img-wrapper.left
    order 0
  .img-wrapper.right
    order 0

.status-line
  margin-top 8px
  color var(--text-color-70)

.single-col
  grid-template-columns 1fr !important
</style> 