"use client";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="stars" />
      <div className="gradient-orb orb-1 absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-gradient-radial from-purple-500 to-transparent" />
      <div 
        className="gradient-orb orb-2 absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] bg-gradient-radial from-cyan-500 to-transparent" 
        style={{ animationDelay: '7s' }} 
      />
      <div 
        className="gradient-orb orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-blue-500 to-transparent" 
        style={{ animationDelay: '14s' }} 
      />
    </div>
  );
}
