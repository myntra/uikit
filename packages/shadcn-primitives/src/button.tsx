import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './utils'

/**
 * cva variant definition for the Applique Button's container element.
 *
 * Maps the Applique `type × color × size` matrix to Tailwind utility classes
 * using the `--aui-*` CSS custom properties defined in tokens.css.
 *
 * intent  ← Applique `type`  ('primary' | 'secondary' | 'tertiary' | 'text')
 * tone    ← Applique `color` ('blue' | 'red' | 'yellow' | 'green' | 'gray' | 'pink')
 * size    ← Applique `size`  ('xs' | 'small' | 'regular' | 'large')
 */
export const buttonVariants = cva(
  // ── Base styles — match real shadcn/ui button ───────────────────────────────
  [
    // Layout
    'relative inline-flex items-center justify-center whitespace-nowrap',
    // Typography
    'text-sm font-medium',
    // Shape
    'rounded-md border',
    // Cursor & selection
    'cursor-pointer select-none no-underline',

    // ── Transitions (shadcn uses transition-colors; we extend to include
    //    transform so the active:scale press effect is also animated) ──────────
    'transition-all duration-200 ease-in-out',

    // ── Focus ring (shadcn style) ────────────────────────────────────────────
    // ring-offset-background = white gap between element edge and ring
    'outline-none focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring',
    'focus-visible:ring-offset-2 ring-offset-background',

    // ── Press / active feedback ──────────────────────────────────────────────
    'active:scale-[0.98]',

    // ── Disabled (shadcn approach — simple opacity, no per-variant overrides) ─
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      // ── Visual intent (matches Applique `type` after link→text normalisation)
      intent: {
        primary:   '',
        secondary: 'bg-white',
        tertiary:  'bg-white border-transparent',
        text:      'bg-transparent border-transparent !p-0',
      },

      // ── Colour tone (matches Applique `color`)
      tone: {
        blue:   '',
        red:    '',
        yellow: '',
        green:  '',
        gray:   '',
        pink:   '',
      },

      // ── Size
      size: {
        xs:      'box-content w-[1em] h-[1em] p-1 text-[10px]',
        small:   'py-1 px-3',
        regular: 'py-2 px-4',
        large:   'flex-col w-full h-24 text-base rounded-sm shadow-md py-4 px-4',
      },

      // ── Icon-only button (affects size compound variants)
      iconButton: {
        true:  'box-content w-[1em] h-[1em] text-[10px]',
        false: '',
      },

      // ── Notification button (unique indigo + shadow style)
      notification: {
        true:  [
          'z-10 w-8 h-8',
          'bg-[#4f46c8] border-[#4f46c8] text-white shadow-md',
          'hover:bg-[#2f2a78] hover:border-[#2f2a78]',
          'active:bg-[#201c50] active:border-[#201c50]',
        ].join(' '),
        false: '',
      },
    },

    // ── Compound variants: intent × tone ─────────────────────────────────────
    compoundVariants: [
      // ─── PRIMARY ────────────────────────────────────────────────────────────
      // ─── PRIMARY (solid filled) ──────────────────────────────────────────────
      { intent: 'primary', tone: 'blue',
        class: 'bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:border-primary/90 active:bg-primary/80 active:border-primary/80' },
      { intent: 'primary', tone: 'red',
        class: 'bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90 hover:border-destructive/90 active:bg-destructive/80 active:border-destructive/80' },
      { intent: 'primary', tone: 'yellow',
        class: 'bg-warning text-warning-foreground border-warning hover:bg-warning/90 hover:border-warning/90 active:bg-warning/80 active:border-warning/80' },
      { intent: 'primary', tone: 'green',
        class: 'bg-success text-success-foreground border-success hover:bg-success/90 hover:border-success/90 active:bg-success/80 active:border-success/80' },
      { intent: 'primary', tone: 'gray',
        class: 'bg-muted text-muted-foreground border-muted hover:bg-muted/80 hover:border-muted/80 active:bg-muted/70 active:border-muted/70' },
      { intent: 'primary', tone: 'pink',
        class: 'bg-accent text-accent-foreground border-accent hover:bg-accent/90 hover:border-accent/90 active:bg-accent/80 active:border-accent/80' },

      // ─── SECONDARY (outlined) ────────────────────────────────────────────────
      { intent: 'secondary', tone: 'blue',
        class: 'text-primary border-primary hover:bg-primary/10 hover:text-primary/90 hover:border-primary/90 active:bg-primary/15 active:text-primary/80' },
      { intent: 'secondary', tone: 'red',
        class: 'text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive/90 hover:border-destructive/90 active:bg-destructive/15 active:text-destructive/80' },
      { intent: 'secondary', tone: 'yellow',
        class: 'text-warning border-warning hover:bg-warning/10 hover:text-warning/90 hover:border-warning/90 active:bg-warning/15 active:text-warning/80' },
      { intent: 'secondary', tone: 'green',
        class: 'text-success border-success hover:bg-success/10 hover:text-success/90 hover:border-success/90 active:bg-success/15 active:text-success/80' },
      { intent: 'secondary', tone: 'gray',
        class: 'text-muted-foreground border-muted hover:bg-muted/50 hover:border-muted/80 active:bg-muted/70' },
      { intent: 'secondary', tone: 'pink',
        class: 'text-accent-foreground border-accent hover:bg-accent/20 hover:border-accent/80 active:bg-accent/30' },

      // ─── TERTIARY (ghost — transparent border) ───────────────────────────────
      { intent: 'tertiary', tone: 'blue',
        class: 'text-primary hover:bg-primary/10 hover:border-primary/10 active:bg-primary/15 active:border-primary/15' },
      { intent: 'tertiary', tone: 'red',
        class: 'text-destructive hover:bg-destructive/10 hover:border-destructive/10 active:bg-destructive/15 active:border-destructive/15' },
      { intent: 'tertiary', tone: 'yellow',
        class: 'text-warning hover:bg-warning/10 hover:border-warning/10 active:bg-warning/15 active:border-warning/15' },
      { intent: 'tertiary', tone: 'green',
        class: 'text-success hover:bg-success/10 hover:border-success/10 active:bg-success/15 active:border-success/15' },
      { intent: 'tertiary', tone: 'gray',
        class: 'text-muted-foreground hover:bg-muted/50 hover:border-muted/50 active:bg-muted/70 active:border-muted/70' },
      { intent: 'tertiary', tone: 'pink',
        class: 'text-accent-foreground hover:bg-accent/20 hover:border-accent/20 active:bg-accent/30 active:border-accent/30' },

      // ─── TEXT / LINK (no background, no border) ──────────────────────────────
      { intent: 'text', tone: 'blue',   class: 'text-primary hover:text-primary/80 active:text-primary/70' },
      { intent: 'text', tone: 'red',    class: 'text-destructive hover:text-destructive/80 active:text-destructive/70' },
      { intent: 'text', tone: 'yellow', class: 'text-warning hover:text-warning/80 active:text-warning/70' },
      { intent: 'text', tone: 'green',  class: 'text-success hover:text-success/80 active:text-success/70' },
      { intent: 'text', tone: 'gray',   class: 'text-muted-foreground hover:text-muted-foreground/80 active:text-muted-foreground/70' },
      { intent: 'text', tone: 'pink',   class: 'text-accent-foreground hover:text-accent-foreground/80 active:text-accent-foreground/70' },

      // ─── Icon button padding per size ────────────────────────────────────────
      { iconButton: true, size: 'regular', class: 'p-3' },
      { iconButton: true, size: 'small',   class: 'p-2' },
      { iconButton: true, size: 'xs',      class: 'p-1' },
    ],

    defaultVariants: {
      intent:       'secondary',
      tone:         'blue',
      size:         'regular',
      iconButton:   false,
      notification: false,
    },
  }
)

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>

// ── Primitive component ──────────────────────────────────────────────────────
// A plain <button> with Tailwind styling applied via buttonVariants.
// The Applique Button wrapper uses this for its root element while keeping
// its own routing / icon / loading logic.

export interface ShadcnButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantsProps {}

export const ShadcnButton = React.forwardRef<
  HTMLButtonElement,
  ShadcnButtonProps
>(({ className, intent, tone, size, iconButton, notification, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        buttonVariants({ intent, tone, size, iconButton, notification }),
        className
      )}
      {...props}
    />
  )
})

ShadcnButton.displayName = 'ShadcnButton'
