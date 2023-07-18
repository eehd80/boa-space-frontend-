import React, { useState } from "react";
import { ButtonGroup, Button, Image, VisuallyHidden } from "@chakra-ui/react";

export enum ViewMode {
  GRID,
  LIST,
}
interface GridAlignProps {
  mode?: ViewMode;
  onChange?: (mode: ViewMode) => void;
}
function GridAlign({ mode, onChange }: GridAlignProps) {
  const [innerMode, setInnerMode] = useState<ViewMode>(mode);
  const handlerOnClick = (_mode: ViewMode) => {
    if (innerMode !== _mode) {
      setInnerMode(_mode);
      onChange && onChange(_mode);
    }
  };
  return (
    <ButtonGroup borderWidth="1px" borderColor="popup_B01" borderRadius="8px" spacing="0">
      {/* 활성화  :  bg="popup_B01" */}
      <Button
        bg={innerMode === ViewMode.LIST ? "popup_B01" : undefined}
        borderRadius="0"
        w="52px"
        h="50px"
        onClick={() => handlerOnClick(ViewMode.LIST)}
      >
        <Image src="/images/icon/view_list.svg" alt="list" />
        <VisuallyHidden>list</VisuallyHidden>
      </Button>
      <Button
        bg={innerMode === ViewMode.GRID ? "popup_B01" : undefined}
        borderRadius="0"
        w="52px"
        h="50px"
        onClick={() => handlerOnClick(ViewMode.GRID)}
      >
        <Image src="/images/icon/view_grid.svg" alt="grid" />
        <VisuallyHidden>grid</VisuallyHidden>
      </Button>
    </ButtonGroup>
  );
}
export default React.memo(GridAlign);
