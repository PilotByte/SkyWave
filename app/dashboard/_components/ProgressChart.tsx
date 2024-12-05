'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    CartesianGrid,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

const data: any[] = [
    { subject: 'Math', score: 85, questions: 20, date: '2023-01-01' },
    { subject: 'Science', score: 90, questions: 25, date: '2023-01-02' },
    { subject: 'History', score: 92, questions: 15, date: '2023-01-03' },
    { subject: 'English', score: 99, questions: 18, date: '2023-01-04' },
    { subject: 'Physics', score: 94, questions: 22, date: '2023-01-05' },
    { subject: 'Chemistry', score: 96, questions: 20, date: '2023-01-06' },
]

const ProgressChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%" className="min-w-full md:h-full md:min-h-[250px] aspect-video">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                    dataKey="subject"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                    content={(props) => {
                        const { payload } = props
                        if (!payload || payload.length === 0) return null
                        const { subject, score, questions, date } = payload[0].payload
                        return (
                            <div className="bg-background p-2 rounded-lg border">
                                <p className="font-bold">{subject}</p>
                                <div className="flex justify-between">
                                    <p>Score: </p>
                                    <p className="font-thin text-muted-foreground">{`${score}%`}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Date: </p>
                                    <p className="font-thin text-muted-foreground">{date}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Questions: </p>
                                    <p className="font-thin text-muted-foreground">{questions}</p>
                                </div>
                            </div>
                        )
                    }}
                />
                <ReferenceLine
                    y={75}
                    stroke="currentColor"
                    strokeDasharray="3 3"
                    label={{ value: 'Pass mark: 75%', position: 'insideTopRight', fontSize: 12, fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ strokeWidth: 2 }} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default function ProgressChartWithLabel({
    title = "Your Progress",
    description = "Track your scores across different subjects",
    label = "Subject Performance",
    chartDescription = "This chart shows your scores in various subjects over time"
}) {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
                <CardDescription className="text-center text-muted-foreground">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* <div>
                        <Label htmlFor="progress-chart" className="text-lg font-medium">
                            {label}
                        </Label>
                        <p id="progress-chart-description" className="text-sm text-muted-foreground">
                            {chartDescription}
                        </p>
                    </div> */}
                    <div 
                        id="progress-chart"
                        aria-describedby="progress-chart-description"
                        className="h-[300px]"
                    >
                        <ProgressChart />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export { ProgressChart }
export { ProgressChartWithLabel }