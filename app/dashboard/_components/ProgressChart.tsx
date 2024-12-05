'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tables } from '@/lib/supabase/database.types';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const ProgressChart = ({
  data,
}: {
  data: (Tables<'tests'> & {
    answers: Tables<'answers'>[];
  })[];
}) => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="min-w-full md:h-full md:min-h-[250px] aspect-video"
    >
      <LineChart
        data={data.map((t) => ({
          score:
            (t.answers.reduce((acc, a) => acc + (a.isCorrect ? 1 : 0), 0) /
              t.answers.length) *
            100,
          subject: t.subject,
          date: new Date(t.created_at).toLocaleDateString(),
          questions: t.answers.length,
        }))}
      >
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
            const { payload } = props;
            if (!payload || payload.length === 0) return null;
            const { subject, score, questions, date } = payload[0].payload;
            return (
              <div className="bg-background p-2 rounded-lg border font-thin min-w-[150px]">
                <p className="font-bold text-lg text-center">{subject}</p>
                <div className="flex justify-between">
                  <p>Score: </p>
                  <p className="font-light text-muted-foreground">{`${score}%`}</p>
                </div>
                <div className="flex justify-between">
                  <p>Date: </p>
                  <p className="font-light text-muted-foreground">{date}</p>
                </div>
                <div className="flex justify-between">
                  <p>Questions: </p>
                  <p className="font-light text-muted-foreground">
                    {questions}
                  </p>
                </div>
              </div>
            );
          }}
        />
        <ReferenceLine
          y={75}
          stroke="currentColor"
          strokeDasharray="3 3"
          label={{
            value: 'Pass mark: 75%',
            position: 'insideTopRight',
            fontSize: 12,
            fontWeight: 'bold',
          }}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default function ProgressChartWithLabel({
  title = 'Your Progress',
  description = 'Track your scores across different subjects',
  data,
}: {
  title: string;
  description: string;
  data: (Tables<'tests'> & {
    answers: Tables<'answers'>[];
  })[];
}) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {title}
        </CardTitle>
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
            <ProgressChart data={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { ProgressChart };
export { ProgressChartWithLabel };
