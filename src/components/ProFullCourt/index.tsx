import { Stage, Layer, Group } from "react-konva";
import { Flex } from "@chakra-ui/react";
import { ReactReduxContext, Provider } from "react-redux";
import ThreePointArea from "../BasketballCourt/ThreePointArea";
import KeyArea from "../BasketballCourt/KeyArea";
import CourtArea from "../BasketballCourt/CourtArea";
import CircleArea from "../BasketballCourt/CircleArea";
import TopKeyArea from "../BasketballCourt/TopKeyArea";
import Border from "../BasketballCourt/Border";
import CourtDimension from "../BasketballCourt/CourtDimension";
import DashedLine from "../BasketballCourt/DashedLine";
import BorderDimension from "../BasketballCourt/BorderDimension";
import useCourt from "@/hooks/useCourt";
import { useState } from "react";
import { useStoreSelector } from "@/store/hooks";

const ProFullCourt = () => {
  const { courtAreaXLength, courtAreaYLength, borderLength, court, courtStartPoint } = useCourt();
  const zoomScale = useStoreSelector((state) => state.zoomControl.zoomScale);

  const centerShift = {
    xShift:
      -(courtAreaXLength + courtStartPoint.X + borderLength * 2) *
      court.courtRatio *
      ((zoomScale - 1) / 2),
    yShift:
      -(courtAreaYLength + courtStartPoint.Y + borderLength * 2) *
      court.courtRatio *
      ((zoomScale - 1) / 2),
  };

  return (
    <Flex
      position="fixed"
      top="123px"
      left="98px"
      width="calc(100% - 98px)"
      height="calc(100% - 230px)"
      minWidth={court.stageWidth}
      minHeight={court.stageHeight}
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            id="basketball-court"
            height={court.stageHeight}
            width={court.stageWidth}
            scaleX={court.courtRatio * zoomScale}
            scaleY={court.courtRatio * zoomScale}
            x={zoomScale === 1 ? 0 : centerShift.xShift}
            y={zoomScale === 1 ? 0 : centerShift.yShift}
            visible
            style={{ backgroundColor: "white" }}
            data-testid="stage"
            draggable
          >
            {console.log("StageHeight:", court.stageHeight)}
            {console.log("StageWidth:", court.stageWidth)}
            {console.log("Scale:", court.courtRatio * zoomScale)}
            {console.log("scaleX:", (courtAreaXLength + borderLength * 2) * court.courtRatio)}
            {console.log("scaleY:", (courtAreaYLength + borderLength * 2) * court.courtRatio)}
            <Provider store={store}>
              <Layer>
                <Border
                  startPoint={courtStartPoint}
                  borderLength={borderLength}
                  courtAreaXLength={courtAreaXLength}
                  courtAreaYLength={courtAreaYLength}
                />
                <CourtDimension startPoint={courtStartPoint} borderLength={borderLength} />
                <BorderDimension startPoint={courtStartPoint} borderLength={borderLength} />
                <Group>
                  <DashedLine startPoint={courtStartPoint} borderLength={borderLength} />
                  <CourtArea courtWidth={courtAreaXLength / 2} startPoint={courtStartPoint} />
                  <ThreePointArea startPoint={courtStartPoint} />
                  <KeyArea startPoint={courtStartPoint} />
                  <CircleArea startPoint={courtStartPoint} />
                  <TopKeyArea startPoint={courtStartPoint} />
                </Group>
                <Group scaleX={-1} x={courtStartPoint.X * 2 + courtAreaXLength}>
                  <DashedLine startPoint={courtStartPoint} borderLength={borderLength} />
                  <CourtArea courtWidth={courtAreaXLength / 2} startPoint={courtStartPoint} />
                  <ThreePointArea startPoint={courtStartPoint} />
                  <KeyArea startPoint={courtStartPoint} />
                  <CircleArea startPoint={courtStartPoint} />
                  <TopKeyArea startPoint={courtStartPoint} />
                </Group>
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </Flex>
  );
};

export default ProFullCourt;
