'use client'

/**
 * ニューロデザイン・ニューロマーケティング統合ライブラリ
 * 脳科学に基づいたUX/UI最適化システム
 */

// ============= 色彩心理学 =============
export const NeuroColors = {
  // 購買意欲を刺激する色（ドーパミン分泌促進）
  dopamine: {
    primary: '#FF6B35',      // オレンジレッド（行動促進）
    secondary: '#F7931E',    // オレンジ（エネルギー）
    accent: '#FFD23F'        // イエロー（注意喚起）
  },

  // 信頼感を醸成する色（セロトニン安定化）
  trust: {
    primary: '#2E86AB',      // ブルー（信頼・安心）
    secondary: '#A23B72',    // パープル（高級感）
    accent: '#F18F01'        // アンバー（温かみ）
  },

  // 緊急性を演出する色（ノルアドレナリン刺激）
  urgency: {
    primary: '#C73E1D',      // レッド（緊急性）
    secondary: '#F79256',    // オレンジ（活動）
    accent: '#FBD1A2'        // ライトオレンジ（ソフト警告）
  },

  // 安心感を与える色（GABA促進）
  calm: {
    primary: '#7FB069',      // グリーン（自然・安心）
    secondary: '#B8D4E3',    // ライトブルー（平穏）
    accent: '#F2E7D5'        // ベージュ（中性）
  }
} as const

// ============= 認知負荷軽減 =============
export const CognitiveOptimization = {
  // ミラーの法則（7±2法則）
  maxChoices: 7,
  idealChoices: 5,

  // 視覚的グルーピング
  grouping: {
    maxItemsPerGroup: 4,
    spacingRatio: 1.618, // 黄金比
    marginMultiplier: 8   // 8pxベース
  },

  // 読み取りパターン（F字型読取）
  fPattern: {
    primaryScanWidth: '60%',
    secondaryScanWidth: '40%',
    tertiaryScanWidth: '20%'
  },

  // 注意の持続時間
  attentionSpans: {
    critical: 3000,      // 3秒（即座の判断）
    engaged: 8000,       // 8秒（関心維持）
    committed: 20000     // 20秒（深い関与）
  }
} as const

// ============= 感情的エンゲージメント =============
export const EmotionalTriggers = {
  // 社会的証明の種類
  socialProof: {
    expert: 'エキスパート推奨',
    user: 'ユーザーレビュー',
    wisdom: '群衆の知恵',
    peer: '同類認識',
    celebrity: '権威者推奨'
  },

  // 希少性の演出
  scarcity: {
    time: '期間限定',
    quantity: '数量限定',
    access: 'アクセス限定',
    seasonal: 'シーズン限定'
  },

  // 損失回避バイアス
  lossAversion: {
    savings: '通常価格から{amount}お得',
    missed: 'このチャンスを逃すと...',
    exclusive: '限定特典をお見逃しなく',
    urgency: '残り{time}で終了'
  }
} as const

// ============= 意思決定サポート =============
export const DecisionSupport = {
  // アンカリング効果
  anchoring: {
    highFirst: true,         // 高価格を先に提示
    comparisonShow: true,    // 比較表示
    bundleValue: true        // バンドル価値強調
  },

  // 選択アーキテクチャ
  choiceArchitecture: {
    defaultOption: true,     // デフォルト選択肢
    categoryReducing: true,  // カテゴリ絞り込み
    progressiveDisclosure: true // 段階的開示
  },

  // 認知的容易性
  cognitiveEase: {
    familiarDesign: true,    // 馴染みやすいデザイン
    consistent: true,        // 一貫性
    predictable: true        // 予測可能性
  }
} as const

// ============= ミラーニューロン活用 =============
export const MirrorNeuron = {
  // 模倣行動誘発
  mimicryTriggers: {
    userActions: '他のお客様も購入',
    behaviourCues: '人気の選択',
    visualCues: '視線誘導アニメーション',
    gestureHints: 'クリック・タップ誘導'
  },

  // 共感的反応
  empathyResponse: {
    humanFaces: true,        // 人間の表情
    emotionalStory: true,    // 感情的ストーリー
    relatable: true,         // 共感可能性
    authentic: true          // 真正性
  }
} as const

