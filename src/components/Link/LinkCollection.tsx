import React from "react";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

export default function LinkCollection({ url, name }: { url?: string; name?: string }) {
  return (
    <Text as={Link} variant="txt154" to={`/collection/${url}`} className="blue ellipsis">
      {name}
    </Text>
  );
}
