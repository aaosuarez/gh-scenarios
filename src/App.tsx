import React, { useEffect, useState } from 'react';
import { Graph } from 'react-d3-graph'
import ScenarioList from './components/ScenarioList'
import { Scenarios, Node, Link, Scenario } from './types';
import './App.css';

const initialScenarios: Scenarios = {
  byId: {
    0: {
      id: '0',
      children: ['1', '65', '66', '81', '93'],
      name: '',
      isUnlocked: true,
      isCompleted: true,
    },
    1: {
      id: '1',
      children: ['2'],
      name: 'Black Barrow',
      isUnlocked: true,
      isCompleted: true,
    },
    2: {
      id: '2',
      children: ['3', '4'],
      name: 'Barrow Lair',
      isUnlocked: true,
      isCompleted: true,
    },
    3: {
      id: '3',
      children: ['8', '9'],
      name: 'Inox Encampment',
      isUnlocked: true,
      isCompleted: true,
    },
    4: {
      id: '4',
      children: ['5', '6'],
      name: 'Crypt of the Damned',
      isUnlocked: true,
      isCompleted: true,
    },
    5: {
      id: '5',
      children: [],
      name: 'Ruinous Crypt',
      isUnlocked: true,
      isCompleted: false,
    },
    6: {
      id: '6',
      children: [],
      name: 'Decaying Crypt',
      isUnlocked: true,
      isCompleted: false,
    },
    7: {
      id: '7',
      children: ['20'],
      name: 'Vibrant Grotto',
      isUnlocked: true,
      isCompleted: true,
    },
    8: {
      id: '8',
      children: ['7', '13', '14'],
      name: 'Gloomhaven Warehouse',
      isUnlocked: true,
      isCompleted: true,
    },
    9: {
      id: '9',
      children: [],
      name: 'Diamond Mind',
      isUnlocked: true,
      isCompleted: false,
    },
    13: {
      id: '13',
      children: [],
      name: 'Temple of the Seer',
      isUnlocked: true,
      isCompleted: false,
    },
    14: {
      id: '14',
      children: [],
      name: 'Frozen Hollow',
      isUnlocked: true,
      isCompleted: false,
    },
    20: {
      id: '20',
      children: [],
      name: "Necromancer's Sanctum",
      isUnlocked: true,
      isCompleted: false,
    },
    65: {
      id: '65',
      children: [],
      name: 'Sulfur Mine',
      isUnlocked: true,
      isCompleted: false,
    },
    66: {
      id: '66',
      children: [],
      name: 'Clockwork Cove',
      isUnlocked: true,
      isCompleted: false,
    },
    81: {
      id: '81',
      children: [],
      name: 'Temple of the Eclipse',
      isUnlocked: true,
      isCompleted: false,
    },
    93: {
      id: '93',
      children: [],
      name: 'Sunken Vessel',
      isUnlocked: true,
      isCompleted: false,
    },
  },
  allIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 14, 20, 65, 66, 81, 93]
};

const graphDataFromScenarios = (scenarios: Scenarios): {
  nodes: Node[],
  links: Link[],
} => {
  const nodes = scenarios.allIds.map(id => {
    const scenario = scenarios.byId[id];
    return {
      id: id.toString(),
      name: scenario.name,
      color: scenario.isUnlocked ? scenario.isCompleted ? 'green' : 'blue' : 'lightgray',
    }
  });

  const links: Link[] = scenarios.allIds.reduce((result, id) => {
    const scenarioLinks = scenarios.byId[id].children.map((child) => ({
      source: id.toString(),
      target: child,
    }));
    return result.concat(scenarioLinks);
  }, [] as Link[]);

  return {
    nodes,
    links,
  }
}

function App() {
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [dimensions, setDimensions] = useState<number[]>([window.innerWidth, window.innerHeight]);
  const config = {
    directed: true,
    node: {
      labelProperty: (node: Node) => (`#${node.id}: ${node.name}`)
    },
    height: dimensions[0],
    width: dimensions[1],
  };

  useEffect(() => {
    const setDimensionsFromWindow = () => {
      setDimensions([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', setDimensionsFromWindow);
    return () => {
      window.removeEventListener('resize', setDimensionsFromWindow);
    }
  });

  const handleUnlock = (scenarioId: string) => {
    const scenario = scenarios.byId[scenarioId];
    setScenarios({
      ...scenarios,
      byId: {
        ...scenarios.byId,
        [scenarioId]: {
          ...scenarios.byId[scenarioId],
          isUnlocked: !scenario.isUnlocked,
          isCompleted: scenario.isUnlocked ? false : scenario.isCompleted
        }
      }
    });
  }

  const handleComplete = (scenarioId: string) => {
    const scenario = scenarios.byId[scenarioId];
    const updatedChildren: { [key: string]: Scenario } = scenario.children.reduce((result, childId) => {
      return {
        ...result,
        [childId]: {
          ...scenarios.byId[childId],
          isUnlocked: !scenario.isCompleted
        }
      }
    }, {});

    setScenarios({
      ...scenarios,
      byId: {
        ...scenarios.byId,
        ...updatedChildren,
        [scenarioId]: {
          ...scenarios.byId[scenarioId],
          isCompleted: scenario.isUnlocked ? !scenario.isCompleted : scenario.isCompleted
        }
      }
    });
  }

  return (<div>
    <ScenarioList scenarios={scenarios} onComplete={handleComplete} onUnlock={handleUnlock} />
    <Graph id="gh-scenarios" data={graphDataFromScenarios(scenarios)} config={config} />
  </div>);
}

export default App;