// ============= パフォーマンス最適化 =============
export const NeuroPerformance = {
  // レスポンス時間（認知処理速度）
  responseTime: {
    instant: 100,    // 即座の反応（100ms以下）
    fast: 1000,      // 高速（1秒以下）
    acceptable: 3000, // 許容範囲（3秒以下）
    slow: 10000      // 遅い（10秒超は離脱リスク）
  },

  // アニメーション持続時間（注意保持）
  animationDuration: {
    micro: 200,      // マイクロインタラクション
    transition: 300, // 画面遷移
    attention: 800,  // 注意喚起
    story: 2000      // ストーリーテリング
  }
} as const

// ============= 実装ヘルパー関数 =============

/**
 * 認知負荷を考慮したレイアウト計算
 */
export function calculateOptimalLayout(items: number): {
  columns: number
  rows: number
  grouping: number[]
} {
  const { maxChoices, idealChoices, grouping } = CognitiveOptimization
  
  if (items <= idealChoices) {
    return {
      columns: Math.min(items, 3),
      rows: Math.ceil(items / 3),
      grouping: [items]
    }
  }
  
  if (items <= maxChoices) {
    return {
      columns: 3,
      rows: Math.ceil(items / 3),
      grouping: [items]
    }
  }
  
  // 7±2法則適用：グループ分け
  const groups = Math.ceil(items / grouping.maxItemsPerGroup)
  const itemsPerGroup = Math.ceil(items / groups)
  
  return {
    columns: Math.min(itemsPerGroup, 4),
    rows: Math.ceil(itemsPerGroup),
    grouping: Array(groups).fill(itemsPerGroup).map((size, i) => 
      i === groups - 1 ? items - (i * itemsPerGroup) : size
    )
  }
}

/**
 * 感情トリガーメッセージ生成
 */
export function generateEmotionalMessage(
  type: keyof typeof EmotionalTriggers.lossAversion,
  context: { amount?: number; time?: string; count?: number }
): string {
  const templates = EmotionalTriggers.lossAversion
  
  switch (type) {
    case 'savings':
      return templates.savings.replace('{amount}', `¥${context.amount?.toLocaleString() || '0'}`)
    case 'urgency':
      return templates.urgency.replace('{time}', context.time || '時間')
    default:
      return templates[type]
  }
}

/**
 * 色彩心理に基づくスタイル生成
 */
export function generateNeuroStyles(
  mood: keyof typeof NeuroColors,
  emphasis: 'primary' | 'secondary' | 'accent' = 'primary'
): {
  background: string
  color: string
  borderColor: string
  boxShadow: string
} {
  const colorScheme = NeuroColors[mood]
  const baseColor = colorScheme[emphasis]
  
  return {
    background: `linear-gradient(135deg, ${baseColor}, ${colorScheme.secondary})`,
    color: emphasis === 'accent' ? '#000000' : '#FFFFFF',
    borderColor: baseColor,
    boxShadow: `0 4px 12px ${baseColor}40`
  }
}

/**
 * F字パターンレイアウト計算
 */
export function getFPatternLayout(containerWidth: number): {
  primaryZone: { width: string; left: string }
  secondaryZone: { width: string; left: string }
  tertiaryZone: { width: string; left: string }
} {
  const { fPattern } = CognitiveOptimization
  
  return {
    primaryZone: {
      width: fPattern.primaryScanWidth,
      left: '0%'
    },
    secondaryZone: {
      width: fPattern.secondaryScanWidth,
      left: '0%'
    },
    tertiaryZone: {
      width: fPattern.tertiaryScanWidth,
      left: '0%'
    }
  }
}

/**
 * 注意誘導アニメーション
 */
