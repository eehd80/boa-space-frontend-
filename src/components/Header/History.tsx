import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export const History = () => (
  <Breadcrumb mt="28px" spacing="8px" separator={<ChevronRightIcon />}>
    <BreadcrumbItem>
      <BreadcrumbLink href="#" fontSize="14px" color="text_Gray01">
        My Collections
      </BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink href="#" fontSize="14px">
        Create a Collec...
      </BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);
