'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Code, Zap, BarChart2, Clock, Trash2, Cpu, Gamepad, Trophy, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"

type Task = {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard" | "Epic"
  date: string
  timeAgo: string
  progress: number
  aiSuggestion?: string
  codeSnippet?: string
  xpReward: number
  techStack: string[]
}

type Column = {
  title: string
  tasks: Task[]
}

const initialColumns: Column[] = [
  {
    title: "Backlog Quests",
    tasks: [
      {
        id: "1",
        title: "Implement Quantum Algorithm Visualizer",
        description: "Create an interactive visualizer for quantum computing algorithms",
        difficulty: "Epic",
        date: "2025-08-15",
        timeAgo: "2 hrs ago",
        progress: 0,
        aiSuggestion: "Consider using WebGL for high-performance 3D rendering of quantum states.",
        codeSnippet: "function initQuantumVisualizer() {\n  const qubits = initializeQubits(5);\n  // TODO: Implement visualization logic\n}",
        xpReward: 1000,
        techStack: ["TypeScript", "React", "WebGL", "Quantum JS"],
      },
      {
        id: "2",
        title: "Develop AI Code Review Bot",
        description: "Create an AI-powered bot for automated code reviews",
        difficulty: "Hard",
        date: "2025-08-18",
        timeAgo: "1 day ago",
        progress: 0,
        codeSnippet: "class AICodeReviewer {\n  constructor() {\n    this.model = loadNeuralNetwork('code-review-v2');\n  }\n}",
        xpReward: 750,
        techStack: ["Python", "TensorFlow", "NLP", "Git API"],
      },
    ],
  },
  {
    title: "In Development",
    tasks: [
      {
        id: "3",
        title: "Build Neuro-Symbolic IDE Plugin",
        description: "Develop an IDE plugin that combines neural networks with symbolic AI for code suggestions",
        difficulty: "Hard",
        date: "2025-08-20",
        timeAgo: "3 hrs ago",
        progress: 35,
        codeSnippet: "const generateCodeSuggestion = async (context) => {\n  const symbolicRules = extractContextRules(context);\n  return await neuralSymbolicInference(symbolicRules);\n}",
        xpReward: 800,
        techStack: ["JavaScript", "Python", "VSCode API", "TensorFlow.js"],
      },
    ],
  },
  {
    title: "Code Review",
    tasks: [
      {
        id: "4",
        title: "Optimize Distributed Systems Simulator",
        description: "Enhance performance of the multi-node distributed systems simulator",
        difficulty: "Medium",
        date: "2025-08-22",
        timeAgo: "5 hrs ago",
        progress: 80,
        codeSnippet: "class DistributedNode {\n  async processMessage(msg: Message) {\n    // TODO: Implement Raft consensus algorithm\n  }\n}",
        xpReward: 500,
        techStack: ["Rust", "WebAssembly", "WebWorkers"],
      },
    ],
  },
  {
    title: "Deployed",
    tasks: [
      {
        id: "5",
        title: "Launch Holographic Code Projection",
        description: "Release the AR app for projecting and manipulating code in 3D space",
        difficulty: "Epic",
        date: "2025-08-25",
        timeAgo: "2 days ago",
        progress: 100,
        codeSnippet: "function projectCodeHologram(codeBase: CodeBase, space: 3DSpace) {\n  return space.createHolographicProjection(codeBase.toAbstractSyntaxTree());\n}",
        xpReward: 1500,
        techStack: ["C++", "OpenGL", "ARKit", "ARCore"],
      },
    ],
  },
]

function DifficultyBadge({ difficulty }: { difficulty: Task["difficulty"] }) {
  const colorMap = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-red-500",
    Epic: "bg-purple-500",
  }

  return (
    <Badge variant="outline" className={`${colorMap[difficulty]} text-black`}>
      {difficulty}
    </Badge>
  )
}

function TechStackBadge({ tech }: { tech: string }) {
  return (
    <Badge variant="outline" className="bg-blue-500 text-white text-xs mr-1 mb-1">
      {tech}
    </Badge>
  )
}

