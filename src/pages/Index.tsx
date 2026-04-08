import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import HealthScore from "@/components/HealthScore";
import HabitSlider from "@/components/HabitSlider";
import DailyTips from "@/components/DailyTips";
import HistoryTable from "@/components/HistoryTable";
import { calculateScore, saveEntry, loadHistory, DailyEntry } from "@/lib/health-utils";

const Index = () => {
  const [water, setWater] = useState(4);
  const [sleep, setSleep] = useState(6);
  const [steps, setSteps] = useState(5000);
  const [history, setHistory] = useState<DailyEntry[]>(() => loadHistory());

  const score = calculateScore(water, sleep, steps);

  const handleSave = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    const entry: DailyEntry = { date: today, water, sleep, steps, score };
    const updated = saveEntry(entry);
    setHistory(updated);
    toast.success("Today's data saved!");
  }, [water, sleep, steps, score]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="health-gradient px-4 py-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">🩺 Smart Health Habit Tracker</h1>
        <p className="mt-2 text-sm text-primary-foreground/80">Track your daily habits. Improve your lifestyle.</p>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        {/* Top row: Score + Habits */}
        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          {/* Health Score */}
          <Card className="card-shadow border-0 flex flex-col items-center justify-center py-8">
            <CardTitle className="text-lg font-semibold mb-4">Your Health Score</CardTitle>
            <HealthScore score={score} />
          </Card>

          {/* Habit Sliders */}
          <Card className="card-shadow border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Today's Habits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <HabitSlider label="Water Intake" icon="💧" value={water} max={16} unit="glasses" colorVar="--health-water" goalKey="water" onChange={setWater} />
              <HabitSlider label="Sleep" icon="😴" value={sleep} max={14} unit="hours" colorVar="--health-sleep" goalKey="sleep" onChange={setSleep} />
              <HabitSlider label="Steps Walked" icon="🚶" value={steps} max={20000} unit="steps" colorVar="--health-steps" goalKey="steps" onChange={setSteps} />
              <Button onClick={handleSave} className="w-full health-gradient border-0 text-primary-foreground hover:opacity-90 transition-opacity">
                <Save className="mr-2 h-4 w-4" /> Save Today's Data
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom row: Tips + History */}
        <div className="grid gap-6 md:grid-cols-2">
          <DailyTips />
          <HistoryTable entries={history} />
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-muted-foreground">
        Smart Health Habit Tracker &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Index;
