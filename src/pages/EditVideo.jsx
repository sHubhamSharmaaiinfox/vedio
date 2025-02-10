import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditVideoLayer from "./EditVideoLayer";




const EditVideo = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Edit Video" />


    <EditVideoLayer />


      </MasterLayout>
    </>
  );
};

export default EditVideo;
