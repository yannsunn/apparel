'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { 
  NeuroColors, 
  CognitiveOptimization, 
  EmotionalTriggers, 
  NeuroPerformance,
  NeuroFeedback,
  generateNeuroStyles,
  createAttentionAnimation,
  calculateOptimalLayout
} from './neuro-design'

/**
 * ニューロデザイン専用Reactフック集
 */

// ============= 認知負荷管理 =============

/**
 * 認知負荷を監視・制御するフック
 */
export function useCognitiveLoad(itemCount: number) {
  const [isOverloaded, setIsOverloaded] = useState(false)
  const [layout, setLayout] = useState(calculateOptimalLayout(itemCount))
  
  useEffect(() => {
    const newLayout = calculateOptimalLayout(itemCount)
    setLayout(newLayout)
    setIsOverloaded(itemCount > CognitiveOptimization.maxChoices)
    
    if (isOverloaded) {
      console.warn(`🧠 Cognitive overload detected: ${itemCount} items exceed recommended ${CognitiveOptimization.maxChoices}`)
    }
  }, [itemCount, isOverloaded])
  
  return { 
    isOverloaded, 
    layout,
    recommendation: isOverloaded ? 'Consider grouping or pagination' : 'Optimal cognitive load'
  }
}

/**
 * 注意持続時間を追跡するフック
 */
export function useAttentionSpan(elementId: string) {
  const [attentionLevel, setAttentionLevel] = useState<'critical' | 'engaged' | 'committed' | 'lost'>('critical')
  const startTimeRef = useRef<number>(Date.now())
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    startTimeRef.current = Date.now()
    
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const { attentionSpans } = CognitiveOptimization
      
      if (elapsed >= attentionSpans.committed) {
        setAttentionLevel('committed')
      } else if (elapsed >= attentionSpans.engaged) {
        setAttentionLevel('engaged')
      } else if (elapsed >= attentionSpans.critical) {
        setAttentionLevel('critical')
      }
    }, 1000)
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [elementId])
  
  const extendAttention = useCallback(() => {
    startTimeRef.current = Date.now()
    setAttentionLevel('critical')
  }, [])
  
  return { attentionLevel, extendAttention }
}

// ============= 感情的エンゲージメント =============

/**
 * 感情状態に応じたスタイリングフック
 */
export function useEmotionalStyling(
  mood: keyof typeof NeuroColors,
  trigger?: keyof typeof EmotionalTriggers.lossAversion
) {
  const [currentMood, setCurrentMood] = useState(mood)
  const [isTriggered, setIsTriggered] = useState(false)
  
  const styles = useMemo(() => 
    generateNeuroStyles(currentMood, 'primary'), 
    [currentMood]
  )
  
  const triggerEmotion = useCallback((newMood: keyof typeof NeuroColors) => {
    setCurrentMood(newMood)
    setIsTriggered(true)
    
    // 感情トリガー後、3秒で元に戻す
    setTimeout(() => {
      setIsTriggered(false)
      setCurrentMood(mood)
    }, 3000)
  }, [mood])
  
  return { styles, isTriggered, triggerEmotion, currentMood }
}

/**
 * 社会的証明を動的に表示するフック
 */
export function useSocialProof(productId: string) {
  const [proofData, setProofData] = useState({
    viewCount: 0,
    purchaseCount: 0,
    reviewCount: 0,
    lastPurchase: null as Date | null
  })
  
  const [visibleProof, setVisibleProof] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    // 初期値を設定（SSR/CSR一致のため）
    if (typeof window !== 'undefined') {
      const hashCode = productId.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0)
        return a & a
      }, 0)
      
      const baseViews = Math.abs(hashCode % 30) + 15
      const basePurchases = Math.abs(hashCode % 10) + 2
      
      setProofData({
        viewCount: baseViews,
        purchaseCount: basePurchases,
        reviewCount: Math.abs(hashCode % 50) + 10,
        lastPurchase: null
      })
    }
  }, [productId])
  
  useEffect(() => {
    if (!mounted) return
    
    // リアルタイムデータシミュレーション（クライアントサイドのみ）
    const interval = setInterval(() => {
      setProofData(prev => ({
        viewCount: prev.viewCount + Math.floor(Math.random() * 3),
        purchaseCount: prev.purchaseCount + (Math.random() > 0.9 ? 1 : 0),
        reviewCount: prev.reviewCount + (Math.random() > 0.95 ? 1 : 0),
        lastPurchase: Math.random() > 0.8 ? new Date() : prev.lastPurchase
      }))
    }, 5000)
    
    return () => clearInterval(interval)
  }, [mounted])
  
  useEffect(() => {
    if (!mounted) return
    
    const proofs = []
    
    if (proofData.viewCount > 10) {
      proofs.push(`${proofData.viewCount}人が閲覧中`)
    }
    
    if (proofData.purchaseCount > 0) {
      proofs.push(`${proofData.purchaseCount}人が購入`)
    }
    
    if (proofData.lastPurchase) {
      const minutes = Math.floor((Date.now() - proofData.lastPurchase.getTime()) / 60000)
      proofs.push(`${minutes}分前に購入された商品`)
    }
    
    setVisibleProof(proofs.slice(0, 2)) // 最大2つまで表示
  }, [proofData, mounted])
  
  return { proofData, visibleProof }
}

