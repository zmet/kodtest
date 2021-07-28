import * as React from 'react';
import Spinner from '../spinner';
import { INavigationNode } from './provider';
import { useMenu } from './use';

const Menu = () => {    
    const {state: { menu, loading }, actions: {getMenuStructure, setNodeToActive, setNodeToOpen }} = useMenu();

    React.useEffect(() => {
        getMenuStructure!();
    }, [])

    const onNodeClick = (node:INavigationNode) => {
        setNodeToActive!(node);
    }
    
    const onArrowClick = (node:INavigationNode) => {
       setNodeToOpen!(node);
    }
    
    const ulFactory = (nodes: INavigationNode[]) => (nodes.map((node) => {        
        const {open, active} = node;
        if (node.children) {
            let childNodes;
            if (open) {
             childNodes = ulFactory(node.children);
            }           
            return (
                <div key={node.id} className="nodeContainer child">
                    <div className="nodeRow">
                         <i className="hasChildren" onClick={() => onArrowClick(node)}></i>
                         <div className={active ? "menuNode active" :"menuNode"} onClick={() => onNodeClick(node)} >
                             {node.name} {node.id} 
                         </div>
                     </div>
                     {childNodes} 
                 </div>
            )
        }
        return (<div key={node.id} className={active ? "menuNode active nodeRow leaf" :"menuNode nodeRow leaf"} onClick={() => onNodeClick(node)}>{node.name} {node.id} </div>)  
    }))
    const createNavigationNodes = (nodes: INavigationNode[]) => nodes.map((node)=> (liFactory(node)))
    const liFactory = (node: INavigationNode) => {       
        const {open, active} = node;
        if (node.children) {           
           let childNodes;
           if (open) {
            childNodes = ulFactory(node.children);
           }           
           return (
               <div key={node.id} className="nodeContainer">
                   <div className="nodeRow">
                        <i className="hasChildren" onClick={() => onArrowClick(node)}></i>
                        <div className={active ? "menuNode active" :"menuNode"} onClick={() => onNodeClick(node)} >
                            {node.name} {node.id} 
                        </div>
                    </div>
                    {childNodes} 
                </div>
           )
       }
       return (<div key={node.id} className={active ? "menuNode active nodeRow" :"menuNode nodeRow"} onClick={() => onNodeClick(node)}>{node.name} {node.id} </div>)
    }
    
    return  loading ? <Spinner></Spinner> :(
        <div role="navigation">
          <div>
            {createNavigationNodes(menu)}
          </div>
        </div>)     
}

export default Menu;