'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * 画面内に入ったときのフェードイン演出を統一するラッパー
 *
 * 以前は各セクションが個別に initial / whileInView / transition を書いており、
 * duration 0.8・移動量 20px がほぼ全箇所で繰り返されていた。
 * 要素ごとに独立して発火するため、スクロール中にバラバラ動いて見えていた（#3）。
 *
 * ここで設定を一元化し、以下を共通の方針とする。
 * - duration は 0.5 に短縮し、移動量も 10px に抑えて主張を弱める
 * - 連続する要素は delay で少しずつずらすが、上限を設けて待たされないようにする
 * - prefers-reduced-motion が指定されている場合は演出そのものを行わない
 */

/** 演出の共通パラメータ */
const DURATION = 0.5;
const DISTANCE = 10;
const EASE = [0.22, 1, 0.36, 1] as const;

/** 連続要素の遅延（秒）。長いリストでも最後まで待たされないよう上限を設ける */
export function stagger(index: number): number {
  return Math.min(index * 0.06, 0.24);
}

type Direction = 'up' | 'left' | 'right' | 'none';

function offsetFor(direction: Direction) {
  switch (direction) {
    case 'up':
      return { y: DISTANCE };
    case 'left':
      return { x: -DISTANCE };
    case 'right':
      return { x: DISTANCE };
    case 'none':
      return {};
  }
}

export default function FadeIn({
  children,
  className,
  direction = 'up',
  delay = 0,
  /** true ならマウント時に再生する（ファーストビュー用）。false なら画面内に入ったとき */
  onMount = false,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  onMount?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = offsetFor(direction);
  const hidden = { opacity: 0, ...offset };
  const shown = { opacity: 1, x: 0, y: 0 };
  const transition = { duration: DURATION, delay, ease: EASE };

  if (onMount) {
    return (
      <motion.div initial={hidden} animate={shown} transition={transition} className={className}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={hidden}
      whileInView={shown}
      transition={transition}
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
