# Index Page Implementation Plan

We will implement a scroll-triggered chat interface on the index page of the website app. This involves creating a reusable `ChatBubble` component, setting up the layout with a sticky container, and using GSAP for scroll-driven animations. We will also incorporate the background style from the web app.

## 1. Setup Styles & Theme
- [ ] Update `apps/website/src/styles/global.css`:
    - Add CSS variables for chat colors (`--c-chat-system`, `--c-chat-user`, `--c-chat-border`, etc.) compatible with light/dark modes.
    - Add the gradient background style to `body` (or a specific wrapper) to match the `@web` folder's style.
    - Ensure Tailwind configuration supports these colors (either via CSS variables or theme extension).

## 2. Create Components
- [ ] Create `apps/website/src/components/index/ChatBubble.tsx`:
    - A functional component accepting `type` ('system' | 'user') and `children`.
    - Apply pill-shaped styling (`rounded-full` or large radius) and colors based on `type`.
    - Use the styles from `apps/web/src/components/ui/chat-bubble.vue` as a reference.
- [ ] Create `apps/website/src/components/index/ChatSection.tsx`:
    - A component to handle the scroll layout and animation logic.
    - Structure:
        - Outer container with sufficient height to allow scrolling (e.g., `300vh`).
        - Inner sticky container (`sticky top-0 h-screen`) to keep content centered.
        - `ChatContainer` to hold the bubbles.
    - Animation:
        - Use `gsap` and `ScrollTrigger` to animate bubbles in as the user scrolls.
        - Implement the logic: "When scrolling past a trigger line, pop up the bubble and push existing bubbles up."

## 3. Update Content & Types
- [ ] Update `apps/website/src/i18n/pages/index/types.ts`:
    - Add `chat` field to `IndexPageCopy` to hold the messages.
- [ ] Update `apps/website/src/i18n/pages/index/zh.ts` (and create/update `en.ts`):
    - Add the specific messages:
        1. "嗨！"
        2. "这是我动态的简历 + 作品集，持续向下滚动/滑动查看吧"
        3. Link: "(如果你想查看一份静态的简历快速了解我，请点击这里)"

## 4. Integrate into Index Page
- [ ] Update `apps/website/src/components/index/IndexPage.tsx`:
    - Replace the current content with `ChatSection`.
    - Pass the messages from the i18n data.

## 5. Refinement
- [ ] Ensure responsiveness and centering.
- [ ] Verify the background appearance.
- [ ] Verify the animation smoothness.
