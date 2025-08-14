<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import RichText from '../components/ui/rich-text.vue'
import { computed } from 'vue'

const { t, tm } = useI18n()
const reflectionParagraphs = computed(() => {
  const reflections = tm('reflections')
  if (typeof reflections === 'object' && reflections !== null) {
    return Object.keys(reflections)
  }
  return []
})
</script>

<template>
  <div class="thesis-page">
    <section class="hero-section">
      <div class="hero-content">
        <h2 class="heading">
          <div>ZoomPursuit:</div>
          <div>Smooth Pursuit-based Gaze Interaction for General-Purpose GUIs</div>
        </h2>

        <div class="project-meta">
          {{ t('projectInfo.type') }} | 
          {{ t('projectInfo.duration') }} |
          <span>{{ t('projectInfo.supervisorLabel') }} </span>
          <a href="https://homepages.cwi.nl/~lynda/" class="link" target="_blank"
            > Lynda Hardman</a
          >
        </div>
        <div class="card">
          <div class="abstract-block">
          <h3 class="section-subtitle">{{ t('abstractTitle') }}</h3>
          <p>{{ t('abstract.p1') }}</p>
          <p>{{ t('abstract.p2') }}</p>
          <p>{{ t('abstract.p3') }}</p>
        </div>

        <div class="actions">
          <a
            href="/250805-Yangfan-MScThesis-ZoomPursuit-Submission.pdf"
            download="YangfanChen-MScThesis-ZoomPursuit.pdf"
            class="download-button"
          >
            {{ t('downloadButton') }}
          </a>
          <a :href="t('githubUrl')" class="link" target="_blank">{{ t('viewRepo') }}</a>
        </div>
        </div>
      </div>
    </section>

    <section class="reflections-section">
      <div class="text-block">
        <h3 class="section-subtitle">{{ t('reflectionsTitle') }}</h3>
        <p v-for="pKey in reflectionParagraphs" :key="pKey">
          <rich-text :text="t(`reflections.${pKey}`)" />
        </p>
      </div>
    </section>
  </div>
</template>

<i18n lang="yaml" locale="en">
downloadButton: "Download Paper"
viewRepo: "View Repository on GitHub"
githubUrl: "https://github.com/oh-yangfan/zoom-pursuit"
projectInfo:
  type: "Master's Graduation Thesis"
  duration: "Duration: ~7 months (Feb 2025 - Aug 2025)"
  supervisorLabel: "Supervisor:"
abstractTitle: "Abstract"
abstract:
  p1: "Gaze interaction in general-purpose GUIs is limited by its inaccuracy and calibration requirements. Smooth pursuit-based methods offer a calibration-free alternative but often demand modified user interfaces. We present ZoomPursuit, a technique that adapts smooth pursuit for unmodified GUIs by repurposing system-level magnification functionality."
  p2: "A baseline evaluation (N=16) established that under simulated calibration drift, ZoomPursuit achieved the accuracy of a manual refinement method with the speed of a simpler automated zoom-based technique. However, the study also revealed a conflict between its imperceptible automation and users' sense of control. A follow-up study (N=7) resolved this with a two-stage model integrating automated correction with manual refinement. This design achieved a final pointing accuracy of 0.10° while dynamically calibrating on the fly from an uncalibrated state."
  p3: "This work details the design evolution of a pursuit-based interaction technique for general GUIs. The final design demonstrates a model that is both technically effective and preserves user agency."
