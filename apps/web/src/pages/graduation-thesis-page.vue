<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import RichText from '../components/ui/rich-text.vue'
import { computed } from 'vue'

const { t, tm } = useI18n()
useHead({
  title: computed(() => t('pageTitle')),
  meta: [{ name: 'description', content: computed(() => t('pageDescription')) }],
})
const reflectionParagraphs = computed(() => {
  const reflections = tm('reflections')
  if (typeof reflections === 'object' && reflections !== null) {
    return Object.keys(reflections)
  }
  return []
})
</script>

<template>
  <div class="max-w-4xl mx-auto my-8 mb-16 px-page">
    <section class="grid items-center pb-4">
      <div class="hero-content">
        <h2 class="mb-4">
          <div>ZoomPursuit:</div>
          <div>Smooth Pursuit-based Gaze Interaction for General-Purpose GUIs</div>
        </h2>

        <div class="text-muted my-4 mb-8">
          {{ t('projectInfo.type') }} |
          {{ t('projectInfo.duration') }} |
          <span>{{ t('projectInfo.supervisorLabel') }} </span>
          <a href="https://homepages.cwi.nl/~lynda/" class="link" target="_blank"
            > Lynda Hardman</a
          >
        </div>
        <div class="card">
          <div class="mb-8">
          <h3 class="mt-4 mb-3 font-semibold text-lg">{{ t('abstractTitle') }}</h3>
          <p>{{ t('abstract.p1') }}</p>
          <p>{{ t('abstract.p2') }}</p>
          <p>{{ t('abstract.p3') }}</p>
        </div>

        <div class="grid grid-cols-[auto_1fr] items-center gap-4">
          <a
            href="/250805-Yangfan-MScThesis-ZoomPursuit-Submission.pdf"
            download="YangfanChen-MScThesis-ZoomPursuit.pdf"
            class="px-6 py-3 rounded-lg bg-primary text-white font-semibold transition hover:brightness-110 hover:-translate-y-0.5"
          >
            {{ t('downloadButton') }}
          </a>
          <a :href="t('githubUrl')" class="link" target="_blank">{{ t('viewRepo') }}</a>
        </div>
        </div>
      </div>
    </section>

    <section class="mt-8">
      <div class="card">
        <h3 class="mt-4 mb-3 font-semibold text-lg">{{ t('reflectionsTitle') }}</h3>
        <p v-for="pKey in reflectionParagraphs" :key="pKey">
          <rich-text :text="t(`reflections.${pKey}`)" />
        </p>
      </div>
    </section>
  </div>
</template>

<i18n lang="yaml" locale="en">
pageTitle: "ZoomPursuit: Smooth Pursuit Gaze Interaction - Yangfan Chen"
pageDescription: "MSc thesis: ZoomPursuit extends Smooth Pursuit gaze interaction to general-purpose GUIs using system-level magnification."
downloadButton: "Download Paper"
viewRepo: "View Repository on GitHub"
githubUrl: "https://github.com/chenyfz/GazeControl"
projectInfo:
  type: "Master's Graduation Thesis (Utrecht University)"
  duration: "Feb 2025 - Aug 2025"
  supervisorLabel: "Supervisor:"
abstractTitle: "Abstract"
abstract:
  p1: "Gaze interaction in general-purpose GUIs is limited by its inaccuracy and calibration requirements. Smooth pursuit-based methods offer a calibration-free alternative but often demand modified user interfaces. We present ZoomPursuit, a technique that adapts smooth pursuit for unmodified GUIs by repurposing system-level magnification functionality."
  p2: "A baseline evaluation (N=16) established that under simulated calibration drift, ZoomPursuit achieved the accuracy of a manual refinement method with the speed of a simpler automated zoom-based technique. However, the study also revealed a conflict between its imperceptible automation and users' sense of control. A follow-up study (N=7) resolved this with a two-stage model integrating automated correction with manual refinement. This design achieved a final pointing accuracy of 0.10° while dynamically calibrating on the fly from an uncalibrated state."
  p3: "This work details the design evolution of a pursuit-based interaction technique for general GUIs. The final design demonstrates a model that is both technically effective and preserves user agency."
