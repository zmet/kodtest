import React, { ReactChild, ReactChildren } from 'react';
import { useState } from 'react';
import MenuContext from './context';

export interface INavigationNode {
  name:string,
  id: number,
  children?: INavigationNode[],
  active?: boolean,
  open?: boolean,
  hover?: boolean,
}

interface IMenuProps {
  children: ReactChild[] | ReactChildren[];
}   

const findNodeAndSetActive = (traverseNode: INavigationNode, node: INavigationNode): INavigationNode => {    
  if (traverseNode.id === node.id) {
    const newNode = {...node};
    newNode.active = true;
    if (traverseNode.children) {    
      const traversedChildren = traverseNode.children.map(traverseChildNode => {
        return findNodeAndSetActive(traverseChildNode, node)
      })    
      return {...newNode, children: traversedChildren}
    }
    return newNode
  }
  if (traverseNode.children) {    
    const traversedChildren = traverseNode.children.map(traverseChildNode => {
      return findNodeAndSetActive(traverseChildNode, node)
    })    
    return {...traverseNode, children: traversedChildren}
  }
  return traverseNode;
}

const findNodeAndOpen = (traverseNode: INavigationNode, node: INavigationNode): INavigationNode => {      
  if (traverseNode.id === node.id) {    
    const newNode = {...node};
    if ('open' in traverseNode === false) {
      newNode.open = true;
    } else if (traverseNode.open === false) {
      newNode.open = true;
    } else {
      newNode.open = false;
    }
        
    if (traverseNode.children) {    
      const traversedChildren = traverseNode.children.map(traverseChildNode => {
        return findNodeAndOpen(traverseChildNode, node)
      })    
      return {...newNode, children: traversedChildren}
    }

    return newNode;
  }  
  if (traverseNode.children) {    
    const traversedChildren = traverseNode.children.map(traverseChildNode => {
      return findNodeAndOpen(traverseChildNode, node)
    })    
    return {...traverseNode, children: traversedChildren}
  }
  return traverseNode;
}

const setAllNodesToInActive = (nodes: INavigationNode[]) => (nodes.map(node => {
  if (node.children) {
    const childNodes = setAllNodesToInActive(node.children);
    node.children = childNodes;
  }
  node.active = false;
  return node;
}))

export const MenuProvider = ({ children }: IMenuProps) => {
  const initialState: INavigationNode[] = [{
    name: "node",
    id: 0
  }]
  const [menuStructure, setMenuStructure] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [activeNode, setActiveNode] = useState({name: "no active node", id:0});

  const getMenuStructure = () => {
    setLoading(true);
    fetch('https://610042efbca46600171cf7ff.mockapi.io/menu', {
    method: 'GET', 
    })
    .then(response => response.json())
    .then(data => {
      // print for verification of nodes
      console.log('Success:', data);
      setLoading(false);
      setMenuStructure(data);  
    })
    .catch((error) => {
      setLoading(false);
      console.error('Error:', error);
    });
  }
  
  const setNodeToOpen = (node: INavigationNode) => {  
    const newmenuStructure = menuStructure.map(traverseNode => {      
      return findNodeAndOpen(traverseNode, node);
    })
    setMenuStructure(newmenuStructure)
  }

  const setNodeToActive = (node: INavigationNode) => {    
    // unset last active node
    const unactive = setAllNodesToInActive(menuStructure);
    const newmenuStructure = unactive.map(traverseNode => {
      return findNodeAndSetActive(traverseNode, node);
    })
    setActiveNode(node);
    setMenuStructure(newmenuStructure)
  }
  const value = {
    state: { menu: menuStructure, loading: loading, activeNode: activeNode },
    actions: { getMenuStructure, setNodeToActive, setNodeToOpen },
  };
  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  )
}