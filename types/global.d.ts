declare module '*.module.scss' {
  type StyleClass = string | string[] | { [key: string]: any } | undefined
  export default function classnames(...args: StyleClass[]): string
}

declare module '*.svg' {
  const content: string
  export default content
}

interface BaseProps {
  className?: string | string[] | { [key: string]: any } | undefined
}

interface PropMeta {
  description: string
  required?: boolean
  recommended?: boolean
}

type ComponentMeta<T extends BaseProps> = Record<Exclude<keyof T, keyof BaseProps>, PropMeta>
