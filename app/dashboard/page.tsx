'use client'

import { ClickableCard } from "@/components/ui/clickable-card"
import { Header } from "@/components/ui/header"
import ProgressChartWithLabel, { ProgressChart } from "./components/ProgressChart"

function Dasboard() {
  return (
    <div>
      <Header />
      {/* AZF/BZF clickable cards */}
      <div className="flex justify-center space-x-4 mt-4 mb-4">
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

      {/* Progress chart */}
      <div>
        <ProgressChartWithLabel
          title="Your Progress"
          description="This graph shows your progress from the last 10 tests"
        />
      </div>
    </div>
  )
}

export default Dasboard