import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";

/*
    dynamic을 사용하여 서버 사이드 렌더링을 하지 않게 한다.
    서버에서는 window, document를 사용 할 수 없다.
    컴포넌트 안에서 window 사용 시 dynamic을 사용하지 않으면 window is undefined 에러
 */
const RegisterRoomGeometry = dynamic(
  import("../../../components/room/register/RegisterRoomGeometry"),
  { ssr: false }
);

const geometry: NextPage = () => {
  return <RegisterRoomGeometry />;
};

export default geometry;
