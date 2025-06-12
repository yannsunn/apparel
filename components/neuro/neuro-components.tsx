'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import { 
  NeuroColors, 
  generateNeuroStyles, 
  createAttentionAnimation,
  NeuroFeedback 
} from '@/lib/neuro/neuro-design'
import { 
  useEmotionalStyling, 
  useSocialProof, 
  useScarcityAlert,
  useMimicryTrigger,
  useEmpathyResponse
} from '@/lib/neuro/neuro-hooks'

// ============= 基本ニューロコンポーネント =============

interface NeuroButtonProps {
  children: ReactNode
  mood: keyof typeof NeuroColors
  onClick?: () => void
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary' | 'accent'
  disabled?: boolean
  loading?: boolean
  mimicry?: boolean
  style?: React.CSSProperties
}

export function NeuroButton({ 
  children, 
  mood, 
  onClick, 
  size = 'medium',
  variant = 'primary',
  disabled = false,
  loading = false,
  mimicry = false,
  style = {}
}: NeuroButtonProps) {
  const emotion = useEmotionalStyling(mood)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const mimicryTrigger = useMimicryTrigger(buttonRef as any)
  const [isPressed, setIsPressed] = useState(false)

  const sizes = {
    small: { padding: '0.5rem 1rem', fontSize: '0.9rem' },
    medium: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    large: { padding: '1rem 2rem', fontSize: '1.2rem' }
  }

  const handleClick = () => {
    if (disabled || loading) return
    
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 150)
    
    if (mimicry) {
      mimicryTrigger.triggerMimicry('click')
    }
    
    NeuroFeedback.recordInteraction('neuro-button', `${mood}-${variant}`)
    onClick?.()
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled || loading}
      style={{
        backgroundColor: NeuroColors[mood][variant],
        color: variant === 'accent' ? '#000000' : '#FFFFFF',
        ...sizes[size],
        border: 'none',
        borderRadius: size === 'small' ? '12px' : size === 'large' ? '25px' : '16px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transform: isPressed ? 'scale(0.95)' : 'scale(1)',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...(emotion.isTriggered && { 
          animation: 'neuroPulse 0.6s ease-in-out',
          ...emotion.styles 
        }),
        ...style
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)'
          e.currentTarget.style.boxShadow = `0 8px 25px ${NeuroColors[mood][variant]}40`
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1) translateY(0)'
          e.currentTarget.style.boxShadow = `0 4px 12px ${NeuroColors[mood][variant]}40`
        }
      }}
    >
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          処理中...
        </div>
      ) : children}
      
      {/* Shimmer effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        animation: loading ? 'none' : 'shimmer 2s infinite'
      }} />
    </button>
  )
}

// ============= 社会的証明コンポーネント =============

interface SocialProofBadgeProps {
  productId: string
  type?: 'viewers' | 'purchases' | 'reviews' | 'stock'
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export function SocialProofBadge({ 
  productId, 
  type = 'viewers',
  position = 'top-right' 
}: SocialProofBadgeProps) {
  const socialProof = useSocialProof(productId)
  const [currentProof, setCurrentProof] = useState('')

  useEffect(() => {
    if (socialProof.visibleProof.length > 0) {
      // ランダムに社会的証明を表示
      const randomProof = socialProof.visibleProof[
        Math.floor(Math.random() * socialProof.visibleProof.length)
      ]
      setCurrentProof(randomProof)
    }
  }, [socialProof.visibleProof])

  if (!currentProof) return null

  const positions = {
    'top-left': { top: '0.5rem', left: '0.5rem' },
    'top-right': { top: '0.5rem', right: '0.5rem' },
    'bottom-left': { bottom: '0.5rem', left: '0.5rem' },
    'bottom-right': { bottom: '0.5rem', right: '0.5rem' }
  }

  return (
    <div style={{
      position: 'absolute',
      ...positions[position],
      background: '#10b981',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600',
      zIndex: 10,
      animation: 'slideInBounce 0.5s ease-out',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)'
    }}>
      <span style={{ marginRight: '0.25rem' }}>
        {type === 'viewers' ? '👀' : 
         type === 'purchases' ? '🛒' : 
         type === 'reviews' ? '⭐' : '📦'}
      </span>
      {currentProof}
    </div>
  )
}

// ============= 希少性アラートコンポーネント =============

interface ScarcityAlertProps {
  stock: number
  threshold?: number
  animated?: boolean
}

export function ScarcityAlert({ 
  stock, 
  threshold = 5,
  animated = true 
}: ScarcityAlertProps) {
  const scarcity = useScarcityAlert(stock, threshold)
  const alertRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scarcity.isScarcityActive && animated && alertRef.current) {
      createAttentionAnimation(alertRef.current, 'pulse')
    }
  }, [scarcity.isScarcityActive, animated])

  if (!scarcity.isScarcityActive) return null

  return (
    <div
      ref={alertRef}
      style={{
        backgroundColor: scarcity.alertLevel === 'critical' 
          ? NeuroColors.urgency.primary
          : NeuroColors.urgency.secondary,
        color: scarcity.alertLevel === 'critical' ? 'white' : '#000',
        padding: '0.75rem 1rem',
        borderRadius: '12px',
        fontSize: '0.9rem',
        fontWeight: '700',
        textAlign: 'center',
        margin: '0.5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <span style={{ marginRight: '0.5rem' }}>
        {scarcity.alertLevel === 'critical' ? '🔥' : '⚠️'}
      </span>
      {scarcity.message}
      
      {/* Animated background */}
      {scarcity.alertLevel === 'critical' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          animation: 'shimmer 1.5s infinite'
        }} />
      )}
    </div>
  )
}

