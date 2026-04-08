import { useState } from "react";
import { getRandomTips } from "@/lib/health-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const DailyTips = () => {
  const [tips, setTips] = useState(() => getRandomTips(3));

  return (
    <Card className="card-shadow border-0">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">💡 Daily Tips</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setTips(getRandomTips(3))} className="h-8 w-8">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {tips.map((tip, i) => (
          <div key={i} className="rounded-lg bg-accent/50 p-3 text-sm text-accent-foreground">
            {tip}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DailyTips;