/**
 * 希少性アラートフック
 */
export function useScarcityAlert(stock: number, threshold: number = 5) {
  const [alertLevel, setAlertLevel] = useState<'none' | 'low' | 'critical'>('none')
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    if (stock === 0) {
      setAlertLevel('critical')
      setMessage('売り切れ')
    } else if (stock <= threshold) {
      setAlertLevel('critical')
      setMessage(`残り${stock}点`)
    } else if (stock <= threshold * 2) {
      setAlertLevel('low')
      setMessage(`在庫わずか`)
    } else {
      setAlertLevel('none')
      setMessage('')
    }
  }, [stock, threshold])
  
  return { alertLevel, message, isScarcityActive: alertLevel !== 'none' }
}

// ============= 意思決定サポート =============

/**
 * アンカリング効果を生成するフック
 */
export function useAnchoring(prices: number[]) {
  const [anchoredPrice, setAnchoredPrice] = useState(0)
  const [comparisonPrices, setComparisonPrices] = useState<number[]>([])
  
  useEffect(() => {
    if (prices.length === 0) return
    
    // 最高価格をアンカーとして設定
    const anchor = Math.max(...prices)
    setAnchoredPrice(anchor)
    
    // 比較用価格を設定（高い順）
    const sorted = [...prices].sort((a, b) => b - a)
    setComparisonPrices(sorted)
  }, [prices])
  
  const getSavingsMessage = useCallback((currentPrice: number) => {
    if (anchoredPrice > currentPrice) {
      const savings = anchoredPrice - currentPrice
      const percentage = Math.round((savings / anchoredPrice) * 100)
      return `通常価格¥${anchoredPrice.toLocaleString()}から¥${savings.toLocaleString()} (${percentage}%) お得`
    }
    return null
  }, [anchoredPrice])
  
  return { anchoredPrice, comparisonPrices, getSavingsMessage }
}

/**
 * 選択アーキテクチャフック
 */
export function useChoiceArchitecture<T>(
  options: T[],
  defaultIndex: number = 0
) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)
  const [isDecisionMade, setIsDecisionMade] = useState(false)
  const [decisionTime, setDecisionTime] = useState(0)
  
  const startTimeRef = useRef<number>(Date.now())
  
  const makeChoice = useCallback((index: number) => {
    setSelectedIndex(index)
    setIsDecisionMade(true)
    setDecisionTime(Date.now() - startTimeRef.current)
    
    // 意思決定データを記録
    NeuroFeedback.recordInteraction('choice-architecture', `decision-${index}`)
  }, [])
  
  const resetChoice = useCallback(() => {
    setSelectedIndex(defaultIndex)
    setIsDecisionMade(false)
    setDecisionTime(0)
    startTimeRef.current = Date.now()
  }, [defaultIndex])
  
  return {
    selectedIndex,
    selectedOption: options[selectedIndex],
    isDecisionMade,
    decisionTime,
    makeChoice,
    resetChoice
  }
}

// ============= ミラーニューロン活用 =============

/**
 * 模倣行動を誘発するフック
 */
export function useMimicryTrigger(elementRef: React.RefObject<HTMLElement>) {
  const [isMimicking, setIsMimicking] = useState(false)
  const [mimicryType, setMimicryType] = useState<'hover' | 'click' | 'focus'>('hover')
  
  const triggerMimicry = useCallback((type: 'hover' | 'click' | 'focus') => {
    if (!elementRef.current) return
    
    setIsMimicking(true)
    setMimicryType(type)
    
    // 視覚的ヒント（アニメーション）
    createAttentionAnimation(elementRef.current, 'pulse')
    
    // 3秒後に停止
    setTimeout(() => {
      setIsMimicking(false)
    }, 3000)
    
    NeuroFeedback.recordInteraction('mimicry-trigger', type)
  }, [elementRef])
  
  return { isMimicking, mimicryType, triggerMimicry }
}

