import { SlashIcon } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Link } from "react-router"

interface Breadcrumb {
    label: string;
    to: string;
}

interface Props {
    currentPage: string;
    breadcrumbs?: Breadcrumb[];
}

export const CustomBreadCrums = ({ currentPage, breadcrumbs }: Props) => {
    return (
        <>
            <Breadcrumb className="my-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">Inicio</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {
                        breadcrumbs?.map((crumb) => (
                            <div className="felx items-center">
                                <BreadcrumbItem>
                                    <BreadcrumbSeparator>
                                        <SlashIcon />
                                    </BreadcrumbSeparator>
                                    <BreadcrumbLink asChild>
                                        <Link to={crumb.to}>{crumb.label}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </div>
                        ))
                    }

                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </>
    )
}
