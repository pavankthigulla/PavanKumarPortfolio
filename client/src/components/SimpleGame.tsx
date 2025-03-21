import { useEffect, useRef, useState } from 'react';

export const SimpleGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // Game variables
  const gameState = useRef({
    player: { x: 0, y: 0, width: 20, height: 20, color: '#00d0ff' },
    targets: [] as { x: number, y: number, radius: number, color: string, speed: number }[],
    obstacles: [] as { x: number, y: number, width: number, height: number, color: string, speed: number }[],
    animationFrameId: 0,
    lastSpawnTime: 0,
    width: 0,
    height: 0
  });

  // Initialize the game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const savedHighScore = localStorage.getItem('gameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const containerWidth = canvas.parentElement?.clientWidth || 300;
      const containerHeight = 400; // Fixed height for the game
      
      canvas.width = containerWidth;
      canvas.height = containerHeight;
      
      gameState.current.width = containerWidth;
      gameState.current.height = containerHeight;
      
      // Reset player position
      gameState.current.player.x = containerWidth / 2 - gameState.current.player.width / 2;
      gameState.current.player.y = containerHeight - gameState.current.player.height - 10;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(gameState.current.animationFrameId);
    };
  }, []);

  // Handle mouse/touch movement
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      gameState.current.player.x = mouseX - gameState.current.player.width / 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      gameState.current.player.x = touchX - gameState.current.player.width / 2;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gameStarted, gameOver]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const spawnTarget = () => {
      const minRadius = 10;
      const maxRadius = 20;
      const radius = Math.random() * (maxRadius - minRadius) + minRadius;
      
      gameState.current.targets.push({
        x: Math.random() * (gameState.current.width - radius * 2) + radius,
        y: -radius,
        radius,
        color: '#4CAF50',
        speed: 2 + Math.random() * 2
      });
    };

    const spawnObstacle = () => {
      const width = 30 + Math.random() * 50;
      const height = 10 + Math.random() * 20;
      
      gameState.current.obstacles.push({
        x: Math.random() * (gameState.current.width - width),
        y: -height,
        width,
        height,
        color: '#FF5252',
        speed: 3 + Math.random() * 3
      });
    };

    const checkCollision = () => {
      const player = gameState.current.player;
      
      // Check target collisions (good)
      gameState.current.targets = gameState.current.targets.filter(target => {
        const dx = target.x - (player.x + player.width / 2);
        const dy = target.y - (player.y + player.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < target.radius + (player.width + player.height) / 4) {
          // Collected target
          setScore(prevScore => prevScore + 10);
          return false;
        }
        
        return true;
      });
      
      // Check obstacle collisions (bad)
      return gameState.current.obstacles.some(obstacle => {
        return (
          player.x < obstacle.x + obstacle.width &&
          player.x + player.width > obstacle.x &&
          player.y < obstacle.y + obstacle.height &&
          player.y + player.height > obstacle.y
        );
      });
    };

    const gameLoop = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw player
      ctx.fillStyle = gameState.current.player.color;
      ctx.fillRect(
        gameState.current.player.x,
        gameState.current.player.y,
        gameState.current.player.width,
        gameState.current.player.height
      );
      
      // Spawn logic
      const currentTime = Date.now();
      const timeSinceLastSpawn = currentTime - gameState.current.lastSpawnTime;
      
      if (timeSinceLastSpawn > 1000) {
        if (Math.random() < 0.7) {
          spawnTarget();
        }
        
        if (Math.random() < 0.3) {
          spawnObstacle();
        }
        
        gameState.current.lastSpawnTime = currentTime;
      }
      
      // Update and draw targets
      gameState.current.targets.forEach((target, index) => {
        target.y += target.speed;
        
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fillStyle = target.color;
        ctx.fill();
        ctx.closePath();
        
        // Remove if offscreen
        if (target.y > canvas.height + target.radius) {
          gameState.current.targets.splice(index, 1);
        }
      });
      
      // Update and draw obstacles
      gameState.current.obstacles.forEach((obstacle, index) => {
        obstacle.y += obstacle.speed;
        
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        
        // Remove if offscreen
        if (obstacle.y > canvas.height) {
          gameState.current.obstacles.splice(index, 1);
        }
      });
      
      // Check for collisions
      if (checkCollision()) {
        // Game over condition
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('gameHighScore', score.toString());
        }
        setGameOver(true);
        return;
      }
      
      // Continue the game loop
      gameState.current.animationFrameId = requestAnimationFrame(gameLoop);
    };
    
    gameState.current.animationFrameId = requestAnimationFrame(gameLoop);
    
    return () => {
      cancelAnimationFrame(gameState.current.animationFrameId);
    };
  }, [gameStarted, gameOver, score, highScore]);

  const handleStartGame = () => {
    // Reset game state
    gameState.current.targets = [];
    gameState.current.obstacles = [];
    gameState.current.lastSpawnTime = Date.now();
    
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
  };

  return (
    <div className="bg-muted/20 rounded-lg p-4 w-full shadow-md flex flex-col items-center backdrop-blur-sm">
      <h3 className="text-xl font-bold mb-3 text-center">Boost Catcher</h3>
      
      <div className="mb-2 w-full flex justify-between items-center">
        <div className="text-sm">Score: <span className="font-bold">{score}</span></div>
        <div className="text-sm">High: <span className="font-bold">{highScore}</span></div>
      </div>
      
      <div className="w-full relative">
        <canvas 
          ref={canvasRef} 
          className="bg-background/60 rounded-md shadow-inner w-full"
        ></canvas>
        
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-md">
            <h4 className="text-lg font-bold mb-4">How to Play</h4>
            <p className="text-center text-sm mb-4">Catch green circles to score points.<br/>Avoid red blocks!</p>
            <button 
              onClick={handleStartGame}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 hover-target transition-colors"
            >
              Start Game
            </button>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-md">
            <h4 className="text-xl font-bold mb-2">Game Over!</h4>
            <p className="mb-4">Your score: <span className="font-bold">{score}</span></p>
            <button 
              onClick={handleStartGame}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 hover-target transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};