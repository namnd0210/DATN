import { useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  isNode,
  MiniMap,
  ReactFlowProvider,
  removeElements,
} from 'react-flow-renderer';

export function getElements(xElements = 10, yElements = 10) {
  const initialElements = [];
  let nodeId = 1;
  let recentNodeId = null;
  let count = 0;

  for (let y = 0; y < yElements; y++) {
    for (let x = 0; x < xElements; x++) {
      count++;
      const position = { x: x * 100, y: y * 50 };
      const data = { label: `Node ${nodeId}` };
      const node = {
        id: `stress-${nodeId.toString()}`,
        style: { width: 50, fontSize: 11 },
        data,
        position,
      };
      initialElements.push(node);

      if (recentNodeId && nodeId <= xElements * yElements) {
        initialElements.push({
          id: `${x}-${y}`,
          source: `stress-${recentNodeId.toString()}`,
          target: `stress-${nodeId.toString()}`,
        });
      }

      recentNodeId = nodeId;
      nodeId++;
    }
  }

  return initialElements;
}

const onLoad = (reactFlowInstance: any) => {
  reactFlowInstance.fitView();
  console.log(reactFlowInstance.getElements());
};

const initialElements = getElements(100, 10);

const StressFlow = () => {
  const [elements, setElements] = useState<any>(initialElements);
  const onElementsRemove = (elementsToRemove: any) => setElements((els: any) => removeElements(elementsToRemove, els));
  const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));

  const updatePos = () => {
    setElements((elms: any) => {
      return elms.map((el: any) => {
        if (isNode(el)) {
          return {
            ...el,
            position: {
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            },
          };
        }

        return el;
      });
    });
  };

  return (
    <ReactFlowProvider>
      <ReactFlow elements={elements} onLoad={onLoad} onElementsRemove={onElementsRemove} onConnect={onConnect}>
        <MiniMap />
        <Controls />
        <Background />

        <button onClick={updatePos} style={{ position: 'absolute', right: 10, top: 30, zIndex: 4 }}>
          change pos
        </button>
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default StressFlow;
