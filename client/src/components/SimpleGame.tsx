import { useEffect, useRef, useState } from 'react';

export const SimpleGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [powerUpActive, setPowerUpActive] = useState(false);

  // Game variables
  const gameState = useRef({
    player: { x: 0, y: 0, width: 20, height: 20, color: '#00d0ff' },
    targets: [] as { x: number, y: number, radius: number, color: string, speed: number, points: number }[],
    obstacles: [] as { x: number, y: number, width: number, height: number, color: string, speed: number, moveHorizontal?: boolean, directionX?: number }[],
    powerUps: [] as { x: number, y: number, radius: number, color: string, speed: number, type: 'shield' | 'slowdown' | 'extraPoints' }[],
    animationFrameId: 0,
    lastSpawnTime: 0,
    lastPowerUpTime: 0,
    width: 0,
    height: 0,
    powerUpTimeRemaining: 0,
    powerUpType: null as null | 'shield' | 'slowdown' | 'extraPoints',
    difficultyMultiplier: 1.0
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
      
      // Keep player within bounds
      if (gameState.current.player.x < 0) {
        gameState.current.player.x = 0;
      }
      if (gameState.current.player.x > gameState.current.width - gameState.current.player.width) {
        gameState.current.player.x = gameState.current.width - gameState.current.player.width;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      gameState.current.player.x = touchX - gameState.current.player.width / 2;
      
      // Keep player within bounds
      if (gameState.current.player.x < 0) {
        gameState.current.player.x = 0;
      }
      if (gameState.current.player.x > gameState.current.width - gameState.current.player.width) {
        gameState.current.player.x = gameState.current.width - gameState.current.player.width;
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gameStarted, gameOver]);

  // Update level based on score
  useEffect(() => {
    if (score >= level * 100) {
      setLevel(prevLevel => prevLevel + 1);
      gameState.current.difficultyMultiplier += 0.15;
    }
  }, [score, level]);

  // Update powerup status
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    let powerUpInterval: number;
    
    if (powerUpActive && gameState.current.powerUpTimeRemaining > 0) {
      powerUpInterval = window.setInterval(() => {
        gameState.current.powerUpTimeRemaining -= 1;
        
        if (gameState.current.powerUpTimeRemaining <= 0) {
          setPowerUpActive(false);
          gameState.current.powerUpType = null;
          clearInterval(powerUpInterval);
        }
      }, 1000);
    }
    
    return () => {
      if (powerUpInterval) clearInterval(powerUpInterval);
    };
  }, [powerUpActive, gameStarted, gameOver]);

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
      
      // Special targets have a higher chance at higher levels
      const isSpecialTarget = Math.random() < 0.1 * level;
      
      gameState.current.targets.push({
        x: Math.random() * (gameState.current.width - radius * 2) + radius,
        y: -radius,
        radius,
        color: isSpecialTarget ? '#FFC107' : '#4CAF50',
        speed: (2 + Math.random() * 2) * gameState.current.difficultyMultiplier,
        points: isSpecialTarget ? 25 : 10
      });
    };

    const spawnObstacle = () => {
      const width = 30 + Math.random() * 50;
      const height = 10 + Math.random() * 20;
      
      // Higher levels have a chance to spawn moving obstacles
      const movingObstacle = level > 2 && Math.random() < 0.3;
      
      gameState.current.obstacles.push({
        x: Math.random() * (gameState.current.width - width),
        y: -height,
        width,
        height,
        color: '#FF5252',
        speed: (3 + Math.random() * 3) * gameState.current.difficultyMultiplier,
        moveHorizontal: movingObstacle,
        directionX: movingObstacle ? (Math.random() > 0.5 ? 1 : -1) : 0
      });
    };

    const spawnPowerUp = () => {
      if (Math.random() > 0.2) return; // 20% chance to spawn a power-up
      
      const powerUpTypes = ['shield', 'slowdown', 'extraPoints'] as const;
      const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
      const colorMap = {
        shield: '#2196F3',
        slowdown: '#9C27B0',
        extraPoints: '#FFEB3B'
      };
      
      gameState.current.powerUps.push({
        x: Math.random() * (gameState.current.width - 30) + 15,
        y: -15,
        radius: 15,
        color: colorMap[type],
        speed: 2 * gameState.current.difficultyMultiplier,
        type
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
          const pointsEarned = gameState.current.powerUpType === 'extraPoints' 
            ? target.points * 2
            : target.points;
            
          setScore(prevScore => prevScore + pointsEarned);
          return false;
        }
        
        return true;
      });
      
      // Check power-up collisions
      gameState.current.powerUps = gameState.current.powerUps.filter(powerUp => {
        const dx = powerUp.x - (player.x + player.width / 2);
        const dy = powerUp.y - (player.y + player.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < powerUp.radius + (player.width + player.height) / 4) {
          // Collected power-up
          setPowerUpActive(true);
          gameState.current.powerUpType = powerUp.type;
          gameState.current.powerUpTimeRemaining = 10; // 10 seconds
          return false;
        }
        
        return true;
      });
      
      // Check obstacle collisions (bad)
      if (gameState.current.powerUpType === 'shield') {
        // Shield protects from obstacles
        return false;
      }
      
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
      
      // Draw player with potential shield effect
      if (gameState.current.powerUpType === 'shield') {
        ctx.beginPath();
        ctx.arc(
          gameState.current.player.x + gameState.current.player.width / 2,
          gameState.current.player.y + gameState.current.player.height / 2,
          gameState.current.player.width, 
          0, 
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(33, 150, 243, 0.3)';
        ctx.fill();
      }
      
      ctx.fillStyle = gameState.current.player.color;
      ctx.fillRect(
        gameState.current.player.x,
        gameState.current.player.y,
        gameState.current.player.width,
        gameState.current.player.height
      );
      
      // Draw current level
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.fillText(`Level: ${level}`, 10, 20);
      
      // Draw power-up indicator if active
      if (powerUpActive) {
        const powerUpName = {
          shield: 'Shield',
          slowdown: 'Slow Motion',
          extraPoints: 'Double Points'
        }[gameState.current.powerUpType!];
        
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText(`${powerUpName}: ${gameState.current.powerUpTimeRemaining}s`, 10, 40);
      }
      
      // Spawn logic
      const currentTime = Date.now();
      const spawnInterval = Math.max(1000 - (level * 75), 400); // Spawn faster as level increases, but with a minimum interval
      const timeSinceLastSpawn = currentTime - gameState.current.lastSpawnTime;
      
      if (timeSinceLastSpawn > spawnInterval) {
        // Higher chance to spawn obstacles at higher levels
        const obstacleChance = Math.min(0.3 + (level * 0.05), 0.6);
        
        if (Math.random() < 0.7) {
          spawnTarget();
        }
        
        if (Math.random() < obstacleChance) {
          spawnObstacle();
        }
        
        gameState.current.lastSpawnTime = currentTime;
      }
      
      // Power-up spawn logic
      const powerUpInterval = 8000; // Power-ups can appear every 8 seconds
      if (currentTime - gameState.current.lastPowerUpTime > powerUpInterval) {
        spawnPowerUp();
        gameState.current.lastPowerUpTime = currentTime;
      }
      
      // Apply slow motion effect if active
      const speedMultiplier = gameState.current.powerUpType === 'slowdown' ? 0.5 : 1;
      
      // Update and draw targets
      gameState.current.targets.forEach((target, index) => {
        target.y += target.speed * speedMultiplier;
        
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fillStyle = target.color;
        ctx.fill();
        
        // Draw point value for special targets
        if (target.points > 10) {
          ctx.fillStyle = 'white';
          ctx.font = '10px Arial';
          ctx.fillText(`${target.points}`, target.x - 7, target.y + 3);
        }
        
        ctx.closePath();
        
        // Remove if offscreen
        if (target.y > canvas.height + target.radius) {
          gameState.current.targets.splice(index, 1);
        }
      });
      
      // Update and draw obstacles
      gameState.current.obstacles.forEach((obstacle, index) => {
        obstacle.y += obstacle.speed * speedMultiplier;
        
        // Move horizontally if it's a moving obstacle
        if (obstacle.moveHorizontal && obstacle.directionX) {
          obstacle.x += obstacle.directionX * 2 * speedMultiplier;
          
          // Bounce off walls
          if (obstacle.x <= 0 || obstacle.x + obstacle.width >= gameState.current.width) {
            obstacle.directionX! *= -1;
          }
        }
        
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        
        // Remove if offscreen
        if (obstacle.y > canvas.height) {
          gameState.current.obstacles.splice(index, 1);
        }
      });
      
      // Update and draw power-ups
      gameState.current.powerUps.forEach((powerUp, index) => {
        powerUp.y += powerUp.speed * speedMultiplier;
        
        ctx.beginPath();
        ctx.arc(powerUp.x, powerUp.y, powerUp.radius, 0, Math.PI * 2);
        ctx.fillStyle = powerUp.color;
        ctx.fill();
        
        // Draw power-up icon
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        const icon = powerUp.type === 'shield' ? '🛡️' : 
                     powerUp.type === 'slowdown' ? '⏱️' : '2x';
        ctx.fillText(icon, powerUp.x - 6, powerUp.y + 4);
        
        ctx.closePath();
        
        // Remove if offscreen
        if (powerUp.y > canvas.height + powerUp.radius) {
          gameState.current.powerUps.splice(index, 1);
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
  }, [gameStarted, gameOver, score, highScore, level, powerUpActive]);

  const handleStartGame = () => {
    // Reset game state
    gameState.current.targets = [];
    gameState.current.obstacles = [];
    gameState.current.powerUps = [];
    gameState.current.lastSpawnTime = Date.now();
    gameState.current.lastPowerUpTime = Date.now();
    gameState.current.powerUpType = null;
    gameState.current.difficultyMultiplier = 1.0;
    
    setScore(0);
    setLevel(1);
    setPowerUpActive(false);
    setGameStarted(true);
    setGameOver(false);
  };

  return (
    <div className="bg-muted/20 rounded-lg p-4 w-full shadow-md flex flex-col items-center backdrop-blur-sm">
      <h3 className="text-xl font-bold mb-3 text-center">Boost Catcher</h3>
      
      <div className="mb-2 w-full flex justify-between items-center">
        <div className="text-sm">Score: <span className="font-bold">{score}</span></div>
        <div className="text-sm">Level: <span className="font-bold">{level}</span></div>
        <div className="text-sm">High: <span className="font-bold">{highScore}</span></div>
      </div>
      
      <div className="w-full relative">
        <canvas 
          ref={canvasRef} 
          className="bg-background/60 rounded-md shadow-inner w-full"
        ></canvas>
        
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-md">
            <h4 className="text-lg font-bold mb-2">How to Play</h4>
            <ul className="text-center text-sm mb-4 space-y-1">
              <li>🟢 <span className="font-medium">Green circles:</span> 10 points</li>
              <li>🟡 <span className="font-medium">Yellow circles:</span> 25 points</li>
              <li>🛡️ <span className="font-medium">Blue:</span> Shield (10s)</li>
              <li>⏱️ <span className="font-medium">Purple:</span> Slow motion (10s)</li>
              <li>2x <span className="font-medium">Yellow:</span> Double points (10s)</li>
              <li>🔴 <span className="font-medium">Red blocks:</span> Avoid!</li>
            </ul>
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
            <p className="mb-1">Your score: <span className="font-bold">{score}</span></p>
            <p className="mb-4">You reached level <span className="font-bold">{level}</span></p>
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