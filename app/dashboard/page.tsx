'use client'

import { ClickableCard } from "@/components/ui/clickable-card"
import ProgressChartWithLabel from "./_components/ProgressChart"
import { useRouter } from 'next/navigation'

function Dashboard() {
  const router = useRouter();

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 mt-4">
        {/* Progress chart */}
        <div>
          <ProgressChartWithLabel
            title="Your Progress"
            description="This graph shows your progress from the last 10 tests"
          />
        </div>

        {/* AZF/BZF clickable cards */}
        <div className="flex justify-center space-x-4 mt-4 mb-4">
          <ClickableCard
            title="AZF Practice"
            description="Click here to start practicing your AZF theory"
            onClick={() => router.push('/test/new?pool=azf')}
          />
          <ClickableCard
            title="BZF Practice"
            description="Click here to start practicing your BZF theory"
            onClick={() => router.push('/test/new?pool=bzf')}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard