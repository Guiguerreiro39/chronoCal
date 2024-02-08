import * as React from 'react'

export const Element: React.FC<
  React.HTMLAttributes<HTMLElement> & {
    children: React.ReactNode
    as?: 'div' | 'button'
    onClick?: (e?: React.MouseEvent<HTMLElement>) => void
  }
> = ({ children, as = 'div', onClick = () => {}, ...props }) => {
  if (as === 'button')
    return (
      <button
        onClick={(e) => {
          e.preventDefault()
          onClick(e)
        }}
        {...props}
      >
        {children}
      </button>
    )

  return <div {...props}>{children}</div>
}
