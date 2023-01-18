/* eslint-disable indent */
import React from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const options: any = {
  background: {
    color: "#000",
    opacity: 0
  },
  fullscreen: {
    enable: true,
    zIndex: -1,
  },
  particles: {
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "out",
      },
      random: true,
      speed: 0.1,
      straight: false,
    },
    opacity: {
      animation: {
        enable: true,
        speed: 1.3,
        sync: false,
      },
      value: { min: 0, max: 1 },
    },
    size: {
      value: { min: 1, max: 3 },
    }
  },
};

export default function ParticleBackground() {
  return (
    <div className="">
      <Particles
        init={async (engine) => await loadFull(engine)}
        options={options}
      />
    </div>
  );
}