export default function TaskBoard() {
  const [columns, setColumns] = useState(initialColumns)
  const { theme, setTheme } = useTheme()
  const [xp, setXp] = useState(0)
  const [level, setLevel] = useState(1)
  const [isNeonMode, setIsNeonMode] = useState(false)

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
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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
                  title: "New Coding Quest",
                  description: "Embark on a new coding adventure",
                  difficulty: "Medium",
                  date: new Date().toISOString().split('T')[0],
                  timeAgo: "Just now",
                  progress: 0,
                  codeSnippet: "// TODO: Write epic code here",
                  xpReward: 100,
                  techStack: ["JavaScript", "React"],
                },
              ],
            }
          : column
      )
    )
  }

  const handleDeleteTask = (taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      }))
    )
  }

  const handleCompleteTask = (task: Task) => {
    const newXp = xp + task.xpReward
    setXp(newXp)
    if (newXp >= level * 1000) {
      setLevel(level + 1)
    }
    handleDeleteTask(task.id)
  }

  return (
    <div className={`container mx-auto p-4 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} text-primary min-h-screen transition-all duration-500 ${isNeonMode ? "neon-bg" : ""}`}>
      <style jsx global>{`
        .neon-bg {
          background: linear-gradient(to right, #000000, #434343);
          animation: neonPulse 5s infinite alternate;
        }
        @keyframes neonPulse {
          0% { box-shadow: 0 0 5px #ff00de, 0 0 10px #ff00de, 0 0 20px #ff00de, 0 0 40px #ff00de; }
          100% { box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 80px #00ffff; }
        }
        .cyber-card {
          backdrop-filter: blur(10px);
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }
        .code-snippet {
          background: rgba(0, 0, 0, 0.8);
          border-radius: 4px;
          padding: 8px;
          font-family: 'Fira Code', monospace;
          white-space: pre-wrap;
          word-break: break-all;
          border-left: 3px solid #00ffff;
        }
      `}</style>
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        Task Board
        </h1>
        <div className="flex justify-center items-center space-x-4">
          <Badge variant="outline" className="bg-yellow-500 text-black">
            Level {level}
          </Badge>
          <Progress value={(xp % 1000) / 10} className="w-64 h-2 bg-gray-700" indicatorClassName="bg-blue-500" />
          <span className="text-sm">{xp} XP</span>
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
              <h2 className="text-xl font-bold text-blue-400">{column.title}</h2>
              <Button variant="ghost" size="icon" onClick={() => handleAddTask(column.title)}>
                <Terminal className="h-5 w-5 text-green-400" />
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
                  <Card className="cyber-card hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span className="text-blue-400">{task.title}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => handleCompleteTask(task)}>
                                <Trophy className="h-4 w-4 text-yellow-400" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Complete Quest</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300 mb-2">{task.description}</p>
                      <div className="flex items-center justify-between mb-2">
                        <DifficultyBadge difficulty={task.difficulty} />
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-yellow-400 text-sm">{task.xpReward} XP</span>
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
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">Progress</span>
                          <span className="text-xs text-blue-400">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2 bg-gray-700" indicatorClassName="bg-blue-500" />
                      </div>
                      {task.codeSnippet && (
                        <motion.div
                          className="mt-3 code-snippet text-green-400 text-xs"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Code className="h-3 w-3 mr-1 inline" />
                          Code Snippet:
                          <pre className="mt-1">{task.codeSnippet}</pre>
                        </motion.div>
                      )}
                      {task.aiSuggestion && (
                        <motion.div
                          className="mt-3  bg-purple-900 bg-opacity-30 p-2 rounded-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="flex items-center text-xs text-purple-300 mb-1">
                            <Cpu className="h-3 w-3 mr-1" />
                            AI Insight
                          </div>
                          <p className="text-xs text-purple-200">{task.aiSuggestion}</p>
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
        <Button variant="outline" className="bg-blue-700 text-blue-100 hover:bg-blue-600">
          <BarChart2 className="mr-2 h-4 w-4" />
          View Coder Stats
        </Button>
        <Button variant="outline" className="bg-purple-700 text-purple-100 hover:bg-purple-600" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <Zap className="mr-2 h-4 w-4" />
          Toggle Theme
        </Button>
        <Button variant="outline" className="bg-green-700 text-green-100 hover:bg-green-600" onClick={() => setIsNeonMode(!isNeonMode)}>
          <Gamepad className="mr-2 h-4 w-4" />
          Neon Mode
        </Button>
      </div>
    </div>
  )
}