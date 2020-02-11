import React, { useEffect, useState } from 'react';
import { Graph } from 'react-d3-graph'
import ScenarioList from './components/ScenarioList'
import { Scenarios, Node, Link, Scenario } from './types';
import { blankScenarios, currentScenarios } from './data';
import { isBlocked } from './scenarioUtils';
import './App.css';
import './nyala.ttf';

const initialScenarios = currentScenarios;

const graphDataFromScenarios = (scenarios: Scenarios): {
  nodes: Node[],
  links: Link[],
} => {
  const getScenarioColor = (scenario: Scenario): string => {
    if (isBlocked(scenarios, scenario)) {
      return 'red';
    }
    if (scenario.isCompleted) {
      return 'green';
    }
    if (scenario.isUnlocked) {
      return 'blue';
    }
    return 'lightgray';
  }

  const nodeFromScenario = (scenario: Scenario) => {
    if (!scenario.isUnlocked) {
      return null;
    }
    const color = getScenarioColor(scenario);

    return {
      id: scenario.id.toString(),
      name: scenario.name,
      color,
    }
  }

  const linksFromScenario = (scenario: Scenario): Link[] => {
    let links: Link[] = [];

    if (!scenario.isCompleted) {
      return links;
    }

    links = links.concat(scenario.children.map(child => {
      return scenarios.byId[child].isUnlocked ? {
        source: scenario.id.toString(),
        target: child
      } : null;
    }).filter(link => link != null) as Link[]);

    return links
  }

  const nodes = scenarios.allIds.reduce((result: Node[], id) => {
    const scenario = scenarios.byId[id];
    const node = nodeFromScenario(scenario)
    return node != null ? result.concat([node]) : result;
  }, []);

  const links: Link[] = scenarios.allIds.reduce((result, id) => {
    const scenarioLinks = linksFromScenario(scenarios.byId[id]);
    return scenarioLinks != null ? result.concat(scenarioLinks) : result;
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
    width: dimensions[0],
    height: dimensions[1],
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
