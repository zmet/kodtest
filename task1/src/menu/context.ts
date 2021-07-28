import { createContext } from 'react';
import { INavigationNode } from './provider';

interface IMenuContext {
    state: {
        menu:INavigationNode[],
        loading?: boolean,
        activeNode?: INavigationNode
    },
    actions: { 
        getMenuStructure?:() => void , 
        setNodeToActive?: (node:INavigationNode) => void,
        getActiveNode?: () => INavigationNode | null,
        setNodeToOpen?: (node:INavigationNode) => void
    }
}

const inital: IMenuContext = {state: { menu: [], loading: false }, actions: {}};
const MenuContext = createContext(inital);

export default MenuContext;