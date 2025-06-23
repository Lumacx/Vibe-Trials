import Link from "next/link";
import { Button } from "@vibe-components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@vibe-components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vibe-components/ui/tabs";
import AudioPlayer from "@vibe-components/AudioPlayer";
import { ArrowLeft } from "lucide-react";

const backgroundMusic = "/music/7_Eternal_Horizon.mp3";

const games = [
  { name: "Flame Frenzy", data: [
    { rank: 1, player: "PLAYER1", score: 10500 },
    { rank: 2, player: "PLAYER2", score: 9800 },
    { rank: 3, player: "PLAYER3", score: 8500 },
  ]},
  { name: "Stone Labyrinth", data: [
    { rank: 1, player: "PLAYER_S", score: 5500 },
    { rank: 2, player: "ROCKY", score: 5210 },
    { rank: 3, player: "GOLEM", score: 4900 },
  ]},
  { name: "Sky Guardian", data: [
    { rank: 1, player: "ACE", score: 25000 },
    { rank: 2, player: "WINGMAN", score: 23100 },
    { rank: 3, player: "ZEPHYR", score: 21050 },
  ]},
  { name: "Hydro Heroes", data: [
    { rank: 1, player: "AQUA", score: 15700 },
    { rank: 2, player: "CHIEF", score: 14200 },
    { rank: 3, player: "HOSE_MASTER", score: 13300 },
  ]},
  { name: "Forest Crossing", data: [
    { rank: 1, player: "LEAPY", score: 6500 },
    { rank: 2, player: "FROGGER_X", score: 6000 },
    { rank: 3, player: "ROADKILL_NOT", score: 5800 },
  ]},
];

export default function LeaderboardPage() {
  return (
    <>
      <AudioPlayer src={backgroundMusic} loop={true} />

    <div className="container mx-auto flex min-h-screen flex-col items-center p-4 pt-16 sm:p-8">
      <header className="text-center">
        <h1 className="font-headline text-6xl font-bold text-primary">
          Leaderboard
        </h1>
        <p className="mt-2 text-muted-foreground">Top scores from the Vibe Trials</p>
      </header>
      
      <Tabs defaultValue={games[0].name} className="w-full max-w-4xl mt-8">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
            {games.map(game => (
                <TabsTrigger key={game.name} value={game.name}>{game.name}</TabsTrigger>
            ))}
        </TabsList>
        {games.map(game => (
            <TabsContent key={game.name} value={game.name}>
                <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] text-accent">Rank</TableHead>
                        <TableHead className="text-accent">Player</TableHead>
                        <TableHead className="text-right text-accent">Score</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {game.data.map(entry => (
                        <TableRow key={entry.rank}>
                        <TableCell className="font-medium">{entry.rank}</TableCell>
                        <TableCell>{entry.player}</TableCell>
                        <TableCell className="text-right font-code">{entry.score}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            </TabsContent>
        ))}
      </Tabs>

      <Link href="/" passHref className="mt-12">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Hub
          </Button>
        </Link>
      </div>
    </>
  );
}