reflectionsTitle: "My Thoughts"
reflections:
  p1: "(Note: These thoughts were originally written in Chinese and translated into English by Google Gemini.)"
  p2: "This project began with [DatAR](https://www.projects.science.uu.nl/ics-datar/), an Augmented Reality prototype on the HoloLens 2 designed to help neuroscientists discover research opportunities by visualizing connections in brain data. I chose it for my graduation project for a simple reason: I wanted to get my hands on the HoloLens 2. Released in 2019, this headset had fascinated me since my undergraduate days, and I often wondered what I would create if I ever had the chance to use it."
  p3: "My initial idea was to evolve DatAR from a pure AR experience into a cross-reality system. In DatAR, abstract elements like menu options are physicalized into virtual spheres or cubes for hand manipulation, which can paradoxically increase interaction complexity. In contrast, desktop interfaces are far more efficient for abstract tasks like text input, scrolling, and filtering. I envisioned a system where AR provides an immersive 360° workspace for natural 3D interaction, while the desktop handles high-efficiency tasks. Gaze would signal shifts in attention between the two, with gestures or keyboard commands switching input modes. However, during a meeting with my supervisor, Lynda, she pointed out that this was leaning more towards an engineering project with a less-defined research question, where most of my time would be spent coding. I decided to pivot, saving the cross-reality concept for a future opportunity, perhaps a PhD."
  p4: "My next idea stemmed from a key pain point in DatAR: selecting objects in densely occluded environments, like a brain point cloud. Users often had to reach into the cloud to 'pinch' a target. But the HoloLens 2's unreliable hand depth estimation frequently caused rendering errors where objects would appear in front of the hand when they should be behind it. This broke the illusion of reality and made depth perception, and thus selection, frustratingly difficult. My literature review revealed that existing solutions still heavily relied on controllers, even as controller-free hand and gaze tracking were becoming more capable. This led me to explore a controller-free solution combining eye and hand input."
  p5: "One evening, I conceived a method: a user would first gaze at a target, then use a hand gesture to rotate their view, and gaze again. The intersection of these two conical gaze volumes would drastically shrink the selection area for easier refinement. After reviewing dozens of papers, I found a study with a remarkably similar approach. To build upon it with sufficient novelty for a Master's thesis, I needed a new direction."
  p6: "That new direction was Smooth Pursuit, a method I found brilliant for its use of the eye's natural physiology. As the user's eye follows a target during rotation, the system can compare the pursuit trajectory with the object's motion path to identify the selection. For my initial 3D demo on the HoloLens 2, this worked well. I then considered its application to 2D GUIs, which I believe will remain essential in mixed reality due to their efficiency and user familiarity. I developed another demo, this time using magnification as the trigger for the smooth pursuit."
  p7: "This magnification-triggered approach showed immense potential. It could work not just for object selection, but with **any** GUI. This was a critical insight, as most smooth pursuit techniques require custom UIs, limiting their use in accessibility scenarios where modifying third-party applications isn't possible. Because magnification is a system-level function, my technique could be universally applied. Excited by this, I bought a Tobii Eye Tracker 5 and confirmed its feasibility on a standard Windows desktop. Given that the university's HoloLens 2 was a shared device, shifting my project to the desktop was also a practical choice, with the knowledge that it could be ported back to MR later."
  p8: "While I believe this technique holds great promise for accessibility, exploring that path fully was beyond the scope of a Master's thesis due to time and ethical constraints, such as participant recruitment. I therefore focused on validating it as a novel interaction technique. This project has been a fitting conclusion to my Master's journey, which began after I left my job to pursue an HCI degree. It was inspired by the belief that clever ideas can become truly useful designs—a belief that took root years ago and has guided me ever since. Three years ago, could I have imagined creating this? And three years from now, what will I be doing?"
  p9: "Thank you for reading my thoughts on the journey behind this thesis."
</i18n>

<i18n lang="yaml" locale="zh">
downloadButton: "下载论文"
viewRepo: "在 GitHub 上查看代码库"
githubUrl: "https://github.com/oh-yangfan/zoom-pursuit"
projectInfo:
  type: "硕士毕业设计"
  duration: "周期：约7个月（2025年2月 - 2025年8月）"
  supervisorLabel: "导师："
