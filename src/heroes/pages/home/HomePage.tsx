import { useSearchParams } from "react-router"
import { use, useMemo } from "react"

import {
    Heart,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadCrums } from "@/components/custom/CustomBreadCrums"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"

export const HomePage = () => {

    const { favoriteCount, favorites } = use(FavoriteHeroContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const activeTab = searchParams.get('tab') ?? 'all';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';
    const category = searchParams.get('category') ?? 'all';

    const selectedTab = useMemo(() => {
        const validTabs = ["all", "favorites", "heroes", "villains"];
        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab])

    const { data: heroesResponse } = usePaginatedHero({ page: +page, limit: +limit, category: category });
    const { data: summary } = useHeroSummary();

    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron
                    title='Universo de Superheroes'
                    description="Descubre, explora y administra super heroes y villanos" />

                {/* Custom Breadcrums */}
                <CustomBreadCrums currentPage="Superheroes" />

                {/* Stats Dashboard */}
                <HeroStats />

                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all" onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'all');
                            prev.set('category', 'all');
                            prev.set('page', '1');
                            return prev;
                        })}>All Characters ({summary?.totalHeroes})</TabsTrigger>
                        <TabsTrigger value="favorites" className="flex items-center gap-2" onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'favorites');
                            return prev;
                        })}>
                            <Heart className="h-4 w-4" />
                            Favorites ({favoriteCount})
                        </TabsTrigger>
                        <TabsTrigger value="heroes" onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'heroes');
                            prev.set('category', 'hero');
                            prev.set('page', '1');
                            return prev;
                        })}>Heroes ({summary?.heroCount})</TabsTrigger>
                        <TabsTrigger value="villains" onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'villains');
                            prev.set('category', 'villain');
                            prev.set('page', '1');
                            return prev;
                        })}>Villains ({summary?.villainCount})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        {/* Mostrar todos los personajes */}
                        {/* Hero Grid */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="favorites">
                        {/* Mostrar todos los personajes favoritos */}
                        {/* Hero Grid */}
                        <HeroGrid heroes={favorites} />
                    </TabsContent>
                    <TabsContent value="heroes">
                        {/* Mostrar todos los heroes */}
                        {/* Hero Grid */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="villains">
                        {/* Mostrar todos los villanos */}
                        {/* Hero Grid */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                </Tabs>

                {/* Pagination */}
                {selectedTab !== 'favorites' && (
                    <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
                )}
            </>
        </>
    )
}
