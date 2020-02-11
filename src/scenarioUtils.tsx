import { Scenario, Scenarios } from './types';

export const isBlocked = (scenarios: Scenarios, scenario: Scenario): boolean => {
    if (scenario.blockedBy == null) {
        return false;
    }
    return scenario.blockedBy.reduce((isBlocked: boolean, id) => {
        return isBlocked || scenarios.byId[id].isCompleted
    }, false)
}