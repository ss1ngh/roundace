import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Volume2, VolumeX } from "lucide-react";
import { RecordAnswer } from "./record-answer";

interface QuestionSectionProps {
  questions: { question: string; answer: string }[];
}

export const QuestionSection = ({ questions }: QuestionSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWebCam, setIsWebCam] = useState(false);
  const [currentSpeech, setCurrentSpeech] =
    useState<SpeechSynthesisUtterance | null>(null);

  const handlePlayQuestion = (qst: string) => {
    if (isPlaying && currentSpeech) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(qst);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
        setCurrentSpeech(speech);

        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        };
      }
    }
  };

  return (
    <div className="relative border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl p-6 w-full overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-700 rounded-full blur-3xl opacity-20 -z-10" />

      <Tabs
        defaultValue={questions[0]?.question}
        className="w-full space-y-6"
        orientation="vertical"
      >
        <TabsList className="w-full flex flex-wrap gap-4 bg-transparent justify-start">
          {questions?.map((tab, i) => (
            <TabsTrigger
              key={tab.question}
              value={tab.question}
              className={cn(
                "text-sm text-slate-300 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md",
                "hover:bg-white/10 hover:text-white transition-all",
                "data-[state=active]:bg-indigo-500/20 data-[state=active]:text-white data-[state=active]:shadow"
              )}
            >
              {`Question #${i + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>

        {questions?.map((tab, i) => (
          <TabsContent key={i} value={tab.question} className="pt-4">
            <div className="space-y-4">
              <p className="text-slate-300 text-lg tracking-wide">{tab.question}</p>

              <div className="flex justify-end">
                <TooltipButton
                  content={isPlaying ? "Stop" : "Start"}
                  icon={
                    isPlaying ? (
                      <VolumeX className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-muted-foreground" />
                    )
                  }
                  onClick={() => handlePlayQuestion(tab.question)}
                />
              </div>

              <RecordAnswer
                question={tab}
                isWebCam={isWebCam}
                setIsWebCam={setIsWebCam}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
