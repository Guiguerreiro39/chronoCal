import * as React from 'react'

export const Element: React.FC<
  React.HTMLAttributes<HTMLElement> & {
    children: React.ReactNode
    as?: 'div' | 'button'
    onClick?: (e?: React.MouseEvent<HTMLElement>) => void
  }
> = ({ children, as = 'div', onClick = () => {}, role, ...props }) => {
  if (as === 'button')
    return (
      <button
        role={role}
        onClick={(e) => {
          e.preventDefault()
          onClick(e)
        }}
        {...props}
      >
        {children}
      </button>
    )

  return (
    <div
      role={role}
      onClick={(e) => {
        if (role === 'button') {
          e.preventDefault()
          onClick(e)
        }
      }}
      {...props}
    >
      {children}
    </div>
  )
}
