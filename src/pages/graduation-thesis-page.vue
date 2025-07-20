<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="thesis-page">
    <h2 class="heading">{{ t('title') }}</h2>
    <p class="status-line">{{ t('statusLine') }}</p>

    <!-- Intro Section -->
    <section class="section">
      <div class="text-block">
        <h3 class="section-subtitle">{{ t('introTitle') }}</h3>
        <p>
          {{ t('intro1.p1') }}<b>{{ t('intro1.h1') }}</b>{{ t('intro1.p2') }}<b>{{ t('intro1.h2') }}</b>{{ t('intro1.p3') }}
        </p>
        <p>
          {{ t('intro2.p1') }}<b>{{ t('intro2.h1') }}</b>{{ t('intro2.p2') }}<b>{{ t('intro2.h2') }}</b>{{ t('intro2.p3') }}
        </p>
        <p>
          <b>{{ t('intro3.highlight') }}</b>
          {{ t('intro3.rest') }}
        </p>
      </div>
    </section>

    <!-- Zoom Pursuit Solution -->
    <section class="section">
      <div class="text-block">
        <h3 class="section-subtitle">{{ t('zpTitle') }}</h3>
        <p>{{ t('zp1') }}</p>
        <p>{{ t('zp2') }}</p>
      </div>
      <div class="img-wrapper">
        <img class="illustration" src="/thesis-illustration.png" alt="Zoom Pursuit animation"/>
      </div>
    </section>

    <!-- Evaluation -->
    <section class="section">
      <div class="text-block">
        <h3 class="section-subtitle">{{ t('evalTitle') }}</h3>
        <p>{{ t('eval1') }}</p>
        <p><b>{{ t('eval2.title') }}</b> {{ t('eval2.content') }}</p>
        <p><b>{{ t('eval3.title') }}</b> {{ t('eval3.content') }}</p>
      </div>
    </section>

    <!-- Contribution -->
    <section class="section">
      <div class="text-block">
        <h3 class="section-subtitle">{{ t('contribution.title') }}</h3>
        <ul>
          <li><b>{{ t('contribution.l1.title') }}</b> {{ t('contribution.l1.content') }}</li>
          <li><b>{{ t('contribution.l2.title') }}</b> {{ t('contribution.l2.content') }}</li>
        </ul>
      </div>
    </section>

    <!-- Reflection -->
    <section class="section">
      <div class="text-block">
        <h3 class="section-subtitle">{{ t('reflection.title') }}</h3>
        <ul>
          <li><b>{{ t('reflection.l1.title') }}</b> {{ t('reflection.l1.content') }}</li>
          <li><b>{{ t('reflection.l2.title') }}</b> {{ t('reflection.l2.content') }}</li>
          <li><b>{{ t('reflection.l3.title') }}</b> {{ t('reflection.l3.content') }}</li>
        </ul>
      </div>
    </section>

  </div>
</template>

<i18n lang="yaml" locale="en">
title: "ZoomPursuit: Robust, Accurate, and Calibration-Free Gaze Pointing for General-Purpose GUIs"
statusLine: "Master's Thesis Project. Full paper in preparation."
introTitle: "Challenge: Universal, Calibration-Free Gaze Pointing"
intro1:
  p1: "Gaze is a fast and intuitive way to point. However, it has not been widely adopted in everyday computing due to two fundamental challenges: "
  h1: "inherent inaccuracy"
  p2: " makes it difficult to select small targets, and "
  h2: "calibration drift"
  p3: " degrades accuracy over time, forcing users to constantly interrupt their work to recalibrate."
intro2:
  p1: "Previous solutions have failed to resolve a key conflict. Techniques like "
  h1: "Smooth Pursuit"
  p2: " offer robust, calibration-free tracking but are not general, as they require modifying an application's interface. Conversely, simple "
  h2: "magnifiers"
  p3: " work on any application but do not correct the underlying pointing error, merely mitigating its effects. This leaves a critical trade-off: designers must choose between robust but non-universal methods and universal but non-corrective ones."
intro3:
  highlight: "This project addresses this fundamental trade-off:"
  rest: "how can we achieve the robustness of pursuit-based correction on any standard, unmodified desktop GUI?"
