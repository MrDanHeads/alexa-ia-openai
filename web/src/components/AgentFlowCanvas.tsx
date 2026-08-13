"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  phase: number;
  currentY: number;
}

const LABELS = ["TRIGGER", "AGENTE IA", "ANÁLISIS", "ACCIÓN"];

/**
 * Decorative background for the hero: a labeled workflow diagram
 * (trigger -> agent -> analysis -> action) rather than a generic glowing
 * neural-net cloud — it mirrors what an actual N8N automation canvas looks like.
 */
export function AgentFlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let nodes: Node[] = [];
    let frameId = 0;

    function layout() {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Keep the diagram clear of the headline column on the left — it only
      // occupies the right-hand band where the portrait sits. The two middle
      // nodes sit above/below the portrait photo rather than behind it (its
      // circle is opaque, unlike the earlier placeholder gradient).
      const nodeHalfWidth = 44;
      const xStart = w * 0.56;
      const xEnd = w - nodeHalfWidth - 16;
      const cols = LABELS.length;
      const yOffsets = [-60, -175, 175, 60];
      nodes = LABELS.map((label, i) => {
        const x = xStart + (xEnd - xStart) * (i / (cols - 1));
        const y = h * 0.5 + yOffsets[i];
        return { x, y, w: 88, h: 30, label, phase: i * 1.4, currentY: y };
      });
    }

    function roundRect(x: number, y: number, w: number, h: number, r: number) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function draw(t: number) {
      if (!ctx || !canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      nodes.forEach((n) => {
        n.currentY = n.y + (reduced ? 0 : Math.sin(t / 1600 + n.phase) * 6);
      });

      // connectors
      ctx.strokeStyle = "rgba(129,201,250,.4)";
      for (let i = 0; i < nodes.length - 1; i++) {
        const a = nodes[i];
        const b = nodes[i + 1];
        ctx.beginPath();
        ctx.moveTo(a.x + a.w / 2, a.currentY);
        ctx.bezierCurveTo(
          a.x + a.w / 2 + 40,
          a.currentY,
          b.x - b.w / 2 - 40,
          b.currentY,
          b.x - b.w / 2,
          b.currentY
        );
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(b.x - b.w / 2, b.currentY, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(185,255,255,.9)";
        ctx.fill();
      }

      // nodes
      ctx.font = "600 10px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      nodes.forEach((n, i) => {
        ctx.fillStyle = "rgba(0,32,77,.6)";
        ctx.strokeStyle = i % 2 === 0 ? "rgba(185,255,255,.7)" : "rgba(129,201,250,.6)";
        ctx.lineWidth = 1.2;
        roundRect(n.x - n.w / 2, n.currentY - n.h / 2, n.w, n.h, 4);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "rgba(234,243,255,.85)";
        ctx.fillText(n.label, n.x, n.currentY);
        ctx.beginPath();
        ctx.arc(n.x - n.w / 2, n.currentY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(129,201,250,.9)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x + n.w / 2, n.currentY, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    layout();
    if (reduced) {
      draw(0);
    } else {
      const loop = (t: number) => {
        draw(t);
        frameId = requestAnimationFrame(loop);
      };
      frameId = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", layout);
    return () => {
      window.removeEventListener("resize", layout);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  // Hidden below md: on narrow viewports the portrait and headline already
  // fill the width, and there's no clear band left for the diagram to live in.
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 hidden h-full w-full opacity-85 md:block"
    />
  );
}
