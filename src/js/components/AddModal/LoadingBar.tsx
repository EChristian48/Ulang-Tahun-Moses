import * as React from 'react'

type LoadingBarProps = {
  progress: number
  id?: string
}

const LoadingBar: React.FC<LoadingBarProps> = (props) => {
  return (
    <div className='progress' id={props.id || 'loadingBar'}>
      <div
        className='determinate'
        style={{ width: `${props.progress}%` }}
      ></div>
    </div>
  )
}

export { LoadingBar }
