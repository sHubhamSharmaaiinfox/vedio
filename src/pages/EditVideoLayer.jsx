import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import DashBoardLayerFour from "../components/DashBoardLayerFour";
import MenuList from './menu-list';
import { MenuItem } from '../menu-item';
import { Timeline, Provider, Scene } from '@designcombo/core';
import useHotkeys from './use-hotkeys';
import { useEffect } from 'react';
import { getCompactFontData } from '../utils/fonts';
import { FONTS } from '../data/fonts';
import ControlList from './control-list';


import useDataState from '../store/use-data-state';
export const theme = {
    colors: {
      gray: {
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        800: '#27272a',
        900: '#18181b',
        950: '#09090b',
        1000: '#040405',
        1100: '#010101',
      },
    },
  };



const EditVideoLayer = () => {
    const { setCompactFonts, setFonts } = useDataState();
    useHotkeys();
    useEffect(() => {
      setCompactFonts(getCompactFontData(FONTS));
      setFonts(FONTS);
    }, []);


    
  return (
    <>
    </>
  );
};

export default EditVideoLayer;