"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Code,
  Zap,
  BarChart2,
  Clock,
  Trophy,
  Star,
  Cpu,
  Gamepad,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";

type Task = {
  id: string;
  title: string;
  description: string;
  complexity: "Trivial" | "Normal" | "Complex" | "Legendary";
  date: string;
  timeAgo: string;
  progress: number;
  aiSuggestion?: string;
  codeSnippet?: string;
  xpReward: number;
  techStack: string[];
  gitBranch: string;
};

type Column = {
  title: string;
  tasks: Task[];
};

const initialColumns: Column[] = [
  {
    title: "Backlog",
    tasks: [
      {
        id: "1",
        title: "Implement Quantum Circuit Simulator",
        description:
          "Create an interactive simulator for quantum circuits with real-time visualization",
        complexity: "Legendary",
        date: "2025-08-15",
        timeAgo: "2 hrs ago",
        progress: 0,
        aiSuggestion:
          "Utilize WebAssembly for high-performance quantum state calculations.",
        codeSnippet: `
function createQuantumCircuit(qubits: number): QuantumCircuit {
  return new QuantumCircuit(qubits).hadamard(0).cnot(0, 1);
}`,
        xpReward: 1000,
        techStack: ["TypeScript", "React", "WebAssembly", "Three.js"],
        gitBranch: "feature/quantum-simulator",
      },
      {
        id: "2",
        title: "Develop AI Code Completion Engine",
        description:
          "Create an AI-powered code completion engine with context-aware suggestions",
        complexity: "Complex",
        date: "2025-08-18",
        timeAgo: "1 day ago",
        progress: 0,
        codeSnippet: `
class AICodeCompleter {
  constructor(private model: TransformerModel) {}
  
  async complete(context: string): Promise<string> {
    return this.model.generate(context);
  }
}`,
        xpReward: 750,
        techStack: ["Python", "TensorFlow", "NLP", "VSCode API"],
        gitBranch: "feature/ai-code-completion",
      },
    ],
  },
  {
    title: "In Progress",
    tasks: [
      {
        id: "3",
        title: "Build Holographic Code Analyzer",
        description:
          "Develop a 3D holographic visualization for code structure and dependencies",
        complexity: "Complex",
        date: "2025-08-20",
        timeAgo: "3 hrs ago",
        progress: 35,
        codeSnippet: `
function createHolographicCodeMap(ast: AST): HolographicProjection {
  return new HolographicEngine()
    .createProjection(ast)
    .withForceDirectedLayout()
    .withInteractiveNodes();
}`,
        xpReward: 800,
        techStack: ["JavaScript", "Three.js", "WebGL", "AST Parser"],
        gitBranch: "feature/holographic-code-map",
      },
    ],
  },
  {
    title: "Review",
    tasks: [
      {
        id: "4",
        title: "Optimize Parallel Compilation Pipeline",
        description:
          "Enhance the multi-threaded compilation process for faster build times",
        complexity: "Normal",
        date: "2025-08-22",
        timeAgo: "5 hrs ago",
        progress: 80,
        codeSnippet: `
class ParallelCompiler {
  compile(sourceFiles: string[]): Promise<CompiledOutput> {
    return Promise.all(sourceFiles.map(file => 
      this.workerPool.runTask('compile', file)
    )).then(this.mergeOutputs);
  }
}`,
        xpReward: 500,
        techStack: ["Rust", "LLVM", "WebAssembly"],
        gitBranch: "optimize/parallel-compilation",
      },
    ],
  },
  {
    title: "Done",
    tasks: [
      {
        id: "5",
        title: "Launch Neural IDE",
        description:
          "Release the AI-powered IDE that adapts to individual coding styles",
        complexity: "Legendary",
        date: "2025-08-25",
        timeAgo: "2 days ago",
        progress: 100,
        codeSnippet: `
class NeuralIDE extends BaseIDE {
  async suggestRefactoring(codeBase: CodeBase): Promise<Refactoring[]> {
    const userStyle = await this.analyzeUserCodingStyle(codeBase);
    return this.neuralNetwork.generateRefactorings(codeBase, userStyle);
  }
}`,
        xpReward: 1500,
        techStack: ["TypeScript", "Electron", "TensorFlow.js", "GraphQL"],
        gitBranch: "release/neural-ide-v1",
      },
    ],
  },
];

function ComplexityBadge({ complexity }: { complexity: Task["complexity"] }) {
  const colorMap = {
    Trivial: "bg-green-500",
    Normal: "bg-blue-500",
    Complex: "bg-purple-500",
    Legendary: "bg-orange-500",
  };

  return (
    <Badge
      variant="outline"
      className={`${colorMap[complexity]} text-white font-bold`}
    >
      {complexity}
    </Badge>
  );
}

function TechStackBadge({ tech }: { tech: string }) {
  return (
    <Badge
      variant="outline"
      className="bg-gray-700 text-gray-200 text-xs mr-1 mb-1"
    >
      {tech}
    </Badge>
  );
}

