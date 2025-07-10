import Image from "next/image";
import NavBar from "@/components/NavBar";
import { Suspense } from "react";
import {Canvas} from "@react-three/fiber";
import { Loader } from "@react-three/drei";
export default function Home() {
  return (
    <section className="h-screen w-screen relative">
      <Canvas className="w-full h-screen bg-transparent"
      camera={{near: 0.1, far: 1000}}
      >
        <Suspense fallback={<Loader/>}>
          <directionalLight></directionalLight>
          <ambientLight></ambientLight>
          <spotLight></spotLight>
          <pointLight></pointLight>
          <hemisphereLight></hemisphereLight>

        </Suspense>
      </Canvas>
    </section>
  );
}
