/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Scenarios } from '../types';
import { isBlocked } from '../scenarioUtils';

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

const idStyle = css({
    width: '24px',
    display: 'inline-block',
});

const defaultNameStyle = {
    display: 'inline-block',
    marginLeft: '4px',
    cursor: 'pointer',
}

const unlockedStyle = {
    textShadow: 'none',
    color: 'inherit',
}

const nameUnlockedStyle = css(unlockedStyle);

const nameLockedStyle = css({
    textShadow: '0 0 8px rgba(0,0,0,.5)',
    color: 'transparent',
    ':hover': unlockedStyle,
});

const nameBlockedStyle = css({
    textDecoration: 'line-through',
    cursor: 'default'
})


const ScenarioList = ({ scenarios, onComplete, onUnlock }: ScenarioListProps) => {
    return (
        <ul css={listStyle}>
            {scenarios.allIds.map(id => {
                const scenario = scenarios.byId[id];
                const blocked = isBlocked(scenarios, scenario);
                if (id == 0) {
                    return null;
                }
                return (
                    <li key={id} css={listItemStyle}>
                        <span css={idStyle}>{scenario.id}</span>
                        <input type="checkbox" name="" id="" checked={scenario.isUnlocked} onChange={() => onUnlock(scenario.id)} />
                        <input type="checkbox" name="" id="" checked={scenario.isCompleted} onChange={() => onComplete(scenario.id)} disabled={blocked} />
                        <span css={[defaultNameStyle, scenario.isUnlocked ? nameUnlockedStyle : nameLockedStyle, blocked ? nameBlockedStyle : null]} onClick={() => !blocked ? onUnlock(scenario.id) : null}>{scenario.name}</span>
                    </li>
                )
            })}
        </ul>
    )
}

export default ScenarioList