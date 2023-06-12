import { useEffect } from 'react';
import type { KeyCode } from '@xyflow/system';

import { useStoreApi } from '../hooks/useStore';
import useKeyPress from './useKeyPress';
import useReactFlow from './useReactFlow';
import { Edge, Node } from '../types';

const getSelected = (item: Node | Edge) => item.selected;

export default ({
  deleteKeyCode,
  multiSelectionKeyCode,
}: {
  deleteKeyCode: KeyCode | null;
  multiSelectionKeyCode: KeyCode | null;
}): void => {
  const store = useStoreApi();
  const { deleteElements } = useReactFlow();

  const deleteKeyPressed = useKeyPress(deleteKeyCode);
  const multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode);

  useEffect(() => {
    if (deleteKeyPressed) {
      const { edges, nodes } = store.getState();
      deleteElements({ nodes: nodes.filter(getSelected), edges: edges.filter(getSelected) });
      store.setState({ nodesSelectionActive: false });
    }
  }, [deleteKeyPressed]);

  useEffect(() => {
    store.setState({ multiSelectionActive: multiSelectionKeyPressed });
  }, [multiSelectionKeyPressed]);
};
