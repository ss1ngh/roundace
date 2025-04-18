import {
  Award,
  BrainCircuit,
  Briefcase,
  MonitorSmartphone,
  CreditCard,
  Gift,
  Repeat,
  ShieldCheck,
  MessagesSquare,
  HelpCircle,
  Video,
  TrendingUp,
  Globe,
  RefreshCcw,
  LifeBuoy,
} from "lucide-react";


const navigationLinks = [
  {
    id: 1,
    link: "Home",
    href: "#",
  },
  {
    id: 2,
    link: "Features",
    href: "/#features",
  },
  {
    id: 3,
    link: "FAQs",
    href: "/#faqs",
  },
];

const frequentlyAskedQuestions = [
  {
    category: "General",
    id: 1,
    questions: [
      {
        id: 1,
        alt: "Award Icon",
        Icon: Award,
        question: "What is RoundAce?",
        answer:
          "RoundAce is an AI-powered mock interview platform designed to help candidates prepare for job interviews. \
          It simulates real-world interview scenarios, enabling users to practice and improve their responses across various roles and industries.",
      },
      {
        id: 2,
        alt: "Brain Circuit Icon",
        Icon: BrainCircuit,
        question: "How does RoundAce use AI in mock interviews?",
        answer:
          "RoundAce uses artificial intelligence to conduct realistic interview simulations. \
          It analyzes user responses in real time and provides feedback on content, structure, tone, and delivery, \
          helping users refine their answers and communication skills.",
      },
      {
        id: 3,
        alt: "Briefcase Icon",
        Icon: Briefcase,
        question: "What job roles can I prepare for using RoundAce?",
        answer:
          "RoundAce supports interview preparation for a wide range of roles, including software engineering, product management, \
          data science, UI/UX design, and more. Users can select their target role and practice accordingly.",
      },
      {
        id: 4,
        alt: "Monitor Smartphone Icon",
        Icon: MonitorSmartphone,
        question: "Is RoundAce accessible on multiple devices?",
        answer:
          "Yes, RoundAce is accessible via web browsers on desktops, laptops, tablets, and smartphones. \
          Your progress and sessions are synced across devices for a seamless experience.",
      },
    ],
  },
  {
    id: 2,
    category: "Pricing",
    questions: [
      {
        id: 5,
        alt: "Credit Card Icon",
        Icon: CreditCard,
        question: "What pricing plans are available for RoundAce?",
        answer:
          "RoundAce offers a range of pricing plans tailored to different user needs. \
          A free plan is available with basic features, while premium plans unlock additional functionalities such as advanced analytics, \
          unlimited mock interviews, and personalized feedback.",
      },
      {
        id: 6,
        alt: "Gift Icon",
        Icon: Gift,
        question: "Is there a free trial for RoundAce's premium plans?",
        answer:
          "Yes, RoundAce offers a free trial period for users to explore premium features before committing to a subscription.",
      },
      {
        id: 7,
        alt: "Repeat Icon",
        Icon: Repeat,
        question: "Can I change or cancel my subscription at any time?",
        answer:
          "Yes, users can upgrade, downgrade, or cancel their subscription at any time through their account settings. \
          Cancellations take effect at the end of the current billing cycle.",
      },
      {
        id: 8,
        alt: "Shield Check Icon",
        Icon: ShieldCheck,
        question: "Is my payment information secure?",
        answer:
          "RoundAce uses secure, encrypted payment processing systems to protect your payment information. \
          The platform adheres to industry-standard security protocols and complies with applicable data protection regulations.",
      },
    ],
  },
  {
    id: 3,
    category: "Features",
    questions: [
      {
        id: 9,
        alt: "Messages Square Icon",
        Icon: MessagesSquare,
        question: "What kind of feedback does RoundAce provide?",
        answer:
          "RoundAce provides detailed feedback after each mock interview, including analysis of response quality, \
          clarity, pacing, and confidence. This helps users identify strengths and areas for improvement.",
      },
      {
        id: 10,
        alt: "Help Circle Icon",
        Icon: HelpCircle,
        question: "Are the interview questions customized?",
        answer:
          "Yes, RoundAce personalizes question sets based on the selected job role and experience level. \
          Users can also choose difficulty levels or focus on specific topics to tailor their practice sessions.",
      },
      {
        id: 11,
        alt: "Video Icon",
        Icon: Video,
        question: "Can I record and review my mock interviews?",
        answer:
          "Yes, RoundAce allows users to record their mock interview sessions. These recordings can be replayed for self-review \
          or shared with mentors for additional feedback.",
      },
      {
        id: 12,
        alt: "Trending Up Icon",
        Icon: TrendingUp,
        question: "Does RoundAce track my progress over time?",
        answer:
          "Yes, RoundAce tracks your performance metrics over time, providing insights into your improvement and readiness \
          for real interviews.",
      },
    ],
  },
  {
    id: 4,
    category: "Technical",
    questions: [
      {
        id: 13,
        alt: "Globe Icon",
        Icon: Globe,
        question: "Do I need to install software to use RoundAce?",
        answer:
          "No installation is required. RoundAce is a web-based platform and can be accessed directly through your browser.",
      },
      {
        id: 14,
        alt: "Refresh CCW Icon",
        Icon: RefreshCcw,
        question: "Does RoundAce update its question sets regularly?",
        answer:
          "Yes, RoundAce regularly updates its question database to reflect current industry trends, \
          company-specific patterns, and user feedback.",
      },
      {
        id: 15,
        alt: "Life Buoy Icon",
        Icon: LifeBuoy,
        question: "How can I get support if I face any issues?",
        answer:
          "You can reach out to RoundAce support via the Help Center or by contacting our support team directly through the website. \
          We strive to respond to all inquiries promptly.",
      },
    ],
  },
];

const footerCols = [
  {
    id: 1,
    category: "Home",
    links: ["FAQ", "Features", "Companies", "Testimonials"],
  },
  {
    id: 2,
    category: "Pricing",
    links: ["Plans", "Billing", "Free Trial", "Refunds"],
  },
  {
    id: 3,
    category: "About",
    links: ["Careers", "Our Story", "Contact", "Policy"],
  },
  {
    id: 4,
    category: "Community",
    links: ["Forum", "Stories", "Blog", "Support"],
  },
];

export {
  navigationLinks,
  frequentlyAskedQuestions,
  footerCols
};