zpTitle: "Solution: Repurposing Screen Zoom for Pursuit Tracking"
zp1: "ZoomPursuit is a novel technique that generates the required motion stimulus for pursuit tracking by repurposing a standard system function: screen magnification. When a user initiates a pointing action, the system executes a smooth zoom centered on the user's initial, often inaccurate, gaze point. This displaces on-screen content, causing the user's intended target to move."
zp2: "By breaking the key trade-off of prior methods, ZoomPursuit achieves high pointing accuracy without sacrificing generality. To keep the target in view, the user naturally performs a smooth pursuit eye movement. By analyzing this movement, the system can calculate the initial pointing error and dynamically correct for it, enabling on-the-fly, in-task recalibration."
evalTitle: "Evaluation: A Two-Part Study"
eval1: "A two-part user study evaluated ZoomPursuit's performance and applicability:"
eval2:
  title: "Study 1 (Controlled Experiment):"
  content: "This study measured the technique's effectiveness in mitigating large, simulated pointing errors (3°), comparing ZoomPursuit against two established baseline techniques."
eval3:
  title: "Study 2 (Hybrid Workflow):"
  content: "This study explored a design trade-off between automation and user control by integrating ZoomPursuit into a hybrid Gaze+Pinch workflow. The workflow demonstrated high precision, achieving a final pointing accuracy of 0.1°, approaching pixel-level accuracy."
contribution:
  title: "Contributions"
  l1:
    title: "A Novel Pointing Technique for Unmodified GUIs:"
    content: "The primary contribution is the design and evaluation of ZoomPursuit. It is the first pursuit-based technique that works on any standard, unmodified GUI by generating the necessary motion stimulus from a native system function (screen zoom), thus resolving the key generality-robustness trade-off of prior methods."
  l2:
    title: "Performance Model and Hybrid Interaction:"
    content: "The second contribution is a mathematical performance model (Equation 3 in the paper) that precisely identifies the sources of residual error. This model revealed a key design trade-off between automated correction and user control, which directly informed the two-study evaluation design and the development of the hybrid Gaze+Pinch workflow for high-precision tasks."
reflection:
  title: "Reflection: Lessons from a Solo Deep-Dive"
  l1:
    title: "Bridging Theory and Practice:"
    content: "This project was a deep-dive into turning a theoretical concept from academic papers into a functional, real-world system. It taught me how to navigate the gap between an idea and its implementation, dealing with the many unforeseen technical issues that arise when theory meets practice. It was a powerful lesson in translating research into tangible interaction."
  l2:
    title: "The Power of a Performance Model:"
    content: "Developing the mathematical model wasn't just an academic exercise; it was a critical tool for debugging and design. It allowed me to precisely diagnose the sources of residual error and guided the entire two-part evaluation strategy. This experience solidified my belief in rigorous, model-based approaches to understand and improve interactive systems."
  l3:
    title: "The Challenge of Generality:"
    content: "The core goal was to create a technique for any unmodified GUI. This constraint forced a creative solution (repurposing system zoom) but also introduced significant engineering hurdles, such as handling OS-level differences and ensuring performance. It was a lesson in the difficult but rewarding process of designing truly general-purpose tools."
</i18n>

<i18n lang="yaml" locale="zh">
title: "ZoomPursuit：面向通用GUI的鲁棒、精准且免校准的凝视指向技术"
statusLine: "硕士毕业设计项目。论文准备中。"
introTitle: "挑战：实现通用的、免校准的凝视指向"
intro1:
  p1: "凝视是一种快速、直观的指向方式。但它未能在日常计算中普及，主要源于两大挑战："
  h1: "固有的不精确性"
  p2: " 导致难以选中小型目标；"
  h2: "校准漂移"
  p3: " 则会使精度随时间下降，迫使用户频繁中断工作以重新校准。"
intro2:
  p1: "现有的解决方案未能解决一个核心冲突。例如，"
  h1: "平滑追视 (Smooth Pursuit)"
  p2: " 技术能实现鲁棒、免校准的追踪，但牺牲了通用性，需要修改应用程序的界面。反之，简单的 "
  h2: "放大镜"
  p3: " 功能虽适用于任何程序，却只能缓解、无法修正潜在的指向误差。这带来一个关键权衡：设计者不得不在“鲁棒但非通用”和“通用但无法修正误差”的方案间做选择。"
intro3:
  highlight: "本研究旨在解决这一核心权衡："
  rest: "我们如何能在任何标准的、未经修改的桌面GUI上，实现Smooth Pursuit交互的鲁棒性？"
