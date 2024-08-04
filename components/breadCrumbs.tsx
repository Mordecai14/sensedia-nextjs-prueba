import { Breadcrumb } from "@/libs/types";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";

interface Props {
  path: Breadcrumb[];
}

export const BreadCrumb: FC<Props> = ({ path }) => {
  return (
    <Breadcrumbs>
      {path.map((item, index) => (
        <BreadcrumbItem key={index}>
          {index === 0 ? (
            item.label
          ) : (
            <Link href={item.link}>{item.label}</Link>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};
