import { motion } from "motion/react";

export function AnimatedSpade({ isWrongCard }: { isWrongCard: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10" style={{ perspective: "1500px" }}>
      <motion.div
        className="relative flex flex-col items-center justify-center"
        initial="heart"
        animate={isWrongCard ? "heart" : "spade"}
        variants={{
          heart: {
            scale: 1,
            z: 0,
            rotateZ: 0,
            rotateY: 0,
            color: "#ef4444",
            filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))"
          },
          spade: {
            scale: [1, 1.8, 1.8, 1], // Advance, Hold/Turn, Retreat
            z: [0, 100, 100, 0], // Move forward
            rotateZ: [0, 0, -180, -180], // Flip upside down
            rotateY: [0, 0, 180, 180], // Half 3D Spin without U-turn
            color: ["#ef4444", "#ef4444", "#002FA7", "#002FA7"],
            filter: [
              "drop-shadow(0px 0px 0px rgba(0,0,0,0))", 
              "drop-shadow(0px 20px 30px rgba(0,0,0,0.3))", 
              "drop-shadow(0px 20px 30px rgba(0,0,0,0.3))",
              "drop-shadow(0px 0px 0px rgba(0,0,0,0))"
            ],
            transition: { 
              duration: 2.2, 
              times: [0, 0.35, 0.7, 1], // Smooth pacing
              ease: "easeInOut" 
            }
          }
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* The Stem */}
        <motion.div
          className="absolute w-full flex justify-center origin-bottom"
          style={{ top: "2%", zIndex: -1 }}
          variants={{
            heart: { opacity: 0, scale: 0, y: 10 },
            spade: { 
              opacity: [0, 0, 1, 1], 
              scale: [0, 0, 1.05, 1.05],
              y: [10, 10, 2, 2], // Pushed down slightly to embed deep and stick to the heart
              transition: { duration: 2.2, times: [0, 0.5, 0.75, 1], ease: "backOut" } 
            }
          }}
        >
          <div className="transform-style-3d">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="currentColor" className="w-[28px] md:w-[38px] translate-y-1">
               <path d="M16 24 Q 16 12 5 0 L 35 0 Q 24 12 24 24 Z" />
            </svg>
          </div>
        </motion.div>

        {/* The Heart */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] relative z-10">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>
    </div>
  );
}
