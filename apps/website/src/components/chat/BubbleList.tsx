import { forwardRef, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChatBubble from './ChatBubble';
import type { ChatMessage } from './types';

gsap.registerPlugin(ScrollTrigger);

interface BubbleListProps {
  messages: ChatMessage[];
  triggerRef: React.RefObject<HTMLDivElement>; // The element that drives the scroll (the pinned wrapper)
  scrollDistance?: number;
  className?: string;
}

const BubbleList = forwardRef<HTMLDivElement, BubbleListProps>(({ 
  messages, 
  triggerRef,
  scrollDistance = 1000,
  className 
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Merge refs if needed
  const setRefs = (element: HTMLDivElement | null) => {
      containerRef.current = element;
      if (typeof ref === 'function') {
          ref(element);
      } else if (ref) {
          ref.current = element;
      }
  };

  useGSAP(() => {
    if (!triggerRef.current) return;

    const q = gsap.utils.selector(containerRef);
    const bubbles = q('.chat-message-wrapper');

    // Reset styles initially
    gsap.set(bubbles, { 
        height: 0, 
        opacity: 0, 
        scale: 0.8,
        transformOrigin: "bottom right",
        overflow: 'hidden',
        marginBottom: 0
    });

    // Create a master timeline linked to the scroll trigger
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 0.5, // Smooth scrubbing
            // markers: true, // Debug
        }
    });

    // Add animations for each bubble
    bubbles.forEach((bubble, i) => {
        // Calculate the relative start time for this bubble
        // We want them to overlap slightly or just appear sequentially
        // The entire timeline spans the scroll distance.
        // If we have N bubbles, each takes 1/N of the time.
        
        tl.to(bubble, {
            height: "auto",
            marginBottom: 16, // 1rem
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out"
        }, i * 0.8); // Slight overlap
    });

  }, { 
    dependencies: [messages.length, triggerRef, scrollDistance], 
    scope: containerRef 
  });

  return (
    <div 
        ref={setRefs} 
        className={`flex flex-col justify-end p-4 min-h-[300px] w-full max-w-md ${className}`}
    >
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className="chat-message-wrapper w-full"
        >
          <ChatBubble 
            message={msg} 
            // We can remove 'dimmed' logic for now or re-implement it with GSAP
            // For now, let's keep it simple: fully visible when scrolled to.
            dimmed={false}
          />
        </div>
      ))}
    </div>
  );
});

export default BubbleList;