reflectionsTitle: "Some Thoughts"
reflections:
  p1: "Note: I wrote this in Chinese and had Gemini translate it into English. A human (me :p) has proofread it."
  p2: "My thesis project began with my supervisor's [DatAR](https://www.projects.science.uu.nl/ics-datar/) project, which helps neuroscientists discover research opportunities by visualizing data from literature on brain regions and diseases. I joined the project for a simple reason: I wanted to work with the HoloLens 2 for my graduation project. Released in 2019, the headset impressed me, sparking many ideas for mixed-reality interactions that I had imagined over the years and could finally implement."
  p3: "My initial idea was to extend DatAR from a standalone AR system into a cross-device, cross-reality system. Since the DatAR system and the HoloLens 2 ecosystem were not yet mature, they couldn't provide the sophisticated workflows neuroscientists were accustomed to on desktops. Traditional keyboard and mouse were still better for text processing and precision tasks. Therefore, integrating AR into the existing workflow as an extension seemed an effective way to improve productivity. In this concept, gaze was the key: it would naturally indicate the user's focus, allowing the system to coordinate input switching between hand gestures in AR and keyboard/mouse on the desktop. The goal was to leverage each device's strengths for suitable tasks, creating a seamless exchange of information between them."
  p4: "However, my supervisor, Lynda, pointed out that this approach resembled an engineering project, where I would spend most of my time refactoring the DatAR codebase. She encouraged me to step outside the DatAR context and explore other topics. So, I returned to reading literature broadly for new ideas—a process I enjoy."
  p5: "My next idea addressed a key design challenge in DatAR: selection under heavy occlusion. To select a target from a dense, overlapping cluster of virtual objects, users had to reach in and 'pinch' it. The problem was that the HoloLens 2's hand-depth estimation was often unreliable. It would frequently misjudge the Z-order of the real hand and virtual objects, resulting in rendering that contradicted the user's perception. The confusing visuals and lack of tactile feedback made depth perception difficult, and thus, simple selections became time-consuming and frustrating. My literature review showed that virtually all existing solutions still relied on the classic paradigm of physical controllers. Yet, new devices increasingly supported controller-free gesture and gaze input. Having read extensively on Gaze Interaction, I was interested in the field and wanted to design a highly usable selection method for occluded environments by combining eye and hand input."
  p6: "I thought of a two-step selection technique: a user first gazes at a target, triggers a perspective shift (e.g., object rotation or camera orbit), and then gazes at it again. The intersection of the two gaze cones would significantly reduce potential targets, allowing for fine-grained selection by hand gesture from a much smaller set of potential targets. After some initial thought, however, I realized this method offered no clear advantage over existing techniques (like using two controllers to cast intersecting rays) and was unsuitable for XR scenarios with real-world objects, as it required object rotation. I continued surveying the literature, searching for a new direction that would give this approach an advantage in certain contexts."
  p7: "The breakthrough came from my reading on the Smooth Pursuit method, which cleverly uses the eye's natural ability to track moving objects. By comparing an object's motion trajectory with the user's gaze trajectory, the system can determine the target. This gave me an idea for the occlusion problem: during a perspective shift, the user's eye would naturally follow their target. The system could match the pursuit trajectory to the object's motion path to identify the selection. In scenarios with moderate occlusion, the interaction becomes direct: trigger a motion, follow the target with your eyes, and the selection is made. It requires no secondary confirmation and is more robust against eye-tracking inaccuracies. I built a 3D demo on the HoloLens 2 to validate the concept, and it worked well. But a practical question still lingered: in what specific scenario would this method have a distinct advantage?"
  p8: "While exploring application scenarios, I began considering 2D interfaces. I reasoned that efficient, user-friendly 2D GUIs would remain a vital part of the future MR experience (a music player, for instance, is unlikely to use a complex 3D interface). I began to consider how Smooth Pursuit could be applied in new ways to 2D GUIs. Since rotation is not a suitable stimulus in 2D, I chose magnification as the motion trigger. After building and testing another demo on the HoloLens 2, I found potential in this 'magnification-triggered smooth pursuit'. It could reliably select a target from a group without calibration. More importantly, with a slight shift in thinking, I realized that magnification applies motion to *all* pixels on the screen. Trajectory matching could, in theory, apply to any pixel, not just a finite set of known objects. This realization was a turning point. Existing Smooth Pursuit techniques lack universality because they require perceiving and modifying GUI content, a difficult task given the diversity of GUI frameworks and binary-distributed applications. This limitation has largely confined the technology to laboratory settings with custom interfaces. My approach, using magnification as a system-level API to create motion, avoids this problem. Its key feature is its ability to bring the benefits of Smooth Pursuit—calibration-free operation, high robustness to drift, and on-the-fly dynamic calibration—to any GUI, opening new possibilities for accessibility."
  p9: "Out of personal interest in creating mouse-alternative tools for Windows, I purchased a commercial eye tracker (the Tobii Eye Tracker 5). A technical exploration confirmed my idea was feasible on a standard desktop. My supervisor's HoloLens 2 was a shared resource, making long-term development difficult. Moreover, the technique's accessibility advantages were more impactful in a desktop context. Therefore, I decided to shift my project's focus to the desktop, using an eye tracker instead of an MR headset. I liked the idea that my design might one day benefit the accessibility community."
  p10: "I then defined the principles of the ZoomPursuit technique, implemented a prototype, and began to explore its potential from an accessibility perspective. However, HCI research in accessibility is challenging, particularly under the timeline and ethical constraints of a Master's thesis (participant recruitment, for instance, is a significant hurdle). A superficial study would not be meaningful. Therefore, I decided to frame and validate ZoomPursuit as a novel interaction technique for a general audience. This work ultimately became my Master's thesis. Unfortunately, its potential in the accessibility field could not be fully explored."
  p11: "In 2019, at the suggestion of a professor, Guihuan Feng, I volunteered at the Human-Computer Interaction Summer School at Nanjing University. This gave me the chance to attend many academic talks. The lectures were eye-opening and left a strong impression on me. Hearing Professor Chun Yu present his work on projects like EarTouch, I felt for the first time how interesting research in computer science could be. It was a world where ideas that seem like 'a flash of inspiration' could be forged into real designs that might change the lives of thousands. As someone who has always followed consumer electronics and often has new ideas, I began to feel the HCI field could be a good fit for me. At the time, however, I had already accepted a job offer from WeChat, and I thought my academic journey was over. But now, with this thesis, I bring my HCI Master's program to a close, and once again, I am thinking about what's next. Six years ago, could the student attending those lectures have imagined I'd be here, writing these reflections in bed? And now I find myself contemplating the future: where will I be, and what will I be doing, six years from now?"
  p12: "Thanks for reading!"
