import React, { useEffect, useState } from 'react';
import { Graph } from 'react-d3-graph'
import ScenarioList from './components/ScenarioList'
import { Scenario, Node, Link } from './types';
import './App.css';

const scenarios: Scenario[] = [
  {
    id: '1',
    children: ['2'],
    name: 'Black Barrow',
    isUnlocked: false,
    isCompleted: false,
  },
  {
    id: '2',
    children: ['3', '4'],
    name: 'Barrow Lair',
    isUnlocked: false,
    isCompleted: false,
  },
  {
    id: '3',
    children: [],
    name: 'Inox Encampment',
    isUnlocked: false,
    isCompleted: false,
  },
  {
    id: '4',
    children: [],
    name: 'Crypt of the Damned',
    isUnlocked: false,
    isCompleted: false,
  },
];

const graphDataFromscenarios = (scenarios: Scenario[]): {
  nodes: Node[],
  links: Link[],
} => {
  const nodes = scenarios.map(scenario => ({
    id: scenario.id,
    name: scenario.name
  }));

  const links: any[] = scenarios.reduce((result, scenario) => {
    const scenarioLinks = scenario.children.map((child) => ({
      source: scenario.id,
      target: child
    }));
    return result.concat(scenarioLinks);
  }, [] as Link[]);

  return {
    nodes,
    links,
  }
}

function App() {
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

  return (<div>
    <ScenarioList scenarios={scenarios} />
    <Graph id="gh-scenarios" data={graphDataFromscenarios(scenarios)} config={config} />
  </div>);
}

export default App;