zpTitle: "解决方案：利用屏幕缩放实现追视追踪"
zp1: "ZoomPursuit 是一种新颖的技术，它通过复用一个标准的系统功能——屏幕放大——来生成追视追踪所需的运动刺激。当用户发起指向动作时，系统会以用户初始的、通常不精确的凝视点为中心进行平滑缩放。这会使屏幕上的内容发生位移，导致用户的预期目标移动。"
zp2: "ZoomPursuit 打破了以往方法的关键权衡，在不牺牲通用性的前提下实现了高指向精度。为了保持对目标的注视，用户会自然地进行一次平滑追视眼动。通过分析这次眼动，系统可以计算出初始的指向误差并动态地进行修正，从而有效地实现在任务中即时、动态的重新校准。"
evalTitle: "评估：一项包含两部分的用户研究"
eval1: "我们通过一项包含两部分的用户研究，评估了 ZoomPursuit 的性能和适用性："
eval2:
  title: "研究1（对照实验）："
  content: "该研究测量了技术在修正大幅度模拟指向误差（ 3°）时的性能，并与两种基线技术进行了比较。"
eval3:
  title: "研究2（混合工作流）："
  content: "该研究通过将 ZoomPursuit 集成到一个“凝视+捏合”的混合工作流中，探索了在自动化校正与用户控制之间的设计权衡。该工作流展示了高精度性能，最终指向精度达到 0.1°，接近像素级。"
contribution:
  title: "主要贡献"
  l1:
    title: "面向未修改GUI的新型指向技术："
    content: "首要贡献是 ZoomPursuit 的设计与评估。它是第一个通过利用原生系统功能（屏幕缩放）生成运动刺激，从而在任何标准、未修改的GUI上实现追视交互的技术，解决了以往方法的通用性-鲁棒性权衡难题。"
  l2:
    title: "性能模型与混合交互："
    content: "第二项贡献是建立了一个精确识别残余误差来源的数学性能模型（论文公式3）。该模型揭示了自动化校正和用户控制之间的关键设计权衡，并直接指导了包含两个研究的评估方案，以及用于高精度任务的“凝视+捏合”混合工作流的开发。"
reflection:
  title: "反思：一次独立深入研究的收获"
  l1:
    title: "连接理论与实践："
    content: "这个项目是一次将学术论文中的理论概念转化为一个可用的、真实世界系统的深入探索。它教会我如何跨越从想法到实现的鸿沟，并处理当理论与实践碰撞时出现的许多意料之外的技术问题。这是一堂将研究转化为实际交互的宝贵一课。"
  l2:
    title: "性能模型的力量："
    content: "开发数学模型不仅仅是一项学术任务，它更是调试和设计的关键工具。它让我能够精确地诊断残余误差的来源，并指导了整个两阶段评估策略的设计。这段经历坚定了我通过严谨的、基于模型的方法来理解和改进交互系统的信念。"
  l3:
    title: "通用性的挑战："
    content: "项目的核心目标是为任何未经修改的GUI创建一种新技术。这一约束催生了创造性的解决方案（复用系统缩放），但也带来了巨大的工程障碍，例如处理操作系统级别的差异和确保性能。这让我深刻体会到设计真正通用的工具是一个困难但有益的过程。"
</i18n>

<style scoped lang="stylus">
.thesis-page
  max-width: 800px
  margin: 32px auto 64px
  padding: 0 var(--page-padding)

.heading
  margin-bottom: 16px
  font-size: 28px
  font-weight: 700
  line-height: 1.4

.status-line
  margin-top: 0
  margin-bottom: 32px
  color: var(--text-color-70)

.section-subtitle
  margin-top: 0
  margin-bottom: 16px
  font-weight: 600
  font-size: 18px

.section
  margin-top: 48px
  display: grid
  grid-template-columns: 1fr
  grid-gap: 32px
  align-items: start

.contribution ul
  padding-left: 24px
  margin: 0
  list-style-type: disc
  li
    margin: 16px 0
    line-height: 1.7

.text-block p
  margin: 16px 0
  line-height: 1.7

.illustration
  width: 100%
  object-fit: cover

@media (max-width: 800px)
  .heading
    font-size: 24px
  .section
    grid-gap: 24px

</style> 