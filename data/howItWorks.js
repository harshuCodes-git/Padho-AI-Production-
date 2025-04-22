import {
  MessageCircleQuestion,
  NotebookText,
  Users,
  BarChart3,
} from "lucide-react";

export const howItWorks = [
  {
    title: "Ask Doubts Instantly",
    description:
      "Get real-time answers to your academic or technical questions using AI",
    icon: <MessageCircleQuestion className="w-8 h-8 text-primary" />,
  },
  {
    title: "Generate Smart Notes",
    description:
      "Build organized, easy-to-revise notes from any content or lecture",
    icon: <NotebookText className="w-8 h-8 text-primary" />,
  },
  {
    title: "Mock Interview Practice",
    description:
      "Simulate job interviews and receive feedback tailored to your field",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Stay Industry Ready",
    description:
      "Access the latest insights on skill trends and job market demand",
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
  },
];
