/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Scenarios } from '../types';

type ScenarioListProps = {
    scenarios: Scenarios;
    onUnlock: (scenarioId: string) => void;
    onComplete: (scenarioId: string) => void;
}

const listStyle = css({
    listStyle: 'none',
    margin: '16px',
    padding: 0,
    position: 'absolute',
});

const listItemStyle = css({
    paddingBottom: '4px',
})

const ScenarioList = ({ scenarios, onComplete, onUnlock }: ScenarioListProps) => {
    return (
        <ul css={listStyle}>
            {scenarios.allIds.map(id => {
                const scenario = scenarios.byId[id]
                return (<li key={id} css={listItemStyle}>
                    <input type="checkbox" name="" id="" checked={scenario.isUnlocked} onChange={() => onUnlock(scenario.id)} />
                    <input type="checkbox" name="" id="" checked={scenario.isCompleted} onChange={() => onComplete(scenario.id)} />
                    {scenario.name}
                </li>)
            })}
        </ul>
    )
}

export default ScenarioList