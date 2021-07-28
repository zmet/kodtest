import { useContext } from 'react';
import MenuContext from './context';
export function useMenu() {
  return useContext(MenuContext);
}