'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircle, BarChart2, Clock, Trash2, Brain, Sparkles, Atom } from "lucide-react"
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
  priority: "Low" | "Medium" | "Urgent"
  date: string
  timeAgo: string
  progress: number
  aiSuggestion?: string
  quantumState?: "Superposition" | "Entangled" | "Collapsed"
}

type Column = {
  title: string
  tasks: Task[]
}

const initialColumns: Column[] = [
  {
    title: "College Backlog",
    tasks: [
      {
        id: "1",
        title: "Implement Quantum AI Assistant",
        description: "Integrate quantum-enhanced GPT-5 for task suggestions",
        priority: "Urgent",
        date: "August 15, 2025",
        timeAgo: "2 hrs ago",
        progress: 0,
        aiSuggestion: "Utilize quantum entanglement for instant task updates across parallel universes.",
        quantumState: "Superposition",
      },
      {
        id: "2",
        title: "Design 5D Holographic UI",
        description: "Create 5D holographic interface with time manipulation",
        priority: "Medium",
        date: "August 18, 2025",
        timeAgo: "1 day ago",
        progress: 0,
        quantumState: "Entangled",
      },
    ],
  },
  {
    title: "In Flux",
    tasks: [
      {
        id: "3",
        title: "Quantum Computing Integration",
        description: "Implement quantum algorithms for task optimization across multiverses",
        priority: "Medium",
        date: "August 20, 2025",
        timeAgo: "3 hrs ago",
        progress: 35,
        quantumState: "Superposition",
      },
    ],
  },
  {
    title: "Reality Verification",
    tasks: [
      {
        id: "4",
        title: "Neuro-Quantum Interface Testing",
        description: "Conduct trials for thought-based task creation and quantum entanglement",
        priority: "Urgent",
        date: "August 22, 2025",
        timeAgo: "5 hrs ago",
        progress: 80,
        quantumState: "Collapsed",
      },
    ],
  },
  {
    title: "Transcended",
    tasks: [
      {
        id: "5",
        title: "Temporal Paradox Resolution",
        description: "Implement causality-preserving time loop for task completion",
        priority: "Low",
        date: "August 25, 2025",
        timeAgo: "2 days ago",
        progress: 100,
        quantumState: "Collapsed",
      },
    ],
  },
]

function PriorityBadge({ priority }: { priority: Task["priority"] }) {
  const colorMap = {
    Low: "bg-green-500",
    Medium: "bg-orange-500",
    Urgent: "bg-red-500",
  }

  return (
    <Badge variant="outline" className={`${colorMap[priority]} text-black`}>
      {priority}
    </Badge>
  )
}

function QuantumStateBadge({ state }: { state: Task["quantumState"] }) {
  const colorMap = {
    Superposition: "bg-purple-500",
    Entangled: "bg-blue-500",
    Collapsed: "bg-gray-500",
  }

  return (
    <Badge variant="outline" className={`${colorMap[state]} text-black`}>
      {state}
    </Badge>
  )
}

export default function TaskBoard() {
  const [columns, setColumns] = useState(initialColumns)
  const { theme, setTheme } = useTheme()
  const [isHolographic, setIsHolographic] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) => ({
            ...task,
            progress: task.progress < 100 ? task.progress + 1 : 100,
            quantumState:
              task.quantumState === "Superposition"
                ? Math.random() > 0.5
                  ? "Entangled"
                  : "Superposition"
                : task.quantumState,
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
                  title: "New Quantum Task",
                  description: "Describe the task across multiple realities",
                  priority: "Medium",
                  date: new Date().toLocaleDateString(),
                  timeAgo: "Just now",
                  progress: 0,
                  quantumState: "Superposition",
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

  return (
    <div className={`container mx-auto p-4 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} text-primary min-h-screen transition-all duration-500 ${isHolographic ? "holographic" : ""}`}>
      <style jsx global>{`
        .holographic {
          background: radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,128,128,0.2) 100%);
          animation: holoPulse 5s infinite alternate;
        }
        @keyframes holoPulse {
          0% { box-shadow: 0 0 10px rgba(0,255,255,0.5); }
          100% { box-shadow: 0 0 50px rgba(0,255,255,0.8); }
        }
        .quantum-card {
          backdrop-filter: blur(10px);
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
        }
      `}</style>
      <motion.h1
        className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
      >
        Task Board
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <motion.div
            key={column.title}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between bg-primary-foreground p-3 rounded-lg backdrop-blur-lg">
              <h2 className="text-xl font-bold text-primary">{column.title}</h2>
              <Button variant="ghost" size="icon" onClick={() => handleAddTask(column.title)}>
                <PlusCircle className="h-5 w-5 text-primary" />
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
                  <Card className="quantum-card hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span className="text-primary">{task.title}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                                <Trash2 className="h-4 w-4 text-red-400" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Task</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                      <div className="flex items-center justify-between mb-2">
                        <PriorityBadge priority={task.priority} />
                        <QuantumStateBadge state={task.quantumState} />
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center mb-2">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{task.date}</span>
                        <span className="ml-2">{task.timeAgo}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Quantum Coherence</span>
                          <span className="text-xs text-primary">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>
                      {task.aiSuggestion && (
                        <motion.div
                          className="mt-3 bg-primary-foreground bg-opacity-30 p-2 rounded-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="flex items-center text-xs text-primary mb-1">
                            <Brain className="h-3 w-3 mr-1" />
                            Quantum AI Insight
                          </div>
                          <p className="text-xs text-muted-foreground">{task.aiSuggestion}</p>
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
        <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <BarChart2 className="mr-2 h-4 w-4" />
          Generate Quantum Insights
        </Button>
        <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <Sparkles className="mr-2 h-4 w-4" />
          Toggle Reality
        </Button>
        <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setIsHolographic(!isHolographic)}>
          <Atom className="mr-2 h-4 w-4" />
          Holographic Mode
        </Button>
      </div>
    </div>
  )
}