import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Camera, RefreshCw } from 'lucide-react';

// 初学者瑜伽姿势列表
const beginnerYogaPoses = [
  { name: '山式 (Tadasana)', description: '双脚并拢站立，身体挺直，双臂自然垂放', difficulty: '简单', benefits: '改善姿势，增强平衡' },
  { name: '树式 (Vrksasana)', description: '单脚站立，另一只脚放在大腿内侧', difficulty: '简单', benefits: '提高平衡感，增强腿部力量' },
  { name: '猫牛式 (Cat-Cow)', description: '四肢着地，交替拱背和塌腰', difficulty: '非常简单', benefits: '放松脊柱，缓解背部紧张' },
  { name: '下犬式 (Downward Dog)', description: '双手双脚着地，臀部抬高形成倒V形', difficulty: '中等', benefits: '拉伸全身，增强手臂力量' },
  { name: '婴儿式 (Child\'s Pose)', description: '跪坐，额头贴地，双臂前伸', difficulty: '非常简单', benefits: '放松身心，缓解压力' },
  { name: '战士一式 (Warrior I)', description: '弓步站立，双臂向上伸展', difficulty: '中等', benefits: '增强腿部力量，打开胸腔' },
  { name: '桥式 (Bridge Pose)', description: '仰卧，抬起臀部和背部', difficulty: '简单', benefits: '强化核心，拉伸胸部' },
  { name: '坐姿前屈 (Seated Forward Bend)', description: '坐姿双腿伸直，身体前倾', difficulty: '简单', benefits: '拉伸腿部后侧，放松背部' }
];

