import { useEffect, useRef } from 'react';

export function CyberpunkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const charArray = chars.split('');

    const fontSize = 16;
    let columns = canvas.width / fontSize;
    
    let drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Semi-transparent black to create trailing effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Randomly pick between Cyan and Red
        const isRed = Math.random() > 0.9; // 10% chance for red
        ctx.fillStyle = isRed ? '#ff003c' : '#00f3ff';
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment drop counter
        drops[i]++;
      }
    };

    // Re-initialize drops if window is resized significantly
    const handleResizeReinit = () => {
        columns = canvas.width / fontSize;
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100; // start slightly offset
        }
    }
    window.addEventListener('resize', handleResizeReinit);


    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', handleResizeReinit);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 bg-[#050505]" />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 h-full w-full opacity-30 pointer-events-none"
      />
    </>
  );
}
