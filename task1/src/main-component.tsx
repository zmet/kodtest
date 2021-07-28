import { useMenu } from "./menu/use";

const MainComponent = () => {
    const { state: { activeNode } } = useMenu();
    return (<div>{activeNode ? `${activeNode.name} ${activeNode.id}` : "No selected menu item"}</div>)
}

export default MainComponent;