import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Sparkles,
  Crown,
  ArrowLeft,
  RefreshCw,
  Flower2,
  Shield,
  Users,
  Briefcase,
  Home,
  Moon,
  Calendar,
  PartyPopper,
  User,
  Palette,
  Mountain,
  Smile,
  Eye,
  Leaf,
  Flower,
  TreePine,
  Zap,
  Candy,
  Waves,
  Sun,
  Snowflake,
  Volume,
  VolumeX,
  Volume2,
} from "lucide-react";
import { Header } from "../components/Header";
import { PerfumeDetail } from "../components/PerfumeDetail";
import { perfumes, Perfume } from "../data/perfumes";

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface QuizOption {
  id: string;
  text: string;
  traits: string[];
  weight: number;
  icon: any;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "profile",
    question: "What fragrance profile do you prefer?",
    options: [
      {
        id: "feminine",
        text: "Feminine",
        traits: ["Graceful", "Elegant", "Refined", "Gentle", "Classic"],
        weight: 3,
        icon: Flower2,
      },
      {
        id: "masculine",
        text: "Masculine",
        traits: [
          "Rugged",
          "Confident",
          "Traditional",
          "Powerful",
          "Structured",
        ],
        weight: 3,
        icon: Shield,
      },
      {
        id: "unisex",
        text: "Unisex",
        traits: ["Balanced", "Versatile", "Modern", "Inclusive", "Harmonious"],
        weight: 2,
        icon: Users,
      },
    ],
  },
  {
    id: "occasion",
    question: "When will you primarily wear this fragrance?",
    options: [
      {
        id: "work",
        text: "Work and professional settings",
        traits: ["Professional", "Clean", "Subtle", "Fresh", "Light"],
        weight: 2,
        icon: Briefcase,
      },
      {
        id: "daily",
        text: "Daily casual wear",
        traits: ["Versatile", "Comfortable", "Easy", "Light", "Fresh"],
        weight: 2,
        icon: Home,
      },
      {
        id: "evening",
        text: "Evening events and dates",
        traits: ["Intense", "Seductive", "Rich", "Strong", "Memorable"],
        weight: 3,
        icon: Moon,
      },
      {
        id: "special",
        text: "Special occasions and celebrations",
        traits: ["Luxurious", "Elegant", "Sophisticated", "Premium", "Bold"],
        weight: 3,
        icon: Calendar,
      },
      {
        id: "intimate",
        text: "Intimate settings",
        traits: ["Sensual", "Alluring", "Captivating", "Personal", "Close"],
        weight: 3,
        icon: Heart,
      },
      {
        id: "social",
        text: "Social gatherings and parties",
        traits: ["Fun", "Energetic", "Vibrant", "Playful", "Noticeable"],
        weight: 2,
        icon: PartyPopper,
      },
    ],
  },
  {
    id: "season",
    question: "Which season will you wear this most?",
    options: [
      {
        id: "spring",
        text: "Spring",
        traits: ["Floral", "Green", "Fresh", "Light", "Blooming"],
        weight: 2,
        icon: Leaf,
      },
      {
        id: "summer",
        text: "Summer",
        traits: ["Citrus", "Aquatic", "Light", "Refreshing", "Bright"],
        weight: 2,
        icon: Sun,
      },
      {
        id: "fall",
        text: "Fall",
        traits: ["Warm", "Spicy", "Amber", "Cozy", "Rich"],
        weight: 2,
        icon: TreePine,
      },
      {
        id: "winter",
        text: "Winter",
        traits: ["Heavy", "Oriental", "Intense", "Warm", "Deep"],
        weight: 3,
        icon: Snowflake,
      },
      {
        id: "allyear",
        text: "All year round",
        traits: ["Versatile", "Balanced", "Timeless", "Classic", "Adaptable"],
        weight: 1,
        icon: Calendar,
      },
    ],
  },
  {
    id: "personality",
    question: "Which personality best describes you?",
    options: [
      {
        id: "bold",
        text: "Bold & confident",
        traits: ["Strong", "Powerful", "Assertive", "Daring", "Commanding"],
        weight: 3,
        icon: Mountain,
      },
      {
        id: "artistic",
        text: "Artistic & creative",
        traits: [
          "Imaginative",
          "Inspired",
          "Expressive",
          "Unique",
          "Visionary",
        ],
        weight: 2,
        icon: Palette,
      },
      {
        id: "sophisticated",
        text: "Sophisticated & elegant",
        traits: ["Elegant", "Refined", "Classy", "Luxurious", "Polished"],
        weight: 3,
        icon: Crown,
      },
      {
        id: "playful",
        text: "Playful & energetic",
        traits: ["Fun", "Vibrant", "Youthful", "Fresh", "Lively"],
        weight: 2,
        icon: Smile,
      },
      {
        id: "mysterious",
        text: "Mysterious & intriguing",
        traits: ["Dark", "Complex", "Enigmatic", "Seductive", "Deep"],
        weight: 3,
        icon: Eye,
      },
      {
        id: "calm",
        text: "Calm & peaceful",
        traits: ["Zen", "Peaceful", "Gentle", "Soothing", "Harmonious"],
        weight: 2,
        icon: Leaf,
      },
    ],
  },
  {
    id: "scentfamily",
    question: "Which scent family appeals to you most?",
    options: [
      {
        id: "fresh",
        text: "Fresh & citrus",
        traits: ["Clean", "Energizing", "Bright", "Zesty", "Uplifting"],
        weight: 3,
        icon: Zap,
      },
      {
        id: "floral",
        text: "Floral bouquet",
        traits: ["Rose", "Jasmine", "Peony", "Lily", "Blooming"],
        weight: 3,
        icon: Flower,
      },
      {
        id: "woody",
        text: "Woody & earthy",
        traits: [
          "Sandalwood",
          "Cedar",
          "Grounding",
          "Natural",
          "Sophisticated",
        ],
        weight: 3,
        icon: TreePine,
      },
      {
        id: "oriental",
        text: "Oriental & spicy",
        traits: ["Exotic", "Warm", "Rich", "Mysterious", "Luxurious"],
        weight: 3,
        icon: Sparkles,
      },
      {
        id: "sweet",
        text: "Sweet & gourmand",
        traits: ["Vanilla", "Chocolate", "Honey", "Dessert", "Comforting"],
        weight: 2,
        icon: Candy,
      },
      {
        id: "aquatic",
        text: "Aquatic & marine",
        traits: ["Ocean", "Blue", "Cool", "Refreshing", "Crisp"],
        weight: 2,
        icon: Waves,
      },
    ],
  },
  {
    id: "strength",
    question: "What fragrance strength do you prefer?",
    options: [
      {
        id: "subtle",
        text: "Subtle",
        traits: ["Close to skin, intimate"],
        weight: 1,
        icon: VolumeX,
      },
      {
        id: "moderate",
        text: "Moderate",
        traits: ["Noticeable but not overpowering"],
        weight: 2,
        icon: Volume,
      },
      {
        id: "strong",
        text: "Strong",
        traits: ["Bold and long-lasting"],
        weight: 3,
        icon: Volume2,
      },
    ],
  },
];