</i18n>

<i18n lang="yaml" locale="zh">
pageTitle: "ZoomPursuit: 面向通用GUI的平滑追视眼动交互 - 陈扬帆"
pageDescription: "硕士毕业论文：ZoomPursuit利用系统级放大功能将Smooth Pursuit眼动交互扩展至通用GUI。"
downloadButton: "下载论文"
viewRepo: "在 GitHub 上查看代码库"
githubUrl: "https://github.com/chenyfz/GazeControl"
projectInfo:
  type: "硕士毕业设计 (Utrecht University)"
  duration: "2025年2月 - 2025年7月"
  supervisorLabel: "导师："
abstractTitle: "摘要（中文版仅供参考，由 Gemini 直接翻译）"
abstract:
  p1: "眼动交互在通用图形用户界面（GUI）中的应用，因其固有的不精确性及对硬件校准的依赖而受限。基于平滑追视（Smooth Pursuit）的交互方法提供了一种免校准的替代方案，但通常要求修改用户界面。我们为此提出了ZoomPursuit：一种通过复用操作系统级的放大镜功能，将平滑追视交互扩展至任意GUI的方法。"
  p2: "初步评估（N=16）表明，在模拟校准漂移时，ZoomPursuit的准确性媲美手动微调，速度则接近自动缩放。然而，研究也揭示了其“隐式”自动修正与用户控制感之间的冲突。为此，我们开展了第二轮研究（N=7），并设计出一个整合自动校正与手动微调的两阶段模型。最终，该设计在无初始校准的情况下，实现了0.10°的指向精度，并在交互过程中动态校准眼动追踪。"
  p3: "本研究详细阐述了一种面向通用GUI的平滑追视交互技术的设计演化。最终的设计验证了一个既能保证技术效率，又能保留用户能动性的交互模型。"
