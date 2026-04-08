import { DailyEntry } from "@/lib/health-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface HistoryTableProps {
  entries: DailyEntry[];
}

const HistoryTable = ({ entries }: HistoryTableProps) => {
  if (entries.length === 0) {
    return (
      <Card className="card-shadow border-0">
        <CardHeader><CardTitle className="text-lg font-semibold">📊 History</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">No entries yet. Save today's data to start tracking!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-shadow border-0">
      <CardHeader><CardTitle className="text-lg font-semibold">📊 History (Last 7 days)</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">💧 Water</TableHead>
              <TableHead className="text-center">😴 Sleep</TableHead>
              <TableHead className="text-center">🚶 Steps</TableHead>
              <TableHead className="text-center">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.date}>
                <TableCell className="font-medium">{new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</TableCell>
                <TableCell className="text-center">{entry.water}</TableCell>
                <TableCell className="text-center">{entry.sleep}h</TableCell>
                <TableCell className="text-center">{entry.steps.toLocaleString()}</TableCell>
                <TableCell className="text-center font-semibold">{entry.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HistoryTable;