const YogaGestureApp = () => {
  const [currentPose, setCurrentPose] = useState(null);
  const [particles, setParticles] = useState([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [motionDetected, setMotionDetected] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const previousFrameRef = useRef(null);
  const animationFrameRef = useRef(null);

  // 生成粒子星球
  useEffect(() => {
    const particleCount = 100;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 150;
      
      newParticles.push({
        id: i,
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        originalX: radius * Math.sin(phi) * Math.cos(theta),
        originalY: radius * Math.sin(phi) * Math.sin(theta),
        originalZ: radius * Math.cos(phi),
        angle: 0
      });
    }
    
    setParticles(newParticles);
  }, []);

  // 粒子动画
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        angle: p.angle + 0.01,
        x: p.originalX * Math.cos(p.angle) - p.originalZ * Math.sin(p.angle),
        z: p.originalX * Math.sin(p.angle) + p.originalZ * Math.cos(p.angle)
      })));
      
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // 启动摄像头
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 320, height: 240 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        detectMotion();
      }
    } catch (err) {
      console.error('无法访问摄像头:', err);
      alert('无法访问摄像头，请确保已授予权限');
    }
  };

  // 停止摄像头
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  // 简单的动作检测
  const detectMotion = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 320;
    canvas.height = 240;
    
    const checkMotion = () => {
      if (!cameraActive) return;
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      if (previousFrameRef.current) {
        let diff = 0;
        const threshold = 30;
        const pixelDiffThreshold = 5000;
        
        for (let i = 0; i < currentFrame.data.length; i += 4) {
          const rDiff = Math.abs(currentFrame.data[i] - previousFrameRef.current.data[i]);
          const gDiff = Math.abs(currentFrame.data[i + 1] - previousFrameRef.current.data[i + 1]);
          const bDiff = Math.abs(currentFrame.data[i + 2] - previousFrameRef.current.data[i + 2]);
          
          if (rDiff + gDiff + bDiff > threshold) {
            diff++;
          }
        }
        
        if (diff > pixelDiffThreshold) {
          setMotionDetected(true);
          generateRandomPose();
          setTimeout(() => setMotionDetected(false), 1000);
        }
      }
      
      previousFrameRef.current = currentFrame;
      requestAnimationFrame(checkMotion);
    };
    
    video.addEventListener('play', checkMotion);
  };

  // 生成随机瑜伽姿势
  const generateRandomPose = () => {
    const randomIndex = Math.floor(Math.random() * beginnerYogaPoses.length);
    setCurrentPose(beginnerYogaPoses[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-300" size={40} />
            手势控制瑜伽生成器
            <Sparkles className="text-yellow-300" size={40} />
          </h1>
          <p className="text-blue-200 text-lg">挥动手势，随机获取适合初学者的瑜伽姿势</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 左侧：摄像头和粒子星球 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Camera size={28} />
              手势控制区
            </h2>
            
            {/* 摄像头显示 */}
            <div className="relative mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full rounded-lg bg-black/50"
                style={{ display: cameraActive ? 'block' : 'none' }}
              />
              <canvas
                ref={canvasRef}
                style={{ display: 'none' }}
              />
              
              {!cameraActive && (
                <div className="w-full h-64 bg-black/50 rounded-lg flex items-center justify-center">
                  <p className="text-white/60">摄像头未启动</p>
                </div>
              )}
              
              {motionDetected && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                  检测到手势！
                </div>
              )}
            </div>

            {/* 粒子星球可视化 */}
            <div className="relative h-64 bg-black/30 rounded-lg overflow-hidden">
              <svg className="w-full h-full">
                <g transform="translate(50%, 50%)">
                  {particles.map(p => {
                    const scale = (p.z + 150) / 300;
                    const opacity = scale;
                    return (
                      <circle
                        key={p.id}
                        cx={p.x}
                        cy={p.y}
                        r={2 * scale}
                        fill={currentPose ? '#fbbf24' : '#60a5fa'}
                        opacity={opacity}
                      />
                    );
                  })}
                </g>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/80 text-center">
                  <Sparkles className="mx-auto mb-2" size={32} />
                  <p className="text-sm">粒子星球</p>
                </div>
              </div>
            </div>

            {/* 控制按钮 */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={cameraActive ? stopCamera : startCamera}
                className={`flex-1 py-3 rounded-lg font-bold text-white transition-all ${
                  cameraActive 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {cameraActive ? '关闭摄像头' : '启动摄像头'}
              </button>
              
              <button
                onClick={generateRandomPose}
                className="flex-1 py-3 rounded-lg font-bold text-white bg-blue-500 hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} />
                手动生成
              </button>
            </div>
          </div>

          {/* 右侧：瑜伽姿势显示 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">当前瑜伽姿势</h2>
            
            {currentPose ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">{currentPose.name}</h3>
                  <span className="inline-block bg-white/30 px-3 py-1 rounded-full text-sm">
                    难度：{currentPose.difficulty}
                  </span>
                </div>
                
                <div className="bg-white/20 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-2">姿势描述</h4>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    {currentPose.description}
                  </p>
                </div>
                
                <div className="bg-white/20 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-2">健康益处</h4>
                  <p className="text-green-200 text-lg leading-relaxed">
                    {currentPose.benefits}
                  </p>
                </div>

                <div className="bg-blue-500/30 border-2 border-blue-400 rounded-xl p-4">
                  <p className="text-white text-sm">
                    <span className="font-bold">💡 初学者提示：</span> 练习时保持呼吸均匀，不要勉强自己。如感到不适请立即停止。
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center text-white/60 text-center">
                <div>
                  <Sparkles className="mx-auto mb-4" size={48} />
                  <p className="text-xl">启动摄像头并挥动手势</p>
                  <p className="text-sm mt-2">或点击"手动生成"按钮</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-3">使用说明</h3>
          <ul className="text-blue-200 space-y-2">
            <li>🎥 <strong>步骤1：</strong> 点击"启动摄像头"按钮允许访问摄像头</li>
            <li>👋 <strong>步骤2：</strong> 在摄像头前挥动手或移动身体</li>
            <li>✨ <strong>步骤3：</strong> 系统检测到动作后会自动生成随机瑜伽姿势</li>
            <li>🔄 <strong>提示：</strong> 也可以直接点击"手动生成"按钮获取新姿势</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default YogaGestureApp;
