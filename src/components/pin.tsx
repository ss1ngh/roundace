import { Interview } from "@/types";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { TooltipButton } from "./tooltip-button";
import { Eye, Newspaper, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface InterviewPinProps {
  interview: Interview;
  onMockPage?: boolean;
}

export const InterviewPin = ({
  interview,
  onMockPage = false,
}: InterviewPinProps) => {
  const navigate = useNavigate();

  const createdDate = new Date(interview?.createdAt.toDate());

  return (
    <div
      className={cn(
        "border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl p-6 transition-all hover:bg-white/10",
        "space-y-4 cursor-pointer"
      )}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-slate-200 font-semibold text-lg">{interview.position}</h3>
        {!onMockPage && (
          <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
            Active
          </span>
        )}
      </div>

      <p className="text-slate-400 text-sm">{interview.description}</p>

      <div className="w-full flex flex-wrap gap-2">
        {interview.techStack.split(",").map((tech, idx) => (
          <Badge
            key={idx}
            variant="outline"
            className="text-xs text-slate-300 border-white/10 hover:border-emerald-400 hover:bg-emerald-600/10 hover:text-emerald-300"
          >
            {tech.trim()}
          </Badge>
        ))}
      </div>

      <div
        className={cn(
          "w-full flex items-center pt-2 border-t border-white/10",
          onMockPage ? "justify-end" : "justify-between"
        )}
      >
        <p className="text-[12px] text-slate-500">
          {createdDate.toLocaleDateString("en-US", {
            dateStyle: "long",
          })}{" "}
          -{" "}
          {createdDate.toLocaleTimeString("en-US", {
            timeStyle: "short",
          })}
        </p>

        {!onMockPage && (
          <div className="flex gap-1">
            <TooltipButton
              content="View"
              buttonVariant="ghost"
              onClick={() => navigate(`/generate/${interview.id}`, { replace: true })}
              disabled={false}
              buttonClassName="hover:text-sky-500"
              icon={<Eye />}
              loading={false}
            />
            <TooltipButton
              content="Feedback"
              buttonVariant="ghost"
              onClick={() => navigate(`/generate/feedback/${interview.id}`, { replace: true })}
              disabled={false}
              buttonClassName="hover:text-yellow-500"
              icon={<Newspaper />}
              loading={false}
            />
            <TooltipButton
              content="Start"
              buttonVariant="ghost"
              onClick={() => navigate(`/generate/interview/${interview.id}`, { replace: true })}
              disabled={false}
              buttonClassName="hover:text-violet-500"
              icon={<Sparkles />}
              loading={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};