export default function Quiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<Perfume[]>([]);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Check if user came from intro page or has started the quiz
  const hasStartedQuiz = answers.length > 0 || showResults;

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setRecommendations([]);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Remove the last answer when going back
      setAnswers(answers.slice(0, -1));
    } else {
      // If on first question, go back to quiz intro
      navigate("/quiz-intro");
    }
  };

  const handleAnswer = (option: QuizOption) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate recommendations
      calculateRecommendations(newAnswers);
    }
  };

  const calculateRecommendations = (userAnswers: QuizOption[]) => {
    // Collect all traits with weights
    const traitScores: { [key: string]: number } = {};

    userAnswers.forEach((answer) => {
      answer.traits.forEach((trait) => {
        traitScores[trait] = (traitScores[trait] || 0) + answer.weight;
      });
    });

    // Score each perfume based on matching traits
    const perfumeScores = perfumes.map((perfume) => {
      let score = 0;
      const searchableText = [
        perfume.fragranceProfile,
        ...perfume.mainAccords,
        ...perfume.topNotes,
        ...perfume.middleNotes,
        ...perfume.baseNotes,
      ]
        .join(" ")
        .toLowerCase();

      Object.entries(traitScores).forEach(([trait, weight]) => {
        if (searchableText.includes(trait.toLowerCase())) {
          score += weight;
        }
      });

      return { perfume, score };
    });

    // Get top 6 recommendations
    const topRecommendations = perfumeScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((item) => item.perfume);

    setRecommendations(topRecommendations);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setRecommendations([]);
  };

  const handlePerfumeClick = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
    setIsDetailOpen(true);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-800 via-black-800 to-black-800 flex flex-col overflow-hidden">
      <Header />

      {/* Page Header */}
      <div
        className="bg-gradient-to-r from-black-800 via-black-700 to-black-600 py-3 sm:py-4 relative overflow-hidden flex-shrink-0
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gold-700" />
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gold-800 via-gold-700 to-gold-600 bg-clip-text text-transparent">
                Perfume Selector Quiz
              </h1>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-gold-700" />
            </div>
            <p className="text-sm text-gold-600 sm:text-gold-400 max-w-2xl mx-auto px-2">
              Discover your perfect fragrance match through our
              personality-based questionnaire
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Card
          className="bg-gradient-to-br from-black-800 via-black-800 to-black-700 border-2 border-gold-400 shadow-xl relative flex flex-col min-h-[calc(100vh-16rem)]
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
        >
          <CardHeader className="relative z-10 flex-shrink-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gold-300">
                {showResults
                  ? "Your Perfect Matches"
                  : `Question ${currentQuestion + 1} of ${quizQuestions.length}`}
              </CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                {hasStartedQuiz && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={restartQuiz}
                    className="border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white flex-1 sm:flex-none"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Restart Quiz</span>
                    <span className="sm:hidden">Restart</span>
                  </Button>
                )}
                {!showResults && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPreviousQuestion}
                    className="border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white flex-1 sm:flex-none"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">
                      {currentQuestion === 0
                        ? "Back to Quiz Intro"
                        : "Previous Question"}
                    </span>
                    <span className="sm:hidden">Back</span>
                  </Button>
                )}
              </div>
            </div>

            {!showResults && (
              <div className="mt-4 sm:mt-6">
                <Progress
                  value={progress}
                  className="h-2 sm:h-3 bg-black-700"
                />
                <p className="text-xs sm:text-sm text-gold-300 mt-2">
                  {Math.round(progress)}% complete
                </p>
              </div>
            )}
          </CardHeader>

          <CardContent className="relative z-10 flex-1 overflow-y-auto p-6 sm:p-8">
            {!showResults ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gold-300 mb-6 text-center break-words whitespace-normal hyphens-auto px-2">
                    {quizQuestions[currentQuestion].question}
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-4 max-w-full mx-auto">
                    {quizQuestions[currentQuestion].options.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleAnswer(option)}
                          className="group relative block w-full rounded-2xl border border-gold-400/60 bg-black-900/70 hover:bg-black-800 transition-all duration-200 hover:shadow-[0_0_0_2px_rgba(253,216,53,0.4)] focus:outline-none focus:ring-2 focus:ring-gold-500/40 overflow-hidden"
                          style={{ minHeight: "9rem" }}
                        >
                          <div className="flex flex-col h-full">
                            <div className="flex items-center justify-center p-3 sm:p-4 flex-1">
                              <IconComponent strokeWidth={2} className="text-gold-500 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
                            </div>
                            <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-2 gap-1">
                              <div className="font-semibold text-xs sm:text-sm leading-tight break-words whitespace-normal hyphens-auto">
                                {option.text}
                              </div>
                              <div className="text-[10px] sm:text-xs text-gold-300 leading-relaxed break-words whitespace-normal hyphens-auto px-1">
                                {option.traits.slice(0, 3).join(", ")}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 h-full flex flex-col">
                <div className="text-center flex-shrink-0">
                  <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-gold-600 mx-auto mb-3" />
                  <h3 className="text-base sm:text-lg font-semibold text-gold-300 mb-2">
                    Your Perfect Fragrance Matches
                  </h3>
                  <p className="text-sm text-gold-300 max-w-2xl mx-auto px-2">
                    Based on your personality and preferences, here are the
                    fragrances that align perfectly with who you are
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
                    {recommendations.map((perfume, index) => (
                      <Card
                        key={perfume.id}
                        className="border-gold-300 bg-gradient-to-br from-black-800 to-black-800 hover:from-black-700 hover:to-black-600 transition-all cursor-pointer group"
                        onClick={() => handlePerfumeClick(perfume)}
                      >
                        <CardContent className="p-3 sm:p-4 md:p-5">
                          <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge className="bg-gold-500 text-black-950 text-xs font-semibold">
                                #{index + 1} Match
                              </Badge>
                              <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600" />
                            </div>

                            <div>
                              <h4 className="font-bold text-gold-300 text-sm sm:text-base md:text-lg group-hover:text-gold-300 transition-colors">
                                {perfume.name}
                              </h4>
                              <p className="text-xs sm:text-sm font-semibold text-gold-300">
                                {perfume.brand}
                              </p>
                              <p className="text-xs text-gold-300 mb-2 sm:mb-3">
                                Inspired by {perfume.originalBrand}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                              {perfume.mainAccords.map((accord) => (
                                <Badge
                                  key={accord}
                                  variant="outline"
                                  className="text-xs border-gold-300 text-gold-300 bg-black-800"
                                >
                                  {accord}
                                </Badge>
                              ))}
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                              <p className="text-xs sm:text-sm text-gold-400">
                                <span className="font-semibold">Profile:</span>{" "}
                                {perfume.fragranceProfile}
                              </p>
                              <p className="text-xs sm:text-sm text-gold-400">
                                <span className="font-semibold">Best for:</span>{" "}
                                {perfume.bestTime}
                              </p>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-black-700">
                              <div className="text-right">
                                <div className="text-sm sm:text-base md:text-lg font-bold text-gold-300">
                                  ${perfume.sizes[0].price}
                                </div>
                                <div className="text-xs text-gold-300">
                                  from {perfume.sizes[0].size}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 flex-shrink-0">
                  <Button
                    variant="outline"
                    onClick={resetQuiz}
                    className="flex-1 border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white font-semibold py-2 sm:py-3 text-sm sm:text-base"
                  >
                    Take Quiz Again
                  </Button>
                  <Button
                    onClick={() => navigate("/fragrances")}
                    className="flex-1 bg-gold-600 hover:bg-gold-700 text-white font-semibold py-2 sm:py-3 text-sm sm:text-base"
                  >
                    <span className="hidden sm:inline">
                      Explore Full Collection
                    </span>
                    <span className="sm:hidden">Explore Collection</span>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Perfume Detail Modal */}
      <PerfumeDetail
        perfume={selectedPerfume}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
}
