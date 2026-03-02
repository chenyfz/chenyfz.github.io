import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BubbleList from '../chat/BubbleList';
import type { ChatMessage } from '../chat/types';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  messages: ChatMessage[];
  shouldRetract?: boolean;
}

export default function HeroSection({ messages }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Calculate scroll distance
  const scrollPerBubble = 300; // Increased slightly for better pacing
  const scrollDistance = messages.length * scrollPerBubble; 

  useGSAP(() => {
    // We only need the pin here. The animation logic is in BubbleList.
    // However, BubbleList needs to know when to scrub.
    // We are passing wrapperRef to BubbleList so it can attach its ScrollTrigger to it.
    
    // BUT, we also need to pin the wrapper here.
    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: true,
      anticipatePin: 1,
      // markers: true
    });

  }, { scope: containerRef, dependencies: [messages.length, scrollDistance] });

  return (
    <div ref={containerRef}>
        {/* Wrapper to be pinned */}
        <div ref={wrapperRef} className="relative h-screen w-full overflow-hidden bg-gradient-dynamic">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 h-full w-full px-4 items-center">
                {/* Left Side - Placeholder */}
                <div className="hidden md:flex flex-col items-start justify-center text-[var(--app-fg)] p-8">
                <h1 className="text-5xl font-bold mb-6">Hello, World!</h1>
                <p className="text-xl opacity-80">Welcome to my digital garden.</p>
                </div>

                {/* Right Side - Chat Interface */}
                <div className="flex flex-col items-center md:items-end justify-center h-full w-full">
                <BubbleList 
                  messages={messages} 
                  triggerRef={wrapperRef}
                  scrollDistance={scrollDistance}
                />
                </div>
            </div>
        </div>
    </div>
  );
}
