"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "@/components/Loader";
import Island from "@/models/island";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [screenConfig, setScreenConfig] = useState({
    screenScale: [1, 1, 1],
    screenPosition: [0, -6.5, -43],
    rotation: [0.1, 4.7, 0],
  });

  useEffect(() => {
    // Now we're on the client, so window is safe
    setIsClient(true);

    const adjustIslandForScreenSize = () => {
      const isMobile = window.innerWidth < 768;

      setScreenConfig({
        screenScale: isMobile ? [0.9, 0.9, 0.9] : [1, 1, 1],
        screenPosition: [0, -6.5, -43],
        rotation: [0.1, 4.7, 0],
      });

    };

    adjustIslandForScreenSize();
    window.addEventListener("resize", adjustIslandForScreenSize);

    return () => window.removeEventListener("resize", adjustIslandForScreenSize);
  }, []);

  return (
    <section className="h-screen w-screen relative">
      <Canvas className="w-full h-screen bg-transparent" camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1,1,1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight intensity={1} color={'#b1e1ff'} groundColor={'#000000'}/>

          {/* Only render Island after window is available */}
          {isClient && (
            <Island
              scale={screenConfig.screenScale}
              position={screenConfig.screenPosition}
              rotation={screenConfig.rotation}
            />
          )}
        </Suspense>
      </Canvas>
    </section>
  );
}
