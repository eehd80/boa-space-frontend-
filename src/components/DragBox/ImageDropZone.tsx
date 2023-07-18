import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled, { css } from "styled-components";
import { Box, Image } from "@chakra-ui/react";
import * as CSS from "csstype";
import Identicon from "../Identicon";

interface ImageDropZoneProp {
  file?: any;
  onChange?: (e: File) => void;
  shape?: Shape;
  width?: CSS.Property.Width | number;
  height?: CSS.Property.Height | number;
  isIdenticon?: boolean;
  defaultSrc?: string;
}

export enum Shape {
  CIRCLE,
  RECTANGLE,
}
export default function ImageDropZone({
  onChange,
  shape = Shape.RECTANGLE,
  width = 400,
  height = 260,
  isIdenticon = false,
  defaultSrc,
}: ImageDropZoneProp) {
  const [file, setFile] = useState();

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.map((file: any) => Object.assign(file, { preview: URL.createObjectURL(file) }));
      onChange && onChange(acceptedFiles[0]);
      setFile(acceptedFiles[0]);
    },
    [onChange]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg", ".svg", ".webm"],
    },
  });

  return (
    <WrappedBox width={width} height={height} {...getRootProps()}>
      <DashedBox shape={shape}>
        <ProfileImg width="100%" height="100%" borderRadius="50%" $isIdenticon={isIdenticon}>
          {file ? (
            <PreviewImage
              height={height}
              src={file["preview"]}
              alt=""
              borderRadius={shape === Shape.CIRCLE ? "full" : undefined}
              boxSize={Math.max(Number(width), Number(height))}
            />
          ) : isIdenticon ? (
            defaultSrc ? (
              <PreviewImage
                height={height}
                src={defaultSrc}
                alt=""
                borderRadius={shape === Shape.CIRCLE ? "full" : undefined}
                boxSize={Math.max(Number(width), Number(height))}
              />
            ) : (
              <Identicon />
            )
          ) : defaultSrc ? (
            <PreviewImage
              height={height}
              src={defaultSrc}
              alt=""
              borderRadius={shape === Shape.CIRCLE ? "full" : undefined}
              boxSize={Math.max(Number(width), Number(height))}
            />
          ) : (
            <Box display="flex" w="100%" h="100%" alignItems="center" justifyContent="center">
              <Image src={"/images/icon/add_photo_alternate-w.svg"} alt="" />
            </Box>
          )}
        </ProfileImg>
      </DashedBox>
      <input type="file" {...getInputProps()} />
    </WrappedBox>
  );
}
const WrappedBox = styled.div<{ width: any; height: any }>`
  margin: 11px 0;
  width: ${({ width }: any) => `${width}px`};
  height: ${({ height }: any) => `${height}px`};
  max-width: 100%;
`;
const PreviewImage = styled(Image)`
  max-width: ${({ width }: any) => `${width}px`};
  max-height: ${({ height }: any) => `${height}px`};
  padding-bottom: 6px;
`;
const DashedBox = styled.div<{ shape: Shape }>`
  border: 3px dashed #9f9fba;
  border-radius: ${({ shape }: any) => (shape === Shape.CIRCLE ? "100px" : "10px")};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ProfileImg = styled(Box)`
  position: relative;
  cursor: pointer;

  ${(props) =>
    props.$isIdenticon &&
    css`
      &:hover {
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
        }
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 38px;
          height: 38px;
          background: url(/images/icon/edit.svg) 0 0 no-repeat;
        }
      }
    `};
`;