abstractTitle: "摘要"
abstract:
  p1: "眼动交互在通用图形用户界面（GUI）中的应用，因其固有的不精确性及对硬件校准的依赖而受限。基于平滑追视（Smooth Pursuit）的交互方法提供了一种免校准的替代方案，但通常要求修改用户界面。我们为此提出了ZoomPursuit：一种通过复用操作系统级的放大镜功能，将平滑追视交互扩展至任意GUI的方法。"
  p2: "初步评估（N=16）表明，在模拟校准漂移时，ZoomPursuit的准确性媲美手动微调，速度则接近自动缩放。然而，研究也揭示了其“隐式”自动修正与用户控制感之间的冲突。为此，我们开展了第二轮研究（N=7），并设计出一个整合自动校正与手动微调的两阶段模型。最终，该设计在无初始校准的情况下，通过动态追踪实现了0.10°的指向精度。"
  p3: "本研究详细阐述了一种面向通用GUI的平滑追视交互技术的设计演化。最终的设计验证了一个既能保证技术效率，又能保留用户能动性的交互模型。"
reflectionsTitle: "一些随想"
reflections:
  p1: "这个项目的起点是 [DatAR](https://www.projects.science.uu.nl/ics-datar/)。它是一个基于 HoloLens 2 的增强现实原型，帮助神经科学家通过可视化脑区与疾病研究数据的关联，来发现研究机会。我选择这个项目作为毕业设计的原因很简单：就是想亲手体验 HoloLens 2。这款 2019 年发布的头显在我学生时代就给了我很深的印象。我当时一直在想：如果有一天我能用上它，我会做出什么？"
  p2: "我最先想到的是把 DatAR 从“纯 AR/VR”扩展成一个 cross-reality 系统。在 DatAR 里，每一个选项、功能这些抽象元素需要被“实体化”成虚拟世界中的小球或小方块，才能用手去操作，这一步反而提高了操作复杂度。相反，桌面端处理抽象信息更高效，比如文本输入、滚动、筛选甚至二维的节点式编程。基于这种差异，我设计了一种分工：AR 提供 360° 的工作空间和自然的三维观察，用手去操作三维物体，通过移动视角获取对三维物体最直观的感受（例如深度线索等），把对象随手放到宽裕的空间中，而不局限于一块屏幕。桌面端则承担抽象概念、文本处理、筛选等高效率操作，并与现有丰富的工作流结合。两端以眼动追踪信号作为注意力切换的标志，再用手势或键盘在不同输入方式间切换。我的研究问题起初聚焦在“眼动与手势如何在 cross-reality 交互中配合”。我深入阅读了该领域的文献，写了设计和需求文档准备动手实现。然而在一次会面里，Lynda 提醒我这更像一个工程项目，研究问题很浅显，我的大量时间其实将会花在编程上。于是我决定换一个课题，将这个问题留到未来（例如 PhD 中）有机会再探索。"
  p3: "我的新想法来自 DatAR 实际使用的一个痛点：密集物体遮挡下的选择。在脑部点云的可视化中，用户常常需要把手伸进点云中“捏”出所要的目标点。由于 HoloLens 2 的手部深度估计不可靠，系统很容易算错深度和遮挡关系。手在物体之后，但物体却被渲染到了手的前面，这种情况经常出现。这和现实世界的遮挡不符，认知上很别扭。失去遮挡这个视觉线索之后，感知深度变得异常困难，让选择也变得很费神费力。查阅文献时我发现，很多解决遮挡问题的方案仍然聚焦于控制器，而现在有不少设备已经支持纯手势输入，并支持眼动这一我认为很有前景的 input modality。于是我开始思考能否用“眼 + 手”提供一个无需控制器的方案。"
  p4: "有一个晚上，我找到了一个思路：把视线近似成一个带误差的锥形选择范围。我先盯住目标，再通过手势改变我的观测角度（或者说，将物体旋转一定角度），接着再凝视一次。两次“视线锥体”的交集会大幅压缩候选区域的体积，最后我再通过手势进行细化选择，或是将候选区域内的物体重新排列后再做选择。我据此去翻阅文献，在泛读了六七十篇文献之后，我发现了一个与此思路高度相似的研究。考虑到硕士毕业以及未来发表会议论文的需求，我需要在此基础上进行创新。"
  p5: "读文献期间，Smooth pursuit 方法让我觉得很妙，其充分利用了人眼生理特性的优势。在变换观察角度的过程中，眼睛会自然跟随目标移动，我们恰好可以对比这条追随轨迹和物体的移动轨迹来缩小候选范围。遮挡不太严重的时候，做一次旋转并利用这条追随信息，往往就能在不做细化的前提下直接选中目标。交互流程很直接：用一个手势触发旋转，凝视目标并跟随，即可完成选择。为了验证这个想法，我在 HoloLens 2 上花了一周做了一个三维版本的 demo。然后我又开始思考：二维 GUI 在 MR 中仍会长期存在，因为 1. 人们已经高度熟悉二维 GUI，在很多场景（例如播放音乐等）下会愿意继续使用它们，即便是在 MR 中。2. 对于抽象信息的处理，二维界面已经足够高效。我决定使用放大作为 Smooth pursuit 的触发方式，并在 HoloLens 2 中也做了一个 demo。"
  p6: "测试之后，我发现“放大触发的平滑追随”有很大的潜力。它不仅能从一群对象里选出目标，还有机会应用于通用 GUI。我很快意识到其中的价值：当前几乎所有的 Smooth Pursuit 方法都需要定制界面或者变更 GUI，因此很难直接应用于无障碍等场景，因为我们无权改动大部分应用的 GUI。而放大是一项系统级的 API，因此这项技术有潜力应用于所有 GUI，同时保留 Smooth pursuit 的所有优势，可能给无障碍等场景带来很多新的可能性。我甚至可以开发成一个工具，在日常中使用。出于兴趣，我买了消费级眼动仪 Tobii Eye Tracker 5，并利用周末的闲暇时间做了技术调研，发现在 Windows 桌面端我的设想完全可以实现。由于导师的 HoloLens 2 作为组内的公共设备需要轮流使用，我难以长期占用它来做毕设，于是我决定把课题转到桌面端，使用眼动仪。我想，在桌面端验证之后，其实迁移回 MR 场景也相对容易。"
  p7: "但是，尽管我认为“放大触发的追随”在无障碍方向有很大潜力，在硕士毕设的周期和伦理限制内，难以将这条研究线做得深入完整（例如被试招募就会很困难），因此我把它先作为一种新型交互方式来验证。这其实也是我踏上这条路的开端：2019 年，我在南京大学的人机交互暑期学校听了很多讲座，记得清华大学喻纯教授的几项 CHI 工作让我印象深刻。我第一次强烈地感到，计算机的科研工作可以这么有趣：很多看起来像“灵机一动”的点子，最终能变成真正有用的交互设计。而且我感觉，我非常擅长这个，我总有很多新颖的交互设计想法，或许我很适合这条道路。这在我心里埋下了种子，促使我在工作两年后辞职，申请了 HCI 方向的硕士项目。如今，这个交互设计的毕设为我的硕士生涯画上了一个句号。三年之前的我会猜测到最后做了这样一个东西吗？三年之后我又在做什么呢？"
  p8: "以上，就是我最终完成这个毕业设计背后的一些随想。感谢阅读。"
</i18n>

<style scoped lang="stylus">
.thesis-page
  max-width: 910px
  margin 32px auto 64px
  padding: 0 var(--page-padding)

.hero-section
  display: grid
  align-items: center
  padding: 0 0 32px 0

.heading
  margin-bottom: 16px

.project-meta
  color: var(--text-color-secondary)
  margin: 16px 0 32px

.abstract-block
  margin-bottom: 32px

.actions
  display: grid
  grid-template-columns: auto 1fr
  align-items: center
  gap: 16px

.download-button
  padding: 12px 24px
  background-color: var(--accent-color)
  color: white
  border-radius: 4px
  font-weight: 600
  transition: all 0.2s ease

  &:hover
    filter: brightness(1.1)
    transform: translateY(-2px)

.scroll-prompt
  margin-top: 48px
  display: flex
  align-items: center
  justify-content: center
  color: var(--text-color-secondary)
  font-size: 14px

.arrow-down
  margin-left: 12px
  position: relative
  top: -2px
  width: 6px
  height: 6px
  border: solid var(--text-color-secondary)
  border-width: 0 2px 2px 0
  transform: rotate(45deg)

.section-subtitle
  margin: 4px 0 16px 0
  font-weight: 600
  font-size: 18px
</style> 