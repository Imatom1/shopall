import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { PerfumeCard } from "../components/PerfumeCard";
import { PerfumeDetail } from "../components/PerfumeDetail";
import { SortSelect, SortOption } from "../components/SortSelect";
import { CompactFilters, FilterState } from "../components/CompactFilters";
import { CompactPerfumeCard } from "../components/CompactPerfumeCard";
import { PricingBanner } from "../components/PricingBanner";
import { perfumes, Perfume } from "../data/perfumes";
import { Sparkles } from "lucide-react";

const initialFilters: FilterState = {
  search: "",
  gender: "",
  season: "",
  bestTime: "",
  mainAccord: "",
};

export default function Index() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("name");

  const filteredAndSortedPerfumes = useMemo(() => {
    const filtered = perfumes.filter((perfume) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchableText = [
          perfume.name,
          perfume.brand,
          perfume.fragranceProfile,
          ...perfume.mainAccords,
          ...perfume.topNotes,
          ...perfume.middleNotes,
          ...perfume.baseNotes,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(searchTerm)) return false;
      }

      // Gender filter - include unisex in both men and women searches
      if (filters.gender) {
        if (
          filters.gender === "Men" &&
          perfume.gender !== "Men" &&
          perfume.gender !== "Unisex"
        )
          return false;
        if (
          filters.gender === "Women" &&
          perfume.gender !== "Women" &&
          perfume.gender !== "Unisex"
        )
          return false;
        if (filters.gender === "Unisex" && perfume.gender !== "Unisex")
          return false;
      }

      // Main accord filter (check if any of the perfume's accords match the general category)
      if (filters.mainAccord) {
        const hasMatchingAccord = perfume.mainAccords.some(
          (accord) =>
            accord.toLowerCase().includes(filters.mainAccord.toLowerCase()) ||
            filters.mainAccord.toLowerCase().includes(accord.toLowerCase()),
        );
        if (!hasMatchingAccord) return false;
      }

      // Season filter
      if (filters.season && !perfume.mainSeasons.includes(filters.season))
        return false;

      // Best time filter
      if (filters.bestTime && perfume.bestTime !== filters.bestTime)
        return false;

      return true;
    });

    // Sort the filtered results
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "brand":
          return a.brand.localeCompare(b.brand);
        case "gender":
          const genderOrder = {
            Women: 1,
            Men: 2,
            Unisex: 3,
          };
          return (
            (genderOrder[a.gender as keyof typeof genderOrder] || 0) -
            (genderOrder[b.gender as keyof typeof genderOrder] || 0)
          );
        case "popularity":
          // Sort by popularity (based on number of main accords + complexity)
          const aPopularity =
            a.mainAccords.length +
            a.topNotes.length +
            a.middleNotes.length +
            a.baseNotes.length;
          const bPopularity =
            b.mainAccords.length +
            b.topNotes.length +
            b.middleNotes.length +
            b.baseNotes.length;
          return bPopularity - aPopularity; // Higher complexity = more popular
        case "sillage":
          const sillageOrder = {
            Light: 1,
            "Light to Moderate": 2,
            Moderate: 3,
            "Moderate to Strong": 4,
            Strong: 5,
            "Very Strong": 6,
          };
          return (
            (sillageOrder[b.sillage as keyof typeof sillageOrder] || 0) -
            (sillageOrder[a.sillage as keyof typeof sillageOrder] || 0)
          );
        default:
          return 0;
      }
    });

    return sorted;
  }, [filters, sortBy]);

  const handlePerfumeClick = (perfume: Perfume) => {
    console.log("Perfume clicked:", perfume.name);
    setSelectedPerfume(perfume);
    setIsDetailOpen(true);
    console.log("Modal should be open now");
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const handleCompare = (perfume: Perfume) => {
    // Navigate to compare page with the selected perfume
    navigate(`/compare?perfumes=${perfume.id}`);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black-950 via-black-900 to-black-800 flex flex-col overflow-hidden">
      <Header />

      {/* Pricing Banner */}
      <div className="flex-shrink-0">
        <PricingBanner />
      </div>

      {/* Compact Filters */}
      <div className="flex-shrink-0">
        <CompactFilters
          filters={filters}
          onFiltersChange={setFilters}
          onReset={resetFilters}
          resultCount={filteredAndSortedPerfumes.length}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 flex flex-col overflow-hidden">
        {/* Perfume Grid */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {filteredAndSortedPerfumes.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md mx-auto px-4">
                <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-gold-500 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-gold-400 mb-2">
                  No fragrances found
                </h3>
                <p className="text-sm text-gold-300 mb-4">
                  Try adjusting your filters to discover more beautiful scents
                </p>
                <button
                  onClick={resetFilters}
                  className="text-gold-500 hover:text-gold-400 font-medium text-sm"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-shrink-0 mb-3 sm:mb-4 md:mb-5 flex items-center justify-between">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gold-400">
                  Fragrances ({filteredAndSortedPerfumes.length})
                </h2>
                <div className="hidden sm:block">
                  <SortSelect value={sortBy} onChange={setSortBy} />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pb-4">
                  {filteredAndSortedPerfumes.map((perfume) => (
                    <CompactPerfumeCard
                      key={perfume.id}
                      perfume={perfume}
                      onClick={() => handlePerfumeClick(perfume)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Perfume Detail Modal */}
      <PerfumeDetail
        perfume={selectedPerfume}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onCompare={handleCompare}
        isInComparison={false}
      />
    </div>
  );
}
