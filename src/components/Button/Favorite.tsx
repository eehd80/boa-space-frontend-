import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useUpdateAssetFavoriteMutation } from "../../hooks/mutation/updateAssetFavoriteMutation";
import { useActiveState } from "../../hooks/useActiveState";
import { useLocation, useNavigate } from "react-router-dom";
import { GetMyInfoGQL } from "../../hooks/query/useGetMyInfo";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { getFavorite } from "../../features/favorite/favoriteSlice";

export function FavoriteIcon({
  assetData,
  viewMode = false,
}: {
  assetData?: any;
  viewMode?: boolean;
}) {
  const toast = useToast({
    position: "bottom-right",
    variant: "variant",
  });
  const isFavorite = useSelector((s: RootState) => getFavorite(s, assetData?.id));
  const { updateAssetFavoriteMutation } = useUpdateAssetFavoriteMutation();
  const { online } = useActiveState();
  const navigate = useNavigate();
  const location = useLocation();
  const handlerOnClick = () => {
    if (!viewMode && assetData) {
      if (online) {
        const params = { assetId: assetData.id };
        updateAssetFavoriteMutation({
          variables: params,
          onCompleted(data: any) {
            console.debug("updateAssetFavoriteMutation > Compete:", data);
            if (!isFavorite) {
              toast({
                title: "Favorite registration successful",
                status: "success",
              });
            }
          },
          onError(err: any) {
            console.debug("updateAssetFavoriteMutation > Error:", err);
            toast({
              title: "Favorite registration failed",
              status: "error",
            });
          },
          refetchQueries: [
            {
              query: GetMyInfoGQL,
              variables: {},
            },
          ],
        });
      } else {
        navigate("/connect", { state: { before: location.pathname } });
      }
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handlerOnClick} w="22px" h="22px" minW="22px">
        {isFavorite ? (
          <span className="material-symbols-outlined fill" style={{ color: "#E0002B" }}>
            favorite
          </span>
        ) : (
          <span className="material-symbols-outlined" style={{ color: "#9F9FBA" }}>
            favorite
          </span>
        )}
      </Button>
    </React.Fragment>
  );
}
