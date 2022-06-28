import courtList from "../ChangeCourtSize/CourtList";
import { Image, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { changeCourtName } from "@/store/reducer/courtNameSlice";
import React, { useState } from "react";

const Blueprints: React.FC = () => {
  const dispatch = useDispatch();
  const [activateCourt, setActivateCourt] = useState<string>("");

  const handleCourtSelecting = (
    courtSizeName: string,
    courtSizeDetails: string,
    img: string
  ): void => {
    setActivateCourt(img);
    dispatch(changeCourtName(`${courtSizeName} ${courtSizeDetails}`)); // change TopBar court size name
  };

  return (
    <Box paddingLeft="24px" paddingTop="24px" height="100%" className="scrollbox">
      {courtList.map((court) => {
        const { img, courtSizeName, courtSizeDetails } = court;
        return (
          <Box
            key={img}
            width="219px"
            height="150px"
            background="#fff"
            marginBottom="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={() => handleCourtSelecting(courtSizeName, courtSizeDetails, img)}
            data-testid={img}
            _hover={{ border: "4px solid #40B484" }}
            opacity={activateCourt === img ? "1" : "0.4"}
          >
            <Image src={img} objectFit={"contain"} width="200px" height="140px" />
          </Box>
        );
      })}
    </Box>
  );
};

export default Blueprints;
