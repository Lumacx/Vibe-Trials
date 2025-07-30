'use client'; // 🔥 Obligatorio

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioPlayer from "@/components/AudioPlayer";
import { useEffect, useState } from "react";
import { getScores, ScoreEntry } from "@/services/LeaderboardService";
import { ArrowLeft } from "lucide-react";

const backgroundMusic = "/music/7_Eternal_Horizon.mp3";

const games = [
  { name: "Flame Frenzy", data: [
    { rank: 1, player: "PLAYER1", score: 300 },
    { rank: 2, player: "PLAYER2", score: 200 },
    { rank: 3, player: "PLAYER3", score: 100 },
  ]},
  { name: "Stone Labyrinth", data: [
    { rank: 1, player: "PLAYER_S", score: 300 },
    { rank: 2, player: "ROCKY", score: 200 },
    { rank: 3, player: "GOLEM", score: 100 },
  ]},
  { name: "Sky Guardian", data: [
    { rank: 1, player: "ACE", score: 300 },
    { rank: 2, player: "WINGMAN", score: 200 },
    { rank: 3, player: "ZEPHYR", score: 50 },
  ]},
  { name: "Hydro Heroes", data: [
    { rank: 1, player: "AQUA", score: 300 },
    { rank: 2, player: "CHIEF", score: 200 },
    { rank: 3, player: "HOSE_MASTER", score: 100 },
  ]},
  { name: "Forest Crossing", data: [
    { rank: 1, player: "LEAPY", score: 300 },
    { rank: 2, player: "FROGGER_X", score: 100 },
    { rank: 3, player: "ROADKILL_NOT", score: 50 },
  ]},
];

export default function LeaderboardPage() {
  const [forestScores, setForestScores] = useState<ScoreEntry[]>([]);
  const [skyGuardianScores, setSkyGuardianScores] = useState<ScoreEntry[]>([]);
  const [flameFrenzyScores, setFlameFrenzyScores] = useState<ScoreEntry[]>([]);
  const [hydroHeroesScores, setHydroHeroesScores] = useState<ScoreEntry[]>([]); // Add state for Hydro Heroes scores
  const [stoneLabyrinthScores, setStoneLabyrinthScores] = useState<ScoreEntry[]>([]); // Add state for Stone Labyrinth scores

  useEffect(() => {
    setSkyGuardianScores(getScores('Sky Guardian'));
    setForestScores(getScores('Forest Crossing'));
    setStoneLabyrinthScores(getScores('Stone Labyrinth')); // Fetch Stone Labyrinth scores
    setFlameFrenzyScores(getScores('Flame Frenzy'));
    setHydroHeroesScores(getScores('Hydro Heroes')); // Fetch Hydro Heroes scores
  }, []);
  return (
    <>
      <AudioPlayer src={backgroundMusic} loop={true} />
      <div className="container mx-auto flex min-h-screen flex-col items-center p-4 pt-16 sm:p-8">
        <header className="text-center">
          <h1 className="font-headline text-6xl font-bold text-primary">Leaderboard</h1>
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
                    {game.name === 'Sky Guardian' ? (
                      skyGuardianScores.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{entry.playerName}</TableCell>
                          <TableCell className="text-right font-code">{entry.score}</TableCell>
                        </TableRow>
                      ))
                    ) : game.name === 'Flame Frenzy' ? (
                      flameFrenzyScores.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{entry.playerName}</TableCell>
                          <TableCell className="text-right font-code">{entry.score}</TableCell>
                        </TableRow>
                      ))
                    ) : game.name === 'Hydro Heroes' ? ( // Add condition for Hydro Heroes
                      hydroHeroesScores.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{entry.playerName}</TableCell>
                          <TableCell className="text-right font-code">{entry.score}</TableCell>
                        </TableRow>
                      ))
                    ) : game.name === 'Stone Labyrinth' ? ( // Add condition for Stone Labyrinth
                      stoneLabyrinthScores.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{entry.playerName}</TableCell>
                          <TableCell className="text-right font-code">{entry.score}</TableCell>
                        </TableRow>
                      ))
                    ) : game.name === 'Forest Crossing' ? (
                      forestScores.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{entry.playerName}</TableCell>
                          <TableCell className="text-right font-code">{entry.score}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      game.data.map(entry => (
                        <TableRow key={entry.rank}>
                          <TableCell className="font-medium">{entry.rank}</TableCell>
                          <TableCell>{entry.player}</TableCell>
                          <TableCell className="text-right font-code">{entry.score}</TableCell>
                        </TableRow>
                      ))
                    )}
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