// ============= エンパシーストーリーコンポーネント =============

interface EmpathyStoryProps {
  story: {
    avatar: string
    name: string
    role: string
    content: string
    emotion: 'happy' | 'satisfied' | 'excited' | 'grateful'
  }
}

export function EmpathyStory({ story }: EmpathyStoryProps) {
  const empathy = useEmpathyResponse('testimonial')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const emotionColors = {
    happy: NeuroColors.dopamine.primary,
    satisfied: NeuroColors.trust.primary,
    excited: NeuroColors.urgency.primary,
    grateful: NeuroColors.calm.primary
  }

  return (
    <div 
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '1.5rem',
        border: `2px solid ${emotionColors[story.emotion]}20`,
        position: 'relative',
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}
      onClick={empathy.recordEmpathyInteraction}
    >
      {/* Emotion indicator */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        right: '20px',
        background: emotionColors[story.emotion],
        color: 'white',
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600'
      }}>
        {story.emotion === 'happy' ? '😊' : 
         story.emotion === 'satisfied' ? '😌' : 
         story.emotion === 'excited' ? '🤩' : '🙏'} 
        {story.emotion}
      </div>

      {/* User info */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '1rem',
        gap: '1rem'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: emotionColors[story.emotion],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {story.avatar}
        </div>
        <div>
          <div style={{ fontWeight: '600', color: '#111827' }}>
            {story.name}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
            {story.role}
          </div>
        </div>
      </div>

      {/* Story content */}
      <blockquote style={{
        margin: 0,
        fontSize: '1rem',
        lineHeight: '1.6',
        color: '#374151',
        fontStyle: 'italic',
        position: 'relative',
        paddingLeft: '1rem'
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '3px',
          background: emotionColors[story.emotion],
          borderRadius: '2px'
        }} />
        "{story.content}"
      </blockquote>

      {/* Engagement metrics */}
      <div style={{
        marginTop: '1rem',
        fontSize: '0.8rem',
        color: '#9ca3af',
        display: 'flex',
        gap: '1rem'
      }}>
        <span>❤️ 共感度: {Math.round(empathy.empathyLevel * 100)}%</span>
        <span>⏱️ 閲覧時間: {Math.round(empathy.engagementTime / 1000)}秒</span>
      </div>
    </div>
  )
}