export default function TaskBoard() {
  const [columns, setColumns] = useState(initialColumns);
  const { theme, setTheme } = useTheme();
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [isQuantumMode, setIsQuantumMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) => ({
            ...task,
            progress: task.progress < 100 ? task.progress + 1 : 100,
          })),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAddTask = (columnTitle: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.title === columnTitle
          ? {
              ...column,
              tasks: [
                ...column.tasks,
                {
                  id: Math.random().toString(36).substr(2, 9),
                  title: "New Coding Challenge",
                  description: "Embark on a new coding adventure",
                  complexity: "Normal",
                  date: new Date().toISOString().split("T")[0],
                  timeAgo: "Just now",
                  progress: 0,
                  codeSnippet: "// Your code here",
                  xpReward: 100,
                  techStack: ["JavaScript", "React"],
                  gitBranch: "feature/new-challenge",
                },
              ],
            }
          : column
      )
    );
  };

  const handleCompleteTask = (task: Task) => {
    const newXp = xp + task.xpReward;
    setXp(newXp);
    if (newXp >= level * 1000) {
      setLevel(level + 1);
    }
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((t) => t.id !== task.id),
      }))
    );
  };

  return (
    <div
      className={` mx-auto p-4 $text-primary min-h-screen transition-all duration-500 ${
        isQuantumMode ? "quantum-bg" : ""
      }`}
    >
      <style jsx global>{`
        .quantum-bg {
          background: linear-gradient(45deg, #000000, #1a1a2e);
          animation: quantumFlux 10s ease infinite;
        }
        @keyframes quantumFlux {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .futuristic-card {
          backdrop-filter: blur(10px);
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .code-snippet {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          padding: 8px;
          font-family: "Fira Code", monospace;
          white-space: pre-wrap;
          word-break: break-all;
          border-left: 3px solid #3b82f6;
        }
      `}</style>
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          Task Board
        </h1>
        <div className="flex justify-center items-center space-x-4">
          <Badge variant="outline" className="bg-blue-500 text-white px-3 py-1">
            Level {level}
          </Badge>
          <Progress
            value={(xp % 1000) / 10}
            className="w-64 h-2 bg-gray-700"
          />
          <span className="text-sm text-blue-400">{xp} XP</span>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <motion.div
            key={column.title}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg backdrop-blur-lg">
              <h2 className="text-xl font-bold text-blue-400">
                {column.title}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleAddTask(column.title)}
              >
                <Terminal className="h-5 w-5 text-blue-400" />
              </Button>
            </div>
            <AnimatePresence>
              {column.tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="futuristic-card hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span className="text-blue-400">{task.title}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCompleteTask(task)}
                              >
                                <Trophy className="h-4 w-4 text-yellow-400" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Complete Challenge</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300 mb-2">
                        {task.description}
                      </p>
                      <div className="flex items-center justify-between mb-2">
                        <ComplexityBadge complexity={task.complexity} />
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-yellow-400 text-sm">
                            {task.xpReward} XP
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap mb-2">
                        {task.techStack.map((tech) => (
                          <TechStackBadge key={tech} tech={tech} />
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center mb-2">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{task.date}</span>
                        <span className="ml-2">{task.timeAgo}</span>
                      </div>
                      <div className="text-xs text-gray-400 flex items-center mb-2">
                        <GitBranch className="h-3 w-3 mr-1" />
                        <span>{task.gitBranch}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs  text-gray-400">
                            Progress
                          </span>
                          <span className="text-xs text-blue-400">
                            {task.progress}%
                          </span>
                        </div>
                        <Progress
                          value={task.progress}
                          className="h-2 bg-gray-700"
                        />
                      </div>
                      {task.codeSnippet && (
                        <motion.div
                          className="mt-3 code-snippet text-blue-300 text-xs"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Code className="h-3 w-3 mr-1 inline" />
                          Code Snippet:
                          <pre className="mt-1 overflow-hidden">
                            {task.codeSnippet}
                          </pre>
                        </motion.div>
                      )}
                      {task.aiSuggestion && (
                        <motion.div
                          className="mt-3 bg-blue-900 bg-opacity-30 p-2 rounded-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="flex items-center text-xs text-blue-300 mb-1">
                            <Cpu className="h-3 w-3 mr-1" />
                            AI Insight
                          </div>
                          <p className="text-xs text-blue-200">
                            {task.aiSuggestion}
                          </p>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-center space-x-4">
        <Button
          variant="outline"
          className="bg-blue-700 text-blue-100 hover:bg-blue-600"
        >
          <BarChart2 className="mr-2 h-4 w-4" />
          Coder Analytics
        </Button>
        <Button
          variant="outline"
          className="bg-purple-700 text-purple-100 hover:bg-purple-600"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Zap className="mr-2 h-4 w-4" />
          Toggle Reality
        </Button>
        <Button
          variant="outline"
          className="bg-green-700 text-green-100 hover:bg-green-600"
          onClick={() => setIsQuantumMode(!isQuantumMode)}
        >
          <Gamepad className="mr-2 h-4 w-4" />
          Quantum Mode
        </Button>
      </div>
    </div>
  );
}
