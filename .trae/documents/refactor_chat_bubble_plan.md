# Refactor ChatBubble and BubbleList for iMessage-like Effect

The goal is to refactor the `ChatBubble` and `BubbleList` components to simulate an iMessage-like effect where new messages appear at the bottom and smoothly push older messages upwards. We will use GSAP's `Flip` plugin for the layout animations, which is the most robust way to handle this in React.

## Analysis
- **Current State**: `ChatBubble` contains complex internal GSAP logic for entry/exit animations (animating `height`, `margin`, `opacity`). This causes jerky layout shifts and is hard to coordinate.
- **Desired State**: `ChatBubble` should be a simple presentational component. `BubbleList` should orchestrate the layout animations using `Flip`.
- **Technique**: Use `gsap.Flip` to capture the state of the list before updates and animate to the new state after updates.

## Plan

1.  **Refactor `ChatBubble.tsx`**
    -   Remove all `useGSAP` animation logic (entry, exit, height animation).
    -   Remove `containerRef` and `contentRef` logic related to animation.
    -   Implement `dimmed` state using simple CSS classes and transitions (`opacity`, `filter`).
    -   Ensure the root element has a class `chat-bubble` for `Flip` targeting.
    -   Simplify the component to just render the message content with appropriate styles.

2.  **Refactor `BubbleList.tsx`**
    -   Import `Flip` from `gsap/Flip` and register it.
    -   Remove manual mapping logic that relies on `ChatBubble`'s internal state.
    -   Implement `useGSAP` (or `useLayoutEffect`) to handle the `Flip` animation cycle:
        -   Maintain a `lastState` ref.
        -   On `messages` or `visibleCount` change:
            -   Check if `lastState` exists.
            -   If yes, run `Flip.from(lastState, { ... })`.
            -   Configure `Flip` with `absolute: true` (if needed for smoother row animations) or just standard flow.
            -   Add `onEnter` animation for the new bubble (scale up + fade in).
            -   Capture the new state into `lastState` for the next update.
    -   Ensure the container uses `flex-col` and `justify-end` so natural layout places new items at the bottom.

3.  **Verify `HeroSection.tsx`**
    -   Ensure it passes the correct props to `BubbleList`.
    -   (No major changes expected here, as it primarily drives the data/state).

## Implementation Details
-   **Dependencies**: `gsap`, `@gsap/react`.
-   **Files**: 
    -   `apps/website/src/components/chat/ChatBubble.tsx`
    -   `apps/website/src/components/chat/BubbleList.tsx`

## Step-by-Step

1.  Modify `apps/website/src/components/chat/ChatBubble.tsx` to strip animations.
2.  Modify `apps/website/src/components/chat/BubbleList.tsx` to add `Flip` logic.
3.  Test the interaction (via `npm run dev` in the terminal).
