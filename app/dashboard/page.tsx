'use client'

import { ClickableCard } from "@/components/ui/clickable-card"
import { Header } from "@/components/ui/header"

function Dasboard() {
  return (
    <div>
      <Header />
      <div className="flex justify-center space-x-4 mt-4">

        <ClickableCard
          title="AZF Practice"
          description="Click here to start practicing your AZF theory"
          onClick={() => null}
        />

        <ClickableCard
          title="BZF Practice"
          description="Click here to start practicing your BZF theory"
          onClick={() => null}
        />
      </div>
    </div>
  )
}

export default Dasboard