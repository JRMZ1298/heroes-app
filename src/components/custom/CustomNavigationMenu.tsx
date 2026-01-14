import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { cn } from "@/lib/utils";

export const CustomNavigationMenu = () => {

    const { pathname } = useLocation();

    const isActive = (path: string) => {
        return path === pathname;
    };

    return (
        <>
            <NavigationMenu className="py-5">
                <NavigationMenuList>
                    {/* Home */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild
                            className={cn(isActive('/') && "bg-slate-200 border-md", 'p-2')}
                        >
                            <Link to="/">Inicio</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    {/* Search */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild
                            className={cn(isActive('/search') && "bg-slate-200 border-md", 'p-2')}
                        >
                            <Link to="/search">Buscar superheroes</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}
