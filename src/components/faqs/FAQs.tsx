import { useState } from "react";
import { frequentlyAskedQuestions } from "@/utils/content";
import FAQList from "./FAQ-list";

const FAQs = () => {
  const [category, setCategory] = useState<string>("General");
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const categoryObj = frequentlyAskedQuestions
    .filter((obj) => obj.category === category)
    .at(0);

  const questionsArr = categoryObj?.questions;

  const handleQuestionClick = (id: number) =>
    id === activeQuestion ? setActiveQuestion(null) : setActiveQuestion(id);

  const handleCategoryClick = (category: string) => {
    setActiveQuestion(null);
    setCategory(category);
  };

  return (
    <section id="faqs" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 rounded-t-[2rem] 
              bg-[linear-gradient(to_top,_transparent_50%,_#4f46e5_80%,_#8f68f3_100%)]" />
      <div className="w-full max-w-[90rem] py-28">
        <h2 className="text-center text-slate-300 text-6xl/normal font-semibold tracking-tighter mb-4">
          Frequently Asked Questions
        </h2>
        <div className="mb-10 text-xl/loose">
          <p className="text-slate-300 font-semibold-thin text-center">
            The most commonly asked questions about RoundAce.
          </p>
        </div>
        <ul className="mb-16 text-slate-300 flex flex-wrap justify-center gap-x-3 gap-y-4 font-semibold">
          {frequentlyAskedQuestions.map((obj) => (
            <li key={obj.id}>
              <button
                onClick={() => handleCategoryClick(obj.category)}
                className={`border border-white/20 bg-white/10 hover:text-white hover:bg-white/20 backdrop-blur-lg rounded-3xl px-8 py-3.5 flex items-center w-fit gap-x-2 font-mono ${
                  obj.category === category}`}
              >
                {obj.category}
              </button>
            </li>
          ))}
        </ul>
        <FAQList
          category={category}
          questions={questionsArr}
          activeQuestion={activeQuestion}
          handleQuestionClick={handleQuestionClick}
        />
      </div>
    </section>
  );
};

export default FAQs;