// ============= プライシングアンカーコンポーネント =============

interface PricingAnchorProps {
  originalPrice: number
  currentPrice: number
  currency?: string
  size?: 'small' | 'medium' | 'large'
}

export function PricingAnchor({ 
  originalPrice, 
  currentPrice, 
  currency = 'JPY',
  size = 'medium' 
}: PricingAnchorProps) {
  const savings = originalPrice - currentPrice
  const discountPercentage = Math.round((savings / originalPrice) * 100)
  
  const sizes = {
    small: { price: '1.2rem', original: '0.9rem', savings: '0.8rem' },
    medium: { price: '1.6rem', original: '1rem', savings: '0.9rem' },
    large: { price: '2rem', original: '1.2rem', savings: '1rem' }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      {/* Current price - prominently displayed */}
      <div style={{
        fontSize: sizes[size].price,
        fontWeight: '800',
        color: NeuroColors.dopamine.primary
      }}>
        ¥{currentPrice.toLocaleString('ja-JP')}
      </div>

      {/* Original price - anchoring effect */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{
          fontSize: sizes[size].original,
          color: '#9ca3af',
          textDecoration: 'line-through',
          fontWeight: '500'
        }}>
          ¥{originalPrice.toLocaleString('ja-JP')}
        </div>
        
        {/* Savings highlight */}
        <div style={{
          fontSize: sizes[size].savings,
          color: NeuroColors.dopamine.primary,
          fontWeight: '700',
          background: `${NeuroColors.dopamine.accent}20`,
          padding: '0.2rem 0.5rem',
          borderRadius: '8px',
          marginTop: '0.2rem'
        }}>
          ¥{savings.toLocaleString()}お得 ({discountPercentage}% OFF)
        </div>
      </div>
    </div>
  )
}

// ============= ニューロプログレスバー =============

interface NeuroProgressProps {
  value: number
  max: number
  label?: string
  color?: keyof typeof NeuroColors
  animated?: boolean
}

export function NeuroProgress({ 
  value, 
  max, 
  label,
  color = 'trust',
  animated = true 
}: NeuroProgressProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const percentage = Math.min((value / max) * 100, 100)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayValue(value)
      }, 200)
      return () => clearTimeout(timer)
    } else {
      setDisplayValue(value)
    }
  }, [value, animated])

  const displayPercentage = Math.min((displayValue / max) * 100, 100)

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: '600',
          color: '#374151'
        }}>
          <span>{label}</span>
          <span>{displayValue}/{max}</span>
        </div>
      )}
      
      <div style={{
        width: '100%',
        height: '12px',
        background: '#e5e7eb',
        borderRadius: '6px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          width: `${displayPercentage}%`,
          height: '100%',
          backgroundColor: NeuroColors[color].primary,
          borderRadius: '6px',
          transition: animated ? 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated shine effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            animation: animated ? 'shimmer 2s infinite' : 'none'
          }} />
        </div>
      </div>
    </div>
  )
}

// ============= CSS Animations =============
export const NeuroStyles = () => (
  <style jsx global>{`
    @keyframes neuroPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.9; }
    }
    
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes slideInBounce {
      0% { transform: translateX(100%) scale(0.8); opacity: 0; }
      60% { transform: translateX(-10px) scale(1.05); opacity: 1; }
      100% { transform: translateX(0) scale(1); opacity: 1; }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `}</style>
)

// Named exports for better tree-shaking  
export { SocialProofBadge as NeuroSocialProof }
export { ScarcityAlert as NeuroScarcity }
export { SocialProofBadge as NeuroTrustBadge }

export default {
  NeuroButton,
  SocialProofBadge,
  ScarcityAlert,
  EmpathyStory,
  PricingAnchor,
  NeuroProgress,
  NeuroStyles
}