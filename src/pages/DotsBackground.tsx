// @ts-nocheck
import React, { useEffect, useRef } from "react";
import "./DotsBackground.scss";

const DotsBackground: React.FC = () => {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // DOTS
    const dots = [];
    const maxDistance = 100;
    const lineWidth = 0.2;
    const dotSize = 1;
    const globalAlpha = 0.6;

    let dotsCount;

    // MOUSE
    let mouseRadius;
    recalculateParams();

    class Mouse {
      constructor() {
        this.x = -Infinity;
        this.y = -Infinity;
        this.radius = mouseRadius;
      }
    }
    const mouse = new Mouse();

    class Dot {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = dotSize;
        this.dirX = Number(getRandomSign() + Math.random());
        this.dirY = Number(getRandomSign() + Math.random());
        this.color = getRandomColor();
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = globalAlpha;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }

      move() {
        this.x += this.dirX;
        this.y += this.dirY;
        if (this.x > canvas.width || this.x < 0) this.dirX = -this.dirX;
        if (this.y > canvas.height || this.y < 0) this.dirY = -this.dirY;
      }
    }

    function initDots() {
      for (let i = 0; i < dotsCount; i++) {
        dots[i] = new Dot();
      }
    }

    function animateDots() {
      moveDots();
      redrawDots();
      connectDots();
      connectMouse();

      requestAnimationFrame(animateDots);
    }

    function redrawDots() {
      canvas.width = canvas.width;
      dots.forEach((dot) => dot.draw());
    }

    function moveDots() {
      dots.forEach((dot) => dot.move());
    }

    function lineTo(x1, y1, x2, y2, color = "black") {
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.globalAlpha = globalAlpha;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }

    function connectDots() {
      for (let i = 0; i < dotsCount - 1; i++) {
        for (let q = i + 1; q < dotsCount; q++) {
          const a = dots[i];
          const b = dots[q];

          if (a.color !== b.color) continue;

          const distance = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
          if (distance <= maxDistance) {
            lineTo(a.x, a.y, b.x, b.y, a.color);
          }
        }
      }
    }

    function connectMouse() {
      for (let i = 0; i < dotsCount; i++) {
        const a = dots[i];

        const distance = Math.sqrt(Math.pow(mouse.x - a.x, 2) + Math.pow(mouse.y - a.y, 2));
        if (distance <= mouse.radius) {
          lineTo(a.x, a.y, mouse.x, mouse.y, a.color);
        }
      }
    }

    function listenResize() {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      mouse.x = -Infinity;
      mouse.y = -Infinity;
      initDots();
    }

    function listenPointerLeave() {
      mouse.x = -Infinity;
      mouse.y = -Infinity;
    }

    function listenPointer(e) {
      e.preventDefault();
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function listenTouchMove(e) {
      e.preventDefault();
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }

    function listenTouchEnd() {
      mouse.x = -Infinity;
      mouse.y = -Infinity;
    }

    function getRandomSign() {
      return Math.random() < 0.5 ? "-" : "+";
    }

    function getRandomColor() {
      return Math.random() < 0.5 ? "violet" : "pink";
    }

    function recalculateParams() {
      dotsCount = (window.innerHeight + window.innerWidth) / 30;
      if (window.innerWidth > 1000) {
        mouseRadius = 300;
      } else {
        mouseRadius = 150;
      }
    }

    (function start() {
      initDots();
      animateDots();
    })();

    window.addEventListener("resize", listenResize);
    document.addEventListener("pointerleave", listenPointerLeave);
    document.addEventListener("pointermove", listenPointer);
    document.addEventListener("touchmove", listenTouchMove);
    document.addEventListener("touchend", listenTouchEnd);

    return () => {
      window.removeEventListener("resize", listenResize);
      document.removeEventListener("pointerleave", listenPointerLeave);
      document.removeEventListener("pointermove", listenPointer);
      document.removeEventListener("touchmove", listenTouchMove);
      document.removeEventListener("touchend", listenTouchEnd);
    };
  }, []);

  return (
    <div className="dotsbackground">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DotsBackground;
