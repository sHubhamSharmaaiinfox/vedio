import { IDataState, IFont, ICompactFont } from '../interfaces/editor';
import { create } from 'zustand';
// interface IDataState {
//   fonts: IFont[];
//   compactFonts: ICompactFont[];
//   setFonts: (fonts: IFont[]) => void;
//   setCompactFonts: (compactFonts: ICompactFont[]) => void;
// }
const useDataState = create<IDataState>((set) => ({
  fonts: [],
  compactFonts: [],
  setFonts: (fonts) => set({ fonts }),
  setCompactFonts: (compactFonts) => set({ compactFonts }),
}));

export default useDataState;
