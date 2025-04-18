import { motion } from "framer-motion"
import { useState } from "react";
import FAQ from "./FAQ";

type Question = {
  id: number;
  alt: string;
  Icon: React.ElementType;
  question: string;
  answer: string;
};

type FAQListProps = {
  category: string;
  questions?: Question[];
  activeQuestion: number | null;
  handleQuestionClick: (id: number) => void;
};



export default function FAQList({
  category,
  questions,
  activeQuestion,
  handleQuestionClick,
} : FAQListProps) {
  const [inView, setInView] = useState(false);

  return (
    <motion.ul
      className="m-auto flex max-w-[51.625rem] flex-col gap-y-14 max-lg:gap-y-12"
      animate={inView ? "visible" : "visible"}
      key={category}
      layout
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          transition: {
            staggerChildren: 0.25,
            ease: "easeIn",
          },
        },
      }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      viewport={{ once: false, amount: 1 }}
    >
      {(questions ?? []).map((question) => (
        <FAQ
          key={question.id}
          question={question}
          activeQuestion={activeQuestion}
          handleQuestionClick={handleQuestionClick}
        />
      ))}
    </motion.ul>
  );
}