/**
 * 共感的反応を測定するフック
 */
export function useEmpathyResponse(contentType: 'story' | 'review' | 'testimonial') {
  const [empathyLevel, setEmpathyLevel] = useState(0)
  const [engagementTime, setEngagementTime] = useState(0)
  
  const interactionCountRef = useRef(0)
  const startTimeRef = useRef<number>(Date.now())
  
  const recordEmpathyInteraction = useCallback(() => {
    interactionCountRef.current++
    setEmpathyLevel(prev => Math.min(prev + 0.1, 1))
    
    NeuroFeedback.recordInteraction('empathy-response', contentType)
  }, [contentType])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setEngagementTime(Date.now() - startTimeRef.current)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return { 
    empathyLevel, 
    engagementTime, 
    interactionCount: interactionCountRef.current,
    recordEmpathyInteraction 
  }
}

// ============= パフォーマンス監視 =============

/**
 * ニューロパフォーマンス監視フック
 */
export function useNeuroPerformance(componentName: string) {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    interactionDelay: 0,
    memoryUsage: 0
  })
  
  const renderStartRef = useRef<number>(0)
  
  useEffect(() => {
    renderStartRef.current = performance.now()
  }, [])
  
  useEffect(() => {
    if (renderStartRef.current) {
      const renderTime = performance.now() - renderStartRef.current
      setPerformanceMetrics(prev => ({ ...prev, renderTime }))
      
      if (renderTime > NeuroPerformance.responseTime.acceptable) {
        console.warn(`🧠 Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`)
      }
    }
  })
  
  const measureInteraction = useCallback((startTime: number) => {
    const delay = performance.now() - startTime
    setPerformanceMetrics(prev => ({ ...prev, interactionDelay: delay }))
    
    if (delay > NeuroPerformance.responseTime.instant) {
      NeuroFeedback.recordInteraction('performance-warning', `slow-interaction-${componentName}`)
    }
    
    return delay
  }, [componentName])
  
  return { performanceMetrics, measureInteraction }
}

// ============= 統合フック =============

/**
 * 包括的ニューロUXフック
 */
export function useNeuroUX(
  elementId: string,
  options: {
    trackAttention?: boolean
    enableSocialProof?: boolean
    monitorPerformance?: boolean
    cognitiveThreshold?: number
  } = {}
) {
  const elementRef = useRef<HTMLElement>(null)
  
  // 各種ニューロフックの統合
  const attention = useAttentionSpan(elementId)
  const performance = useNeuroPerformance(elementId)
  const mimicry = useMimicryTrigger(elementRef as any)
  
  // 総合評価スコア
  const [neuroScore, setNeuroScore] = useState(0)
  
  useEffect(() => {
    let score = 0
    
    // 注意レベル評価
    switch (attention.attentionLevel) {
      case 'committed': score += 40; break
      case 'engaged': score += 30; break
      case 'critical': score += 20; break
      default: score += 0
    }
    
    // パフォーマンス評価
    if (performance.performanceMetrics.renderTime < NeuroPerformance.responseTime.instant) {
      score += 30
    } else if (performance.performanceMetrics.renderTime < NeuroPerformance.responseTime.fast) {
      score += 20
    } else if (performance.performanceMetrics.renderTime < NeuroPerformance.responseTime.acceptable) {
      score += 10
    }
    
    // ミラーニューロン活用評価
    if (mimicry.isMimicking) {
      score += 30
    }
    
    setNeuroScore(score)
  }, [attention.attentionLevel, performance.performanceMetrics.renderTime, mimicry.isMimicking])
  
  return {
    elementRef,
    neuroScore,
    attention,
    performance,
    mimicry,
    isOptimal: neuroScore >= 80
  }
}

export default {
  useCognitiveLoad,
  useAttentionSpan,
  useEmotionalStyling,
  useSocialProof,
  useScarcityAlert,
  useAnchoring,
  useChoiceArchitecture,
  useMimicryTrigger,
  useEmpathyResponse,
  useNeuroPerformance,
  useNeuroUX
}