reflectionsTitle: "一些随想"
reflections:
  p1: "我的毕业设计始于导师的 [DatAR](https://www.projects.science.uu.nl/ics-datar/) 项目。这个项目通过在 HoloLens 2 中可视化脑区与脑疾病的研究文献数据，来帮助神经科学家发现新的研究机会。我参与这个项目的原因其实很简单：我想用 HoloLens 2 做毕业设计。这款 2019 年发布的头显在当年给我留下了深刻的印象，曾让我断断续续脑洞好多混合现实交互的想法，终于有机会动手实现了。"
  p2: "我的初始想法是把 DatAR 从一个 AR 系统扩展成一个跨设备、跨现实的 cross-reality 系统。当时我的思考是：鉴于 DatAR 系统和 HoloLens 2 的软件生态尚不完善，无法提供神经科学家在桌面端已有的成熟工作流，同时在文本处理、精细操作等方面也仍不及传统键鼠，那么将它融入现有工作流，使其成为桌面工作流的延伸，或许是提升效率的一个有效途径。在这个设想中，眼动信号是关键：它能自然地标定用户当前的注意力焦点，系统便可以此为依据，协调手势和键鼠在不同设备间的操作切换，从而实现流畅的跨现实交互，进而能够充分利用各种设备和 reality 所擅长的任务，让信息在其中畅通地流转。"
  p3: "然而，我的导师 Lynda 表示，在这个工作中，我的大部分时间都将耗费在重构现有的 DatAR 代码中，更像是一个工程项目。她鼓励我跳出 DatAR 项目的背景，继续探索可能的课题。于是我又开始发散地读文献寻找新想法（其实我还挺享受漫无目的读文献的过程的）。"
  p4: "我的新想法来自 DatAR 使用中的一个痛点：重度遮挡条件下的选择问题。在密集、互相遮挡的实体间进行选择时，DatAR 要求用户把手伸进去把目标“捏”出来。问题在于，HoloLens 2 的手部深度估计算法时常出错，会错误判断现实的手与虚拟物体的前后位置，进而渲染出与用户感官相悖的遮挡关系。触觉反馈的缺失和视觉反馈的混乱使得深度感知变得困难，最终让简单的选择任务也费时费力。查阅文献时我发现，当前有很多解决方案，但大多仍然基于物理控制器的经典控制范式。与此同时，很多新设备已经支持纯手势和眼动输入。在当时，我阅读了许多 Gaze Interaction 的文献，对这个领域很感兴趣。我于是思考如何用“眼+手”结合的方式提供一个高可用性的重度遮挡下选择的方案。"
  p5: "我构思了两步选择的方案：用户先看向目标，然后触发一次观测视角变化（例如，物体旋转或者观测角度旋转），然后再次看向目标。两次凝思形成的“视线锥体”互相剔除了大量无关的物体，后续通过手势即可在一个小的集合中进行细化选择。初步思考之后，我觉得这个方案相比于现有方案（例如，使用两个手柄发出两条相交射线来定位）并没有明显优势，且要求物体旋转，其实不适用于 XR 中与现实物体交互。我顺着这个思路继续泛读文献，试图找到一个让其在某些场景有超越其他方案的可用性的突破点。"
  p6: "我在文献中读了很多 Smooth pursuit 方法的研究：这个方法巧妙地利用了人眼能够轻松追踪运动物体的生理特性，通过对比物体运动轨迹和凝视位置的轨迹来进行选择。我因此想到：在变换观察角度的过程中，眼睛会自然跟随目标移动，系统恰好可以对比这条追随轨迹和物体的移动轨迹来识别目标。在遮挡不严重时，交互流程将非常直接：触发观测角度变化，凝视目标并跟随，即可完成精确的选择。不需要进行二次确认，且对眼动追踪误差更鲁棒。为了验证这个想法，我在 HoloLens 2 上构建了一个三维版本的 demo，效果不错，但是其实用性的问题仍然困扰我：这个方法到底在什么情景下会优于现有的各种方案呢？"
  p7: "在探索适用场景时，我也开始思考二维界面的可能性。我想到，高效、易用的二维界面在未来的 MR 环境中仍会是重要组成部分（例如，音乐播放功能很大概率不会用三维 GUI 承载）。因此我顺着 Smooth pursuit 的思路思考其在二维界面上的使用能否有所创新。在二维界面中，旋转已经不合适作为动态刺激，因此我选择使用放大来触发用户的 smooth pursuit，在 HoloLens 2 中写出 demo 并测试之后，我发现“放大触发的平滑追随”有其潜力：首先，它确实能在无校准的情况下从一群对象里选出目标，更重要的是：稍微转变思路，放大对平面所有的像素点都施加了运动，理论上运动轨迹的对比可以不限制于有限数量的物体，可以用于屏幕所有的像素点，因而有机会应用于所有通用的二维 GUI（最终计算原理请参考论文 Section 3）。对比之下，现有的 Smooth Pursuit 方法之所以缺乏通用性，其根源在于需要感知并修改 GUI 内容，而当前的 GUI 技术五花八门，且应用大多以二进制文件分发，其界面元素的感知与修改通常会很困难。这一问题导致了现有 Smooth Pursuit 方法几乎都依赖于为特定任务定制或修改 GUI，也解释了为何该技术始终主要停留在实验室环境中。在我的方案中，放大是一项系统级的 API，不需要修改具体的 GUI 即可创造动态刺激。因此，这项技术突出的亮点在于，其有潜力应用于所有通用的 GUI，这可能给无障碍使用场景带来很多 Smooth Pursuit 的益处，例如免校准即可使用、对错误和漂移的高鲁棒性、以及动态校准等。"
  p8: "出于兴趣，我希望在 Windows 下为自己制作一些替代鼠标的小工具，于是购买了消费级眼动仪 Tobii Eye Tracker 5。我在闲暇时间做了技术调研，发现在 Windows 桌面端我的设想技术上可以实现。由于导师的 HoloLens 2 作为组内的公共设备需要轮流使用，我很难长期占用它来做毕设，而且如果我想发挥其在无障碍领域的优势，桌面端将比 XR 端更合适：当前 XR 的无障碍实践仍然不是很成熟，相比之下很多人正通过 TD-Control 等软件，完全使用眼睛在重度使用桌面计算机。于是我决定干脆将整个项目转到桌面端，使用眼动仪而非混合现实头显来实现眼控交互，当时的我想，万一我的设计真的能够造福无障碍群体，那可就太好了。"
  p9: "接下来我仔细梳理了后面被我称为 ZoomPursuit 方法的原理（详见论文）并实现了其算法原型，准备以无障碍领域为出发点评估这个系统。但是，在硕士毕设的紧张的时间周期和伦理限制内，无障碍相关的 HCI 研究难度很高（例如被试招募就会很困难）且很难做得深入。因此，我最终决定将 ZoomPursuit 定位为一种新型交互方式来设计实验并进行验证。这项工作最终构成了我的硕士毕业论文。很可惜其在无障碍领域的应用潜力无法被充分挖掘。"
  p10: "2019年，冯桂焕老师建议我参加南京大学的人机交互暑期学校当志愿者，我因此有机会旁听了许多 HCI 的学术讲座。许多讲座让我耳目一新，印象深刻。比如当时喻纯老师关于 EarTouch 等工作的分享让我强烈地感受到，计算机领域的科研可以如此有趣：很多看起来像“灵机一动”的点子，在这个领域能不断演化，有机会改变成千上万用户的生活。我一直很关注消费电子领域，了解各种产品、总会冒出各种新奇的想法，那个时候我隐约觉得或许我会很适合 HCI 这个领域。不过在当时，我已经接受了微信的工作 offer，本以为无缘继续学术的道路。但此刻，我用这个毕业设计为我的 HCI 硕士项目画上了句号，又到了思考下一步想要做什么的时候。六年之前，旁听讲座的我会想到六年后的我正在被窝里写这些感想吗？此刻我又遐想，六年之后的我在何处、做什么呢？"
  p11: "以上，就是我最终完成这个毕业设计背后的一些随想。感谢阅读。"
</i18n>
