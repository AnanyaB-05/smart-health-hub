import { Slider } from "@/components/ui/slider";
import { GOALS } from "@/lib/health-utils";

interface HabitSliderProps {
  label: string;
  icon: string;
  value: number;
  max: number;
  unit: string;
  colorVar: string;
  goalKey: keyof typeof GOALS;
  onChange: (value: number) => void;
}

const HabitSlider = ({ label, icon, value, max, unit, colorVar, goalKey, onChange }: HabitSliderProps) => {
  const goal = GOALS[goalKey];
  const progress = Math.min((value / goal) * 100, 100);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="font-medium text-foreground">{label}</span>
        </div>
        <span className="text-sm font-semibold text-foreground">
          {value.toLocaleString()} <span className="text-muted-foreground font-normal">/ {goal.toLocaleString()} {unit}</span>
        </span>
      </div>
      <Slider
        value={[value]}
        max={max}
        step={goalKey === "steps" ? 500 : 0.5}
        onValueChange={([v]) => onChange(v)}
        className="w-full"
      />
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "hsl(var(--muted))" }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: `hsl(var(${colorVar}))` }}
        />
      </div>
    </div>
  );
};

export default HabitSlider;