export function createAttentionAnimation(
  element: HTMLElement,
  type: 'pulse' | 'glow' | 'shake' | 'bounce' = 'pulse'
): void {
  const { animationDuration } = NeuroPerformance
  
  const animations = {
    pulse: `
      @keyframes neuroPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }
      }
    `,
    glow: `
      @keyframes neuroGlow {
        0%, 100% { box-shadow: 0 0 5px ${NeuroColors.dopamine.primary}; }
        50% { box-shadow: 0 0 20px ${NeuroColors.dopamine.primary}, 0 0 30px ${NeuroColors.dopamine.secondary}; }
      }
    `,
    shake: `
      @keyframes neuroShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
      }
    `,
    bounce: `
      @keyframes neuroBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `
  }
  
  // CSSアニメーション挿入
  if (!document.querySelector('#neuro-animations')) {
    const style = document.createElement('style')
    style.id = 'neuro-animations'
    style.textContent = Object.values(animations).join('\n')
    document.head.appendChild(style)
  }
  
  element.style.animation = `neuro${type.charAt(0).toUpperCase() + type.slice(1)} ${animationDuration.attention}ms ease-in-out infinite`
  
  // 3回実行後停止（注意疲労防止）
  setTimeout(() => {
    element.style.animation = ''
  }, animationDuration.attention * 3)
}

/**
 * 視線追跡最適化レイアウト
 */
export function optimizeForEyeTracking(): {
  logoPosition: { top: string; left: string }
  primaryCTA: { top: string; right: string }
  navigationMenu: { top: string; left: string; width: string }
  productGrid: { marginTop: string; marginLeft: string }
} {
  return {
    logoPosition: { top: '20px', left: '40px' },
    primaryCTA: { top: '20px', right: '40px' },
    navigationMenu: { top: '80px', left: '0', width: '100%' },
    productGrid: { marginTop: '120px', marginLeft: '0' }
  }
}

// ============= ニューロフィードバック =============
export class NeuroFeedback {
  private static interactions: Map<string, number> = new Map()
  private static conversionEvents: string[] = []
  
  /**
   * ユーザーインタラクション記録
   */
  static recordInteraction(elementId: string, interactionType: string): void {
    const key = `${elementId}:${interactionType}`
    const count = this.interactions.get(key) || 0
    this.interactions.set(key, count + 1)
    
    // 高インタラクション要素の特定
    if (count > 10) {
      console.log(`🧠 High engagement detected: ${elementId} (${interactionType})`)
    }
  }
  
  /**
   * A/Bテスト結果分析
   */
  static analyzeConversion(variant: string, converted: boolean): void {
    const result = `${variant}:${converted ? 'converted' : 'abandoned'}`
    this.conversionEvents.push(result)
    
    // 100イベントごとに分析
    if (this.conversionEvents.length % 100 === 0) {
      this.calculateConversionRate()
    }
  }
  
  private static calculateConversionRate(): void {
    const variants = ['A', 'B']
    const results = variants.map(variant => {
      const total = this.conversionEvents.filter(e => e.startsWith(variant)).length
      const converted = this.conversionEvents.filter(e => e === `${variant}:converted`).length
      return { variant, rate: total > 0 ? converted / total : 0, total }
    })
    
    console.log('🧠 Neuro A/B Test Results:', results)
  }
  
  /**
   * ヒートマップデータ生成
   */
  static generateHeatmapData(): Array<{ x: number; y: number; intensity: number }> {
    const heatmapData: Array<{ x: number; y: number; intensity: number }> = []
    
    // インタラクションデータからヒートマップ生成
    this.interactions.forEach((count, key) => {
      const element = document.getElementById(key.split(':')[0])
      if (element) {
        const rect = element.getBoundingClientRect()
        heatmapData.push({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          intensity: Math.min(count / 10, 1) // 正規化
        })
      }
    })
    
    return heatmapData
  }
}

export default {
  NeuroColors,
  CognitiveOptimization,
  EmotionalTriggers,
  DecisionSupport,
  MirrorNeuron,
  NeuroPerformance,
  calculateOptimalLayout,
  generateEmotionalMessage,
  generateNeuroStyles,
  getFPatternLayout,
  createAttentionAnimation,
  optimizeForEyeTracking,
  NeuroFeedback
}