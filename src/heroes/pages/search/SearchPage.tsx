import { useSearchParams } from "react-router";

import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadCrums } from "@/components/custom/CustomBreadCrums";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useSearchPage } from "@/heroes/hooks/useSearchPage";

export const SearchPage = () => {
    const [searchParams,] = useSearchParams();

    const name = searchParams.get('name') ?? undefined;
    const team = searchParams.get('team') ?? undefined;
    const category = searchParams.get('category') ?? undefined;
    const universe = searchParams.get('universe') ?? undefined;
    const status = searchParams.get('status') ?? undefined;
    const strength = searchParams.get('strength') ?? undefined;
    const { data: heroes } = useSearchPage({ name: name, team: team, category: category, universe: universe, status: status, strength: strength });

    return (
        <>
            {/* Header */}
            <CustomJumbotron
                title='Busqueda de Superheroes'
                description="Descubre, explora y administra super heroes y villanos" />
            {/* Custom Breadcrum */}
            <CustomBreadCrums currentPage="Buscador de Heroes" />
            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter an search */}
            <SearchControls />

            {/* Heroes Grid */}
            <HeroGrid heroes={heroes ?? []} />
        </>
    )
}

export default SearchPage;