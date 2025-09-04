import { Button, Spinner } from 'flowbite-react'
import React from 'react'

export default function AppButton({children, isLoading, disabled, ...props}) {
  return (

    // mmkn afrd kl l propertirs ely hnak hna fy proops gnb is loading , ...props w a7otha fy tagt button gnb disabled {...props}
<Button type="submit" disabled={disabled} {...props}>
{  isLoading &&     ( <Spinner size="sm" aria-label="Info spinner example" className="me-3" light />
)}{/* lw is loading true hn3rd loading  */}
    {children}
</Button>
  )
}
