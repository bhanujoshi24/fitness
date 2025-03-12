import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Calendar, Dumbbell, CheckCircle2 } from 'lucide-react';

const workoutData = {
  Monday: {
    title: "Full-Body Strength + Cardio",
    exercises: [
      {
        name: "Squats",
        target: "Legs, Glutes",
        reps: "12-15 reps",
        sets: "3",
        notes: "Focus on form, increase weight weekly",
        video: "MLoZuAkIyZI"
      },
      {
        name: "Push-Ups",
        target: "Chest, Arms",
        reps: "5-8 reps",
        sets: "3",
        notes: "Modified if needed",
        video: "RmRvMq2TcVg"
      },
      {
        name: "Bent-Over Rows",
        target: "Back, Biceps",
        reps: "10 reps",
        sets: "3",
        notes: "Dumbbell/Barbell",
        video: "vN8xskk-7G8"
      },
      {
        name: "Glute Bridges",
        target: "Glutes, Core",
        reps: "15 reps",
        sets: "3",
        notes: "Squeeze at top",
        video: "ktSiNvWzYWY"
      },
      {
        name: "Jump Rope",
        target: "Cardio",
        reps: "3 mins",
        sets: "-",
        notes: "Intense skipping",
        video: "lRVaGY7ZbVM"
      }
    ]
  },
  Tuesday: {
    title: "HIIT + Core",
    exercises: [
      {
        name: "Jump Squats",
        target: "Legs, Glutes",
        reps: "40 sec work",
        sets: "3",
        notes: "Explosive jumps",
        video: "dZhtrTZ9NTE"
      },
      {
        name: "Mountain Climbers",
        target: "Full Body",
        reps: "40 sec",
        sets: "3",
        notes: "Fast pace",
        video: "BF6tzsTmGMk"
      },
      {
        name: "Plank-to-Pushup",
        target: "Core, Arms",
        reps: "12 reps",
        sets: "3",
        notes: "Control movement",
        video: "9PMGJqQnrGc"
      },
      {
        name: "Russian Twists",
        target: "Abs, Obliques",
        reps: "20 reps",
        sets: "3",
        notes: "Weighted or bodyweight",
        video: "C3RauLi8FNw"
      },
      {
        name: "Burpees",
        target: "Full Body",
        reps: "30 sec",
        sets: "3",
        notes: "Max effort",
        video: "zlYA1SENYG4"
      }
    ]
  },
  Wednesday: {
    title: "Lower Body Strength",
    exercises: [
      {
        name: "Bulgarian Split Squat",
        target: "Legs, Glutes",
        reps: "12 reps per leg",
        sets: "3",
        notes: "Balance focus",
        video: "9p5e2BSvoLs"
      },
      {
        name: "Romanian Deadlift",
        target: "Hamstrings, Glutes",
        reps: "8 reps",
        sets: "3",
        notes: "Moderate weight",
        video: "_TchJLlBO-4"
      },
      {
        name: "Calf Raises",
        target: "Calves",
        reps: "15 reps",
        sets: "3",
        notes: "Slow control",
        video: "haHcBAd637E"
      },
      {
        name: "Jump Rope",
        target: "Cardio",
        reps: "5 mins",
        sets: "-",
        notes: "Increase speed",
        video: "lRVaGY7ZbVM"
      }
    ]
  },
  Thursday: {
    title: "Upper Body Strength + Cardio",
    exercises: [
      {
        name: "Shoulder Press",
        target: "Shoulders, Triceps",
        reps: "12 reps",
        sets: "3",
        notes: "Control movement",
        video: "k6tzKisR3NY"
      },
      {
        name: "Lat Pulldown",
        target: "Back",
        reps: "12 reps",
        sets: "3",
        notes: "Machine/Dumbbells",
        video: "CC45F_iEvdU"
      },
      {
        name: "Bicep Curls",
        target: "Biceps",
        reps: "15 reps",
        sets: "3",
        notes: "Slow movement",
        video: "09AYfVFf7pg"
      },
      {
        name: "Side Plank Dips",
        target: "Core, Obliques",
        reps: "15 reps",
        sets: "3",
        notes: "Each side",
        video: "WVX-yDxt0IU"
      },
      {
        name: "Stair Climbing",
        target: "Cardio",
        reps: "10 mins",
        sets: "-",
        notes: "Increase speed",
        video: "PYSvh3BGnIc"
      }
    ]
  },
  Friday: {
    title: "Glutes + Core Focus",
    exercises: [
      {
        name: "Hip Thrusts",
        target: "Glutes",
        reps: "12 reps",
        sets: "3",
        notes: "Use weights",
        video: "XZ52CZnPKq4"
      },
      {
        name: "Deadlifts",
        target: "Full Body",
        reps: "16-8 reps",
        sets: "3",
        notes: "Form focus",
        video: "OY_xS3_eLzM"
      },
      {
        name: "Bicycle Crunches",
        target: "Abs, Obliques",
        reps: "20 reps",
        sets: "3",
        notes: "Slow controlled",
        video: "uHHJOP68o6k"
      },
      {
        name: "Hanging Leg Raises",
        target: "Core",
        reps: "12 reps",
        sets: "3",
        notes: "Core activation",
        video: "2VEzoXAX-Ws"
      }
    ]
  },
  Saturday: {
    title: "Cardio + Bodyweight HIIT",
    exercises: [
      {
        name: "Sprints",
        target: "Cardio",
        reps: "30 sec",
        sets: "5",
        notes: "High intensity",
        video: "IQnDZf7Ail0"
      },
      {
        name: "Jumping Jacks",
        target: "Full Body",
        reps: "40 sec",
        sets: "3",
        notes: "Side-to-side",
        video: "PSf5jyb3GjY"
      },
      {
        name: "Jump Lunges",
        target: "Legs, Glutes",
        reps: "12 reps",
        sets: "3",
        notes: "Explosive jumps",
        video: "GO8svp7cfMI"
      },
      {
        name: "Rope Slams",
        target: "Arms, Core",
        reps: "30 sec",
        sets: "3",
        notes: "Power slams",
        video: "hKNB5_TLUb0"
      }
    ]
  },
  Sunday: {
    title: "Rest / Active Recovery",
    exercises: [
      {
        name: "Light Stretching",
        target: "Full Body",
        reps: "15-20 mins",
        sets: "-",
        notes: "Focus on breathing and flexibility",
        video: "dRmM9CKJyFg"
      }
    ]
  }
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getCurrentDay() {
  const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  return day;
}

function VideoDialog({ isOpen, onClose, videoUrl }: { isOpen: boolean; onClose: () => void; videoUrl: string }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoUrl}`}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ExerciseCard({ exercise, index }: { exercise: any; index: number }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Card className={`mb-4 overflow-hidden transition-all duration-300 ${isCompleted ? 'bg-green-50' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center h-6">
              <Checkbox
                checked={isCompleted}
                onCheckedChange={(checked) => setIsCompleted(!!checked)}
                className="data-[state=checked]:bg-green-600"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className={`text-lg font-semibold mb-2 ${isCompleted ? 'text-green-700' : ''}`}>
                  {exercise.name}
                </h3>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-600"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </motion.div>
                )}
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Target:</span> {exercise.target}</p>
                <p><span className="font-medium">Sets:</span> {exercise.sets}</p>
                <p><span className="font-medium">Reps:</span> {exercise.reps}</p>
                {exercise.notes && (
                  <p className="text-xs italic">{exercise.notes}</p>
                )}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="h-5 w-5" />
            </motion.button>
          </div>
        </CardContent>
      </Card>
      <VideoDialog
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={exercise.video}
      />
    </motion.div>
  );
}

