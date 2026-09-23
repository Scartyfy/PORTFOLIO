import React, { useRef, useEffect, FC, ReactNode, useState } from "react";
import gsap from "gsap";
import { vec2 } from "vecteur";
type Vec2 = ReturnType<typeof vec2>;

interface MagneticCursorProps {
  children: ReactNode;
  magneticFactor?: number;
  lerpAmount?: number;
  hoverPadding?: number;
  hoverAttribute?: string;
  cursorSize?: number;
  cursorColor?: string;
  blendMode?: "difference" | "exclusion" | "normal" | "screen" | "overlay";
  cursorClassName?: string;
  shape?: "circle" | "square" | "rounded-square";
  disableOnTouch?: boolean;
  speedMultiplier?: number;
  maxScaleX?: number;
  maxScaleY?: number;
  /**
   * Boosts background contrast before blending.
   * Higher values (1.5 - 2.0) fix visibility on low-contrast/dim backgrounds.
   * Default: 1.5 (150%)
   */
  contrastBoost?: number;
}

interface CursorState {
  el: HTMLDivElement | null;
  pos: {
    current: Vec2;
    target: Vec2;
    previous: Vec2;
  };
  hover: { isHovered: boolean };
  isDetaching: boolean;
  currentColor: string;
}

export const MagneticCursor: FC<MagneticCursorProps> = ({
  children,
  lerpAmount = 0.1,
  magneticFactor = 0.2,
  hoverPadding = 12,
  hoverAttribute = "data-magnetic",
  cursorSize = 24,
  cursorColor = "white", // Pure white works best for exclusion/difference
  blendMode = "exclusion", // Exclusion is safer than difference for text
  cursorClassName = "",
  shape = "circle",
  disableOnTouch = true,
  speedMultiplier = 0.02,
  maxScaleX = 1,
  maxScaleY = 0.3,
  contrastBoost = 1.5, // 1.5x contrast boost by default
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorStateRef = useRef<CursorState | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const configRef = useRef({
    magneticFactor,
    speedMultiplier,
    maxScaleX,
    maxScaleY,
    cursorSize,
    lerpAmount,
    hoverPadding,
  });

  useEffect(() => {
    configRef.current = {
      magneticFactor,
      speedMultiplier,
      maxScaleX,
      maxScaleY,
      cursorSize,
      lerpAmount,
      hoverPadding,
    };
  }, [
    magneticFactor,
    speedMultiplier,
    maxScaleX,
    maxScaleY,
    cursorSize,
    lerpAmount,
    hoverPadding,
  ]);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (disableOnTouch && isTouchDevice) return;
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    gsap.set(cursorEl, { xPercent: -50, yPercent: -50 });

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const detachDuration = prefersReducedMotion ? 0.1 : 0.35;

    if (!cursorStateRef.current) {
      cursorStateRef.current = {
        el: cursorEl,
        pos: {
          current: vec2(-100, -100),
          target: vec2(-100, -100),
          previous: vec2(-100, -100),
        },
        hover: { isHovered: false },
        isDetaching: false,
        currentColor: cursorColor,
      };
    }

    const update = () => {
      const state = cursorStateRef.current;
      if (!state || state.hover.isHovered) return;

      const { speedMultiplier, maxScaleX, maxScaleY, lerpAmount } =
        configRef.current;
      const effectiveLerp = prefersReducedMotion ? 1 : lerpAmount;

      state.pos.current.lerp(state.pos.target, effectiveLerp);
      const delta = state.pos.current.clone().sub(state.pos.previous);
      state.pos.previous.copy(state.pos.current);

      if (state.isDetaching) {
        gsap.set(state.el, {
          x: state.pos.current.x,
          y: state.pos.current.y,
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
          overwrite: "auto",
        });
      } else {
        const speed =
          Math.sqrt(delta.x * delta.x + delta.y * delta.y) * speedMultiplier;
        gsap.set(state.el, {
          x: state.pos.current.x,
          y: state.pos.current.y,
          rotate: Math.atan2(delta.y, delta.x) * (180 / Math.PI),
          scaleX: 1 + Math.min(speed, maxScaleX),
          scaleY: 1 - Math.min(speed, maxScaleY),
          overwrite: "auto",
        });
      }
    };

    const initializePosition = (event: MouseEvent) => {
      const state = cursorStateRef.current;
      if (!state) return;
      const x = event.clientX;
      const y = event.clientY;
      state.pos.current.x = x;
      state.pos.current.y = y;
      state.pos.target.x = x;
      state.pos.target.y = y;
      state.pos.previous.x = x;
      state.pos.previous.y = y;
      gsap.set(cursorEl, { x, y, opacity: 1 });
    };

    const onMouseMove = (event: PointerEvent) => {
      const state = cursorStateRef.current;
      if (!state) return;

      state.pos.target.x = event.clientX;
      state.pos.target.y = event.clientY;

      const isInViewport =
        event.clientX >= 0 &&
        event.clientX <= window.innerWidth &&
        event.clientY >= 0 &&
        event.clientY <= window.innerHeight;

      const target = event.target as HTMLElement;
      const isTextContent =
        ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6"].includes(
          target.tagName,
        ) || window.getComputedStyle(target).cursor === "text";

      let currentElement: HTMLElement | null = target;
      let newCursorColor = cursorColor;
      let shouldHide = false;
      while (
        currentElement &&
        currentElement !== document.body &&
        currentElement !== document.documentElement
      ) {
        if (currentElement.hasAttribute("data-cursor-hidden")) {
          shouldHide = true;
        }
        if (
          currentElement.classList.contains("bg-white") ||
          currentElement.style.backgroundColor === "rgb(255, 255, 255)"
        ) {
          newCursorColor = "#002FA7";
        } else if (
          currentElement.classList.contains("bg-[#002FA7]") ||
          currentElement.classList.contains("bg-[#002480]")
        ) {
          newCursorColor = "white";
        }
        currentElement = currentElement.parentElement;
      }
      state.currentColor = newCursorColor;

      if (shouldHide) {
        gsap.to(cursorEl, { opacity: 0, duration: 0.2, overwrite: "auto" });
        return; // skip the other animations
      } else {
        gsap.to(cursorEl, {
          opacity: isInViewport ? 1 : 0,
          duration: 0.2,
          overwrite: "auto",
        });
      }

      if (isTextContent && !state.hover.isHovered && !state.isDetaching) {
        gsap.to(cursorEl, {
          backgroundColor: newCursorColor,
          scaleX: 0.5,
          scaleY: 1.5,
          duration: 0.3,
          overwrite: "auto",
        });
      } else if (!state.hover.isHovered && !state.isDetaching) {
        gsap.to(cursorEl, {
          backgroundColor: newCursorColor,
          duration: 0.2,
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () =>
      gsap.to(cursorEl, { opacity: 0, duration: 0.3 });
    const handleMouseEnter = () =>
      gsap.to(cursorEl, { opacity: 1, duration: 0.3 });
    const handleClick = (event: MouseEvent) => {};

    gsap.ticker.add(update);
    window.addEventListener("pointermove", onMouseMove);
    window.addEventListener("pointermove", initializePosition, { once: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("click", handleClick);

    const cleanupFunctions: (() => void)[] = [];
    const attachedElements = new Set<HTMLElement>();

    const attachMagnetic = (el: HTMLElement) => {
      if (attachedElements.has(el)) return;
      attachedElements.add(el);

      const xTo = gsap.quickTo(el, "x", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
      const yTo = gsap.quickTo(el, "y", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });

      const handlePointerEnter = () => {
        const state = cursorStateRef.current;
        if (!state) return;
        const { magneticFactor, hoverPadding } = configRef.current;

        state.hover.isHovered = true;
        state.isDetaching = false;

        const bounds = el.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el);
        let targetBorderRadius = computedStyle.borderRadius;
        if (!targetBorderRadius || targetBorderRadius === "0px") {
          targetBorderRadius = "100px";
        }
        const magneticColor =
          el.getAttribute("data-magnetic-color") || cursorColor;
        const dynamicPadding = hoverPadding * (1 + magneticFactor);
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;

        gsap.killTweensOf(cursorEl);
        gsap.to(cursorEl, {
          x: centerX,
          y: centerY,
          width: bounds.width + dynamicPadding * 2,
          height: bounds.height + dynamicPadding * 2,
          borderRadius: targetBorderRadius,
          backgroundColor: "transparent",
          borderWidth: "2px",
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const handlePointerLeave = () => {
        xTo(0);
        yTo(0);
        const state = cursorStateRef.current;
        if (!state) return;
        const currentX = gsap.getProperty(cursorEl, "x") as number;
        const currentY = gsap.getProperty(cursorEl, "y") as number;

        state.pos.current.x = currentX;
        state.pos.current.y = currentY;
        state.pos.previous.x = currentX;
        state.pos.previous.y = currentY;

        state.hover.isHovered = false;
        state.isDetaching = true;

        const { cursorSize } = configRef.current;
        const shapeBorderRadius =
          shape === "circle" ? "50%" : shape === "square" ? "0" : "8px";

        gsap.killTweensOf(cursorEl);
        gsap.to(cursorEl, {
          width: cursorSize,
          height: cursorSize,
          borderRadius: shapeBorderRadius,
          backgroundColor: state.currentColor,
          borderWidth: "0px",
          scaleX: 1,
          scaleY: 1,
          duration: detachDuration,
          ease: "power3.out",
          overwrite: "auto",
          onComplete: () => {
            state.isDetaching = false;
          },
        });
      };

      let rafId: number | null = null;
      const handlePointerMove = (event: PointerEvent) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          if (!el.hasAttribute("data-magnetic-no-pull")) {
            const { clientX, clientY } = event;
            const { height, width, left, top } = el.getBoundingClientRect();
            const { magneticFactor } = configRef.current;
            xTo((clientX - (left + width / 2)) * magneticFactor);
            yTo((clientY - (top + height / 2)) * magneticFactor);
          }
          rafId = null;
        });
      };

      el.addEventListener("pointerenter", handlePointerEnter);
      el.addEventListener("pointerleave", handlePointerLeave);
      el.addEventListener("pointermove", handlePointerMove);

      cleanupFunctions.push(() => {
        el.removeEventListener("pointerenter", handlePointerEnter);
        el.removeEventListener("pointerleave", handlePointerLeave);
        el.removeEventListener("pointermove", handlePointerMove);
      });
    };

    // Initial attachment
    gsap.utils
      .toArray<HTMLElement>(`[${hoverAttribute}]`)
      .forEach(attachMagnetic);

    // Watch for dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as HTMLElement;
              if (el.hasAttribute(hoverAttribute)) {
                attachMagnetic(el);
              }
              const children = el.querySelectorAll(`[${hoverAttribute}]`);
              children.forEach((child) => attachMagnetic(child as HTMLElement));
            }
          });
        } else if (
          mutation.type === "attributes" &&
          mutation.attributeName === hoverAttribute
        ) {
          const el = mutation.target as HTMLElement;
          if (el.hasAttribute(hoverAttribute)) {
            attachMagnetic(el);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [hoverAttribute],
    });

    return () => {
      observer.disconnect();
      gsap.ticker.remove(update);
      window.removeEventListener("pointermove", onMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("click", handleClick);
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [
    disableOnTouch,
    isTouchDevice,
    hoverPadding,
    hoverAttribute,
    cursorColor,
    shape,
  ]);

  if (disableOnTouch && isTouchDevice) return <>{children}</>;

  const styles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    pointerEvents: "none",
    willChange: "transform, width, height, border-radius",
    backgroundColor: cursorColor,
    border: "0px solid white",
    boxSizing: "border-box",
    width: cursorSize,
    height: cursorSize,
    borderRadius: shape === "circle" ? "50%" : shape === "square" ? "0" : "8px",
    mixBlendMode: blendMode,
  };

  return (
    <>
      <div
        ref={cursorRef}
        className={`magnetic-cursor ${cursorClassName}`}
        style={styles}
      />
      {children}
    </>
  );
};
