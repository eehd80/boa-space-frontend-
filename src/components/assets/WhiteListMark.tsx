import React from "react";
import styled from "styled-components";
import { Badge } from "@chakra-ui/react";

export enum MarkPosition {
  LEFT_TOP,
  RIGHT_BOTTOM,
}
interface WhiteListMarkProps {
  visible?: boolean;
  position?: MarkPosition;
}
function WhiteListMark({ visible = false, position = MarkPosition.LEFT_TOP }: WhiteListMarkProps) {
  return (
    <React.Fragment>
      {visible && (
        <NoticeBadge variant="solid" colorScheme="red" $position={position}>
          {`Only Whitelist`}
        </NoticeBadge>
      )}
    </React.Fragment>
  );
}

const NoticeBadge = styled(Badge)<WhiteListMarkProps>`
  position: absolute;
  ${(props) => (props.$position === MarkPosition.LEFT_TOP ? "left: 8px" : undefined)};
  ${(props) => (props.$position === MarkPosition.LEFT_TOP ? "top: 8px" : undefined)};
  ${(props) => (props.$position === MarkPosition.RIGHT_BOTTOM ? "right:  47px" : undefined)};
  ${(props) => (props.$position === MarkPosition.RIGHT_BOTTOM ? " bottom: 20px" : undefined)};
  font-style: italic;
  border-radius: 3px !important;
  background-color: rgba(255, 0, 0, 0.7) !important;
  text-transform: none !important;
  padding: 2px 6px !important;
`;
export default React.memo(WhiteListMark);