function DayTab({ day }: { day: string }) {
  const exercises = workoutData[day as keyof typeof workoutData]?.exercises || [];

  return (
    <TabsContent value={day} className="mt-4">
      <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Calendar className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-semibold">{workoutData[day as keyof typeof workoutData]?.title || day}</h2>
          </div>
          <AnimatePresence>
            {exercises.map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </ScrollArea>
    </TabsContent>
  );
}

export default function App() {
  const [activeDay, setActiveDay] = useState(getCurrentDay());

  useEffect(() => {
    // Update active day at midnight
    const timer = setInterval(() => {
      setActiveDay(getCurrentDay());
    }, 60000); // Check every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <motion.header 
        className="mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center space-x-2 mb-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Dumbbell className="h-8 w-8 text-purple-600" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900">Workout Plan</h1>
        </div>
      </motion.header>

      <Tabs value={activeDay} onValueChange={setActiveDay} className="w-full max-w-2xl mx-auto">
        <div className="sticky top-0 bg-gray-50 pb-4 z-10">
          <ScrollArea className="w-full">
            <TabsList className="w-full justify-start space-x-2 bg-white p-1 rounded-lg shadow-sm">
              {days.map((day) => (
                <TabsTrigger
                  key={day}
                  value={day}
                  className="px-4 py-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-300"
                >
                  {day.slice(0, 3)}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>
        </div>

        {days.map((day) => (
          <DayTab key={day} day={day} />
        ))}
      </Tabs>
    </div>